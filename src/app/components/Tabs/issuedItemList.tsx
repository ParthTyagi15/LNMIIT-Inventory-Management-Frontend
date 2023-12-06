// pages/admin/IssuedItemsList.tsx
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const IssuedItemsList: React.FC = () => {
  const [allIssuedItems, setIssuedItems] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://lnmiit-inventory-backend.onrender.com/admin/IssuedItems").then((res) => {
      console.log(res.data);
      setIssuedItems(res.data);
    });
  }, []);

  function toInventory(item: any) {
    axios
      .patch(`https://lnmiit-inventory-backend.onrender.com/admin/toInventory/${item.item_name}`)
      .then((res) => {
        toast.success("Item sent to Inventory", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      })
      .catch((error: any) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        // console.log(error);
      });
    axios
      .delete(`https://lnmiit-inventory-backend.onrender.com/admin/deleteIssuedItem/${item._id}`)
      .then((res) => {
        console.log("issued item deleted");
      })
      .catch((err) => {
        console.log(err);
      });
    setIssuedItems((previtems) => {
      return previtems.filter((items) => {
        return item._id != items._id;
      });
    });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Issued Items List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Serial Number</th>
            <th className="py-2 px-4 border-b">Item Name</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allIssuedItems.length > 0 ? (
            allIssuedItems.map((item, i) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b">{i + 1}</td>
                <td className="py-2 px-4 border-b">{item.item_name}</td>
                <td className="py-2 px-4 border-b">{item.username}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      toInventory(item);
                    }}
                  >
                    To Inventory
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h1 className="text-xl flex justify-center">No Issued Items</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedItemsList;
