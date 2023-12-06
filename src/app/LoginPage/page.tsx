// pages/index.tsx
"use client";
import { useState } from "react";
import Login from "../components/Modals/Login";

const LoginPage: React.FC = () => {
  const [signInModal, setSignInModal] = useState(false);
  // const [signUpModal, setSignUpModal] = useState(false);

  const openSignInModal = () => {
    setSignInModal(true);
  };

  const closeSignInModal = () => {
    setSignInModal(false);
  };

  // const openSignUpModal = () => {
  //   setSignUpModal(true);
  // };

  // const closeSignUpModal = () => {
  //   setSignUpModal(false);
  // };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-opacity-80 bg-white p-8 rounded-md">
        <h1 className="text-6xl font-bold text-blue-600 mb-8">
          LNMIIT Inventory Management System
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={openSignInModal}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
          {/* <button
            onClick={openSignUpModal}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button> */}

          {signInModal && (
            <Login title="Sign In" onClose={closeSignInModal} >
              {/* Sign In Form */}
            </Login>
          )}

          {/* {signUpModal && (
            <Login title="Sign Up" onClose={closeSignUpModal}>
            </Login>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
