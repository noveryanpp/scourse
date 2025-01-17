import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { API_URL } from "../../utils/constants";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "student"
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage("");

    try {
      const requestData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      console.log("Request Data:", JSON.stringify(requestData, null, 2));

      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/auth/register`,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Server Response:", response);

      if (response.data) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 400) {
        setMessage("Invalid registration data. Please check your inputs.");
      } else if (error.response?.status === 409) {
        setMessage("Username or email already exists.");
      } else {
        setMessage("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen min-h-screen-sm w-screen text-gray-900 flex justify-center m-auto">
      <div className="max-w-screen-xl mx-h-10 m-0 sm:m-10 bg-white shadow rounded-lg flex justify-center flex-1 overflow-hidden">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/images/login.svg)` }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 m-auto">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Scourse
            </span>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
            {message && (
              <div
                className={`mt-4 p-2 rounded w-full text-center ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.fullName}
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                        errors.username ? 'border-red-500' : 'border-gray-200'
                      } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.username}
                      name="username"
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                    {errors.username && (
                      <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.password}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <button
                    className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <UserPlusIcon className="w-6 h-6" />
                    )}
                    <span className="ml-3">{loading ? "Registering..." : "Sign Up"}</span>
                  </button>
                </form>

                <div className="my-6 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>
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
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;