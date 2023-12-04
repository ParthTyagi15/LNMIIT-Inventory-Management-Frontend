"use client";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import OrderHistory from "@/app/components/Tabs/OrderHistoryUser";
import OrdersList from "@/app/components/Tabs/orderList";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orderHistory");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const router = useRouter();
  console.log("Is logged in ? " + isLoggedIn);
  console.log("is admin" + isAdmin);
  const user = {
    username: localStorage.getItem("username"),
    name: localStorage.getItem("name"),
    department: localStorage.getItem("department"),
  };
  return isLoggedIn && !isAdmin ? (
    <div className="flex h-screen">
      <Sidebar
        setActiveTab={setActiveTab}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin = {false}
      />

      <div className="flex-1 p-10">
        <div className="flex justify-end">
          <div className="relative">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
              {user.username} {/* Replace with actual admin name */}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md hidden">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => router.push("/admin/profile")}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 ml-20 pl-10 overflow-x-hidden overflow-y-auto p-4">
          {/* {activeTab === "inventory" && <InventoryList />} */}
          {activeTab === "orders" && <OrdersList />}
          {activeTab === "orderHistory" && <OrderHistory />}
          <div />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Login Error</h1>
        <p className="text-gray-700 mb-6">
          There was an error during login. Please check your username and
          password and try again.
        </p>
        <a
          className="text-blue-500 hover:underline"
          onClick={() => router.push("/LoginPage")}
        >
          Go back to Login
        </a>
      </div>
    </div>
  );
};

export default UserDashboard;
