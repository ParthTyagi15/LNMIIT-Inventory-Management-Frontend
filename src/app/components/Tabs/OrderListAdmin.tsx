import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetailsModal from "../Modals/OrderDetailsModal";
import { toast } from "react-toastify";

const OrderListAdmin = () => {
  const [allOrders, setAllOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://lnmiit-inventory-backend.onrender.com/admin/orders").then((res) => {
      console.log(res.data.orders);
      setAllOrders(res.data.orders);
    });
  }, []);

  function AcceptOrder(order_id: any) {
    axios
      .patch(`https://lnmiit-inventory-backend.onrender.com/admin/acceptOrder/${order_id}`)
      .then((res) => {
        console.log(res.data.orders);
        toast.success("Order Accepted!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setAllOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order_id === order._id ? { ...order, isVerified: true } : order
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function RejectOrder(order_id: any) {
    axios
      .delete(`https://lnmiit-inventory-backend.onrender.com/admin/rejectOrder/${order_id}`)
      .then((res) => {
        console.log(res.data.orders);
        toast.success("Order Rejected!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setAllOrders((prevOrders) => {
          return prevOrders.filter((order) => {
            return order._id != order_id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function date(dateto: string | number | Date) {
    const date_to_be = new Date(dateto);
    return date_to_be.toDateString();
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Orders List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Serial Number</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Total Cost</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, i) => (
            <tr key={order._id}>
              <td className="flex justify-center py-2 px-4 border-b">{i + 1}</td>
              <td className="py-2 px-4 border-b">
                <span className="flex justify-center text-s leading-5 font-semibold rounded-full  text-black-800">
                  {date(order.order_date)}
                </span>
              </td>
              <td className="justify-center py-2 px-4 border-b">
                <span className="flex justify-center text-s leading-5 font-semibold rounded-full text-green-800">
                  {order.total_cost}
                </span>
              </td>
              <td className="flex justify-center py-2 px-4 border-b">
                <OrderDetailsModal order={order} />
                {!order.isVerified && (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded"
                      onClick={() => {
                        AcceptOrder(order._id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        RejectOrder(order._id);
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListAdmin;
