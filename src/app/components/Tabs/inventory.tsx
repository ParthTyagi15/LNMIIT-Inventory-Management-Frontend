"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modals/AddItemsModals";
import Modals from "../Modals/IssueItemModals";

const InventoryList: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/inventory").then((res) => {
      setInventoryData(res.data.items);
      console.log(res.data);
    });
  }, []);

  function go(item: any) {
    setInventoryData((prev: any[]) => {
      return [...prev, item];
    });
  }

  function goes(item_id: any) {
    axios
      .patch(`http://localhost:8080/admin/issuedDecreaser/${item_id}`)
      .then((res) => {
        setInventoryData((prevItems) => {
          let newItem = prevItems.map((item) =>
            item_id === item._id
              ? { ...item, issued_count: item.issued_count + 1 }
              : item
          );

          return newItem.filter(
            (item) => item.item_count - item.issued_count > 0
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleChange(event: any) {
    try {
      axios
        .get(`http://localhost:8080/admin/${event.target.value}`)
        .then((res) => {
          var inventoryItems = res.data.items;
          setInventoryData(inventoryItems);
          console.log(inventoryItems);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function searchByName() {
    let x = (document.getElementById("item") as HTMLInputElement)?.value;

    axios
      .get(`http://localhost:8080/admin/searchItem/${x}`)
      .then((response) => setInventoryData(response.data))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8">Inventory List</h1>
      <div className="flex justify-center w-1100 mb-8">
        <div>
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter Item Name"
            id="item"
          />
        </div>
        <div className="ml-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            onClick={searchByName}
          >
            Search
          </button>
        </div>
        <div className="ml-2">
          <select
            name="itemAge"
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
            onChange={handleChange}
          >
            <option value="inventory">All Items</option>
            <option value="fsn1">More than 5 years</option>
            <option value="fsn2">More than 10 years</option>
            <option value="C">C Items/Cheap Items</option>
            <option value="B">B Items/Mid Ranged Items</option>
            <option value="A">A Items/Expensive Items</option>
          </select>
        </div>
        <Modal go={go} />
      </div>
      <div className="card">
        <div className="table-responsive">
          {inventoryData.length > 0 ? (
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">Sno</th>
                  <th className="py-2 px-4 border-b">Item Name</th>
                  <th className="py-2 px-4 border-b">Item Cost</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Available</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>

              <tbody className="table__body">
                {inventoryData.map((item, i) => (
                  <tr key={item["_id"]} className="text-center">
                    <td className="py-2 px-4 border-b">{i + 1}</td>
                    <td className="py-2 px-4 border-b">{item["item_name"]}</td>
                    <td className="py-2 px-4 border-b">
                      <span className="py-2 px-4 border-b">
                        {item["expected_cost"]}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item["item_description"]}
                    </td>
                    <td className="py-2 px-4 border-b">{item["item_count"]}</td>
                    <td className="py-2 px-4 border-b">
                      {item["item_count"] - item["issued_count"]}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Modals item={item} goes={goes} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="py-2 px-4 border-b">No items found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryList;

// pages/admin/InventoryList.tsx
// "use client";
// import { useState } from "react";

// const InventoryList: React.FC = () => {
//   const [inventory, setInventory] = useState([
//     {
//       id: 1,
//       itemName: "Item 1",
//       itemCost: 10,
//       itemDescription: "Description 1",
//       itemCount: 50,
//       issuedCount: 10,
//     },
//     // Add more inventory items as needed
//   ]);

//   const handleIssueItem = (itemId: number) => {
//     // Implement logic to handle issuing of the item
//     console.log(`Issuing item with id ${itemId}`);
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Inventory List</h1>
//       <table className="min-w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-4 border-b">Serial Number</th>
//             <th className="py-2 px-4 border-b">Item Name</th>
//             <th className="py-2 px-4 border-b">Item Cost</th>
//             <th className="py-2 px-4 border-b">Item Description</th>
//             <th className="py-2 px-4 border-b">Item Count</th>
//             <th className="py-2 px-4 border-b">Issued Count</th>
//             <th className="py-2 px-4 border-b">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.itemName}</td>
//               <td className="py-2 px-4 border-b">{item.itemCost}</td>
//               <td className="py-2 px-4 border-b">{item.itemDescription}</td>
//               <td className="py-2 px-4 border-b">{item.itemCount}</td>
//               <td className="py-2 px-4 border-b">{item.issuedCount}</td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   onClick={() => handleIssueItem(item.id)}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Issue Item
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryList;
