import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login")
  }

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <div className="max-h-screen min-h-screen-sm w-screen text-gray-900 flex justify-center m-auto">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow rounded-lg flex justify-center overflow-hidden">
        <div className="w- p-6 sm:p-12 m-auto">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Scourse</span>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Are you sure you want to log out?</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <button
                  className="mt-5 tracking-wide font-semibold bg-red-600 text-gray-100 w-full py-4 rounded-lg hover:bg-red-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                  onClick={() => handleLogout()}
                >
                  <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                  <span className="ml-3">Log Out</span>
                </button>
                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                  onClick={() => navigate("/home")}
                >
                  <span className="ml-3">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
