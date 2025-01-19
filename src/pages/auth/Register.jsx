import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlusIcon, DocumentPlusIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { MIDTRANS_CLIENT_KEY, API_URL } from "../../utils/constants";
import { useToast } from "../../context/toastContext";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState("register");
  const notify = useToast();

  useEffect(() => {
    if (message != "") notify(message, { autoClose: 3000 }, result);
  }, [message]);

  const validateRegisterData = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRole = () => {
    const newErrors = {};
    if (!formData.role || formData.role === "admin") newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRole()) return;

    setLoading(true);
    setMessage("");

    try {
      const requestData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      console.log("Request Data:", JSON.stringify(requestData, null, 2));

      const response = await axios({
        method: "post",
        url: `${API_URL}/api/auth/register`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Server Response:", response);

      if (response.data) {
        setMessage("Registration successful! Redirecting to login...");
        setResult("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
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

      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPage = () => {
    setPage("register");
  };

  const handleRolePage = () => {
    if (validateRegisterData()) {
      setPage("role");
    } else {
      setPage("register");
    }
  };

  if (page === "register") {
    return (
      <div className="max-h-screen min-h-screen-sm w-screen text-gray-900 flex justify-center m-auto">
        <div className="max-w-screen-xl mx-h-10 m-0 sm:m-10 bg-white shadow rounded-lg flex justify-center flex-1 overflow-hidden">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/images/login.svg)` }}></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 m-auto">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Scourse</span>
            </div>
            <div className="mt-3 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${errors.fullName ? "border-red-500" : "border-gray-200"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.fullName}
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${errors.username ? "border-red-500" : "border-gray-200"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.username}
                      name="username"
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                    {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${errors.email ? "border-red-500" : "border-gray-200"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${errors.password ? "border-red-500" : "border-gray-200"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                      value={formData.password}
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                  </div>

                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleRolePage}
                  >
                    Next
                  </button>

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
  } else {
    return (
      <div className="max-h-screen min-h-screen-sm w-screen text-gray-900 flex justify-center m-auto">
        <div className="max-w-screen-xl mx-h-10 m-0 sm:m-10 bg-white shadow rounded-lg flex justify-center flex-1 overflow-hidden">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/images/login.svg)` }}></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 m-auto">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Scourse</span>
            </div>
            <div className="mt-3 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Select Your Role</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input type="radio" id="instructor-role" name="role" value="instructor" className="hidden" checked={formData.role === "instructor"} onChange={handleChange} />
                  <label
                    for="instructor-role"
                    className={`inline-flex items-center justify-between w-full p-5 bg-white border  rounded-lg cursor-pointer ${
                      formData.role === "instructor" ? "border-blue-600" : "border-gray-200"
                    }  peer-checked:text-blue-600 hover:text-blue-600 hover:bg-blue-100`}
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">Instructor</div>
                      <div className="w-full">
                        <ul className="list-disc list-inside">
                          <li>Manage Student</li>
                          <li>Create Courses</li>
                          <li>Create Assignments</li>
                          <li>Create Quizzes</li>
                        </ul>
                      </div>
                    </div>
                    <DocumentPlusIcon className="w-10 h-10" />
                  </label>

                  <input type="radio" id="student-role" name="role" value="student" className="hidden peer" checked={formData.role === "student"} onChange={handleChange} />
                  <label
                    for="student-role"
                    className={`inline-flex items-center justify-between w-full p-5 bg-white border  rounded-lg cursor-pointer ${
                      formData.role === "student" ? "border-blue-600" : "border-gray-200"
                    }  peer-checked:text-blue-600 hover:text-blue-600 hover:bg-blue-100 mt-5`}
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">Student</div>
                      <div className="w-full">
                        <ul className="list-disc list-inside">
                          <li>Join Courses</li>
                          <li>Do Assignments</li>
                          <li>Do Quests</li>
                          <li>Get Ranks</li>
                        </ul>
                      </div>
                    </div>
                    <ClipboardDocumentCheckIcon className="w-10 h-10" />
                  </label>

                  <div>
                    {errors.role && <p className="mt-1 text-sm text-red-500 text-center">{errors.role}</p>}

                    <button
                      className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      type="submit"
                      onClick={handleSubmit}
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
                      <span className="ml-3">{loading ? "Registering..." : "Register"}</span>
                    </button>

                    <button
                      onClick={handleRegisterPage}
                      className="mt-2 tracking-wide font-semibold bg-gray-100 text-gray-900 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <span className="ml-3">Back</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
