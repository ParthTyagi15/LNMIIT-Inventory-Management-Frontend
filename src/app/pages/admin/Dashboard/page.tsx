// pages/admin/Dashboard.tsx
"use client";
// pages/admin/Dashboard.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import InventoryList from "@/app/components/Tabs/inventory";
import OrdersListAdmin from "@/app/components/Tabs/OrderListAdmin";
import OrderHistory from "@/app/components/Tabs/OrderHistory";
import IssuedItemsList from "@/app/components/Tabs/issuedItemList";
import UsersList from "@/app/components/Tabs/usersList";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  let temp = false;
  let temp2 = false;
  if (typeof window !== "undefined") {
    temp = localStorage.getItem("isLoggedIn") === "true";
    temp2 = localStorage.getItem("isAdmin") === "true";
  }
  const [isLoggedIn, setIsLoggedIn] = useState(temp);
  const [isAdmin, setIsAdmin] = useState(temp2);
  const router = useRouter();
  console.log("Is logged in ? " + isLoggedIn);
  console.log("is admin" + isAdmin);
  let user = { username: "", name: "", department: "" };
  if (typeof window !== "undefined") {
    user = {
      username: localStorage.getItem("username")!,
      name: localStorage.getItem("name")!,
      department: localStorage.getItem("department")!,
    };
  }
  return isLoggedIn && isAdmin ? (
    <div className="flex h-screen">
      <div>
        <Sidebar
          setActiveTab={setActiveTab}
          setIsLoggedIn={setIsLoggedIn}
          isAdmin
        />
      </div>

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
          {activeTab === "inventory" && <InventoryList />}
          {activeTab === "orders" && <OrdersListAdmin />}
          {activeTab === "orderHistory" && <OrderHistory />}
          {activeTab === "issuedItems" && <IssuedItemsList />}
          {activeTab === "users" && <UsersList />}
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

export default AdminDashboard;
