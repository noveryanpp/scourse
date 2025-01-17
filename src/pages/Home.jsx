import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import PageHead from "../components/layout/PageHead";
import CourseCard from "../components/card/CourseCard";
import { API_URL } from "../utils/constants";

import { useUser } from "../hooks/useUser"

const Home = () => {
  const {user, loading} = useUser();
  const [userProgress, setUserProgress] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const pageTitle = "Home";
  const pageDescription = "Welcome to Scourse!";
  const pageHeadBackground = "from-blue-600 via-purple-600 to-indigo-600";


  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/api/courses/${user._id}/ownedCourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error("Error fetching courses:", err);
      }
    };
    if (!loading) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <PageHead pageTitle={pageTitle} pageHeadBackground={pageHeadBackground} pageDescription={pageDescription} />
        </div>
        <div className="mx-auto py-6 px-2 md:pl-20 2xl:px-8">
          {/* <div className="max-w-7xl flex flex-col mx-auto justify-left mb-6">
            <h2 className="text-2xl text-gray-900 font-semibold ml-2">Last Accessed Courses</h2>
            <div className="flex flex-nowrap overflow-x-auto scroll-smooth scroll-pl-0 overscroll-x-contain snap-x gap-2 py-4">
              {loading ? (
                <div className="flex items-center justify-center w-full p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="flex-none snap-start w-80">
                    <CourseCard course={course} />
                  </div>
                ))
              )}
            </div>
          </div> */}

          <div className="max-w-7xl flex flex-col mx-auto justify-left">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl text-gray-900 font-semibold mx-2">My Courses</h2>
              <h2 className="text-xl text-gray-900 font-semibold mx-2 cursor-pointer hover:text-indigo-600">Show All</h2>
            </div>
            <div className="flex flex-nowrap overflow-x-auto scroll-smooth scroll-pl-0 overscroll-x-contain snap-x gap-2 py-2">
              {loading ? (
                <div className="flex items-center justify-center w-full p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="flex-none snap-start w-80">
                    <CourseCard course={course} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
