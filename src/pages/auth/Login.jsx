import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { API_URL } from "../../utils/constants";
import { useToast } from "../../context/toastContext"

function Login() {
  const [userCredential, setUserCredential] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const notify = useToast();

  useEffect(()=>{
    if(token){
      navigate('/logout')
      notify("You've already Logged In, do you wish to Log Out?", {autoClose: 5000}, "error")
    }  
  }, [])

  const onSubmit = async (e) => {
    let credential = userCredential.trim().toLowerCase();
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        credential,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage("Logged in successfully");
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to login, wrong credentials");
    }
  };

  return (
    <div className="max-h-screen w-screen text-gray-900 flex justify-center m-auto">
      <div className="max-w-5xl m-0 sm:m-10 bg-white shadow rounded-lg flex justify-center flex-auto overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 m-auto py-20">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Scourse</span>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            {message && <div className={`mt-4 p-2 rounded ${message.includes("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{message}</div>}
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={onSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    value={userCredential}
                    type="text"
                    placeholder="Email or Username"
                    onChange={(e) => setUserCredential(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                    <span className="ml-3">Login</span>
                  </button>
                </form>
              </div>

              <div className="flex flex-col items-center">
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to read the{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service{" "}
                  </a>
                  and its{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/images/login.svg)` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
