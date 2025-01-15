import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import PageHead from "../components/layout/PageHead";
import CourseCard from "../components/card/CourseCard";

import { MagnifyingGlassIcon, ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageTitle = "Courses";
  const pageDescription = "Find and Join Free or Paid Courses";
  const pageHeadBackground = "from-green-600 via-emerald-600 to-teal-600";

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const Category = [
    { name: "Math", value: "math" },
    { name: "English", value: "english" },
    { name: "Language", value: "language" },
    { name: "Mobile Development", value: "mobiledev" },
    { name: "Web Development", value: "webdev" },
    { name: "Game Development", value: "gamedev" },
    { name: "IoT", value: "iot" },
    { name: "Artificial Intelligence", value: "ai" },
    { name: "UI/UX", value: "uiux" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://20.255.59.99:45/api/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <PageHead pageTitle={pageTitle} pageHeadBackground={pageHeadBackground} pageDescription={pageDescription} />
        </div>

        <div className="mx-auto py-6 px-2 md:px-6 lg:px-8">
          <div className="max-w-7xl flex flex-wrap gap-4 mx-auto justify-center">
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

        <div className={`fixed bg-white/80 backdrop-blur-sm top-1/3 ${isCategoryOpen ? "right-0" : "-right-full md:-right-80"} w-full md:w-80 max-h-screen p-2 rounded-lg border transition-all duration-300 shadow-lg`}>
          <div className={`flex absolute ${isCategoryOpen ? "left-2" : "-left-10"} top-2 transition-all duration-100`}>
            <button className={`bg-blue-600 ${isCategoryOpen ? "rounded-lg" : "rounded-l-full"} p-1 transition-all duration-100`} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
              {isCategoryOpen ? <XMarkIcon className="w-8 h-8 text-white" /> : <ChevronDoubleLeftIcon className="w-8 h-8 text-white" />}
            </button>
          </div>
          <h2 className="text-gray-900 font-semibold text-xl text-center mt-1 mb-3">Filter Courses</h2>
          <div className="flex">
            <form className="w-full mx-auto">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative flex flex-row">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 mr-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Courses..."
                />
                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1">
                  <MagnifyingGlassIcon className="w-7  h-7" />
                </button>
              </div>
              <div id="categoryfilter" className="flex flex-col justify-left ml-2 mt-4">
                <h2 className="text-lg text-gray-900 font-semibold">Category</h2>
                {Category.map((category) => {
                  return (
                    <div>
                      <input id={category.name} type="checkbox" value={category.value} name="category" className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                      <label htmlFor={category.name} className="ml-2 text-gray-900">
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
