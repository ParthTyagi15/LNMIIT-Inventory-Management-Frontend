// pages/admin/OrderHistory.tsx
import { useEffect, useState } from "react";
import Modal from "../Modals/OrderDetailsModal";
import axios from "axios";

const OrderHistory: React.FC = () => {
  const [orderHistoryAdminList, setOrderHistoryAdminList] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://lnmiit-inventory-backend.onrender.com/admin/orders").then((res) => {
      console.log(res.data.orders);
      setOrderHistoryAdminList(res.data.orders);
    });
  }, []);

  function date(dateto: string | number | Date) {
    const date_to_be = new Date(dateto);
    return date_to_be.toDateString();
  }

  function searchByDate() {
    let x = (document.getElementById("date") as HTMLInputElement)?.value;

    axios
      .get(`https://lnmiit-inventory-backend.onrender.com/admin/searchByOrderDate/${x}`)
      .then((response) => setOrderHistoryAdminList(response.data))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8">Order History</h1>
      <div className="content-box">
        <div className="flex justify-center w-1100 mb-8">
          <div>
            <input
              className="p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Order Date"
              id="date"
            />
          </div>
          <div className="ml-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
              onClick={searchByDate}
            >
              Search
            </button>
          </div>
        </div>
        <div className="card">
          {orderHistoryAdminList.length > 0 ? (
            <div className="table-responsive">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 border-b">Sno</th>
                    <th className="py-2 border-b">Order Date</th>
                    <th className="py-2 border-b">Total Cost</th>
                    <th className="py-2 border-b">Status</th>
                    <th className="py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistoryAdminList.map((order, i) => (
                    <tr key={order._id}>
                      <td className="flex justify-center py-2 px-4 border-b">{i + 1}</td>
                      <td className="justify-center py-2 px-4 border-b">
                        <span className="flex justify-center text-s leading-5 font-semibold rounded-full text-black-800">
                          {date(order.order_date)}
                        </span>
                      </td>
                      <td className="justify-center py-2 px-4 border-b">
                        <span className="flex justify-center align-center text-s leading-5 font-semibold rounded-full text-white-800">
                          {order.total_cost}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {order.isVerified ? (
                          <span className="flex justify-center text-s leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sent
                          </span>
                        ) : (
                          <span className="flex justify-center text-s leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not Sent
                          </span>
                        )}
                      </td>
                      <td className="flex justify-center py-2 px-4 border-b">
                        <Modal order={order} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2> No Orders found </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
