// pages/admin/OrdersList.tsx
"use client";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrdersList: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [userId, setUserId] = useState<any | null>(null);
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    console.log(rows.length);
    setUserId(localStorage.getItem("userId"));
    console.log(userId);
  }, [rows.length, userId]);

  function addRows() {
    setRows([
      ...rows,
      {
        item_name: "",
        item_count: 0,
        description: "",
        expected_cost: 0,
      },
    ]);
  }

  function deleteLastRow() {
    setRows((oldRows) => {
      const newRows = [...oldRows];
      newRows.pop();
      return newRows;
    });
  }

  function PlaceOrder() {
    const len = rows.length;
    let idx = 0;
    console.log(purpose);
    let totalCost = 0;
    for (idx = 0; idx < len; idx++) {
      totalCost += parseInt(rows[idx]["expected_cost"]);
    }

    const order = {
      user_id: userId,
      item_count: rows.length,
      remark: purpose,
      total_cost: totalCost,
      issued_items: rows,
    };
    console.log(order);
    axios
      .post("http://localhost:8080/user/orderItem", order)
      .then((response) =>
        toast.success("Order placed successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        })
      )
      .catch((error) => {
        toast.error("Order can't be placed!!!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        console.log(error);
      });

    setRows([]);
    setPurpose("");
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    setRows((oldRows) => {
      const newRows = [...oldRows];
      newRows[idx][event.target.name] = event.target.value;
      return newRows;
    });

    console.log(rows[idx]["item_name"]); // Like this we can access the particular column of the idxth row
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8">Order List</h1>
      <div className="content-box">
        <div className="order-card overflow-y-auto">
          <div className="table-responsive">
            <table className="table table-striped table-sm w-full">
              <thead className="table__header">
                <tr>
                  <th>Sno</th>
                  <th>Item Name</th>
                  <th>Expected Cost</th>
                  <th>Quantity</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {rows.map((r, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td className="address-box">
                      <input
                        type="text"
                        placeholder="abc"
                        onChange={(event) => handleChange(event, idx)}
                        name="item_name"
                        value={r["item_name"]}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        size={20}
                        placeholder="4500"
                        onChange={(event) => handleChange(event, idx)}
                        name="expected_cost"
                        value={r["expected_cost"]}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        size={20}
                        placeholder="3"
                        onChange={(event) => handleChange(event, idx)}
                        name="item_count"
                        value={r["item_count"]}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        size={60}
                        placeholder="Additional Info"
                        onChange={(event) => handleChange(event, idx)}
                        name="description"
                        value={r["description"]}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addRows}
          >
            Add Item
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={deleteLastRow}
          >
            Delete Last Item
          </button>
        </div>
        <div className="mt-4">
          <label>
            <h2>Purpose</h2>
          </label>
          <textarea
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(event) => setPurpose(event.target.value)}
          ></textarea>
        </div>
        <button
          onClick={PlaceOrder}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded mt-4"
        >
          <h2>Place Order</h2>
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
