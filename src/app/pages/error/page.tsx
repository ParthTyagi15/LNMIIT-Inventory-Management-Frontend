"use client";
import router from "next/router";
import React from "react";

const page = () => {
  return (
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

export default page;
