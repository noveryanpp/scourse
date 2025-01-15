import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CircleStackIcon,
  BanknotesIcon,
  BoltIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const CourseHead = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://20.255.59.99:45/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course details");
        setLoading(false);
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error || "Course not found"}
      </div>
    );
  }

  const enrollCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios({
        method: "post",
        url: `http://20.255.59.99:45/api/courses/${id}/enroll`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Failed to enroll");
      setLoading(false);
      console.error("Error enroll course:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 md:pl-20 xl:pl-4">
      <div className="w-full lg:w-1/2">
        <img
          className="shadow-lg rounded-lg w-full h-auto object-cover"
          src={course.thumbnail}
          alt={course.title}
        />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 lg:pl-8 py-4">
        <div className="flex flex-col-reverse lg:flex-row">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600">
            {course.title}
          </h2>
          <div className="flex gap-2 lg:ml-auto mb-2 lg:mb-auto mt-2">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-xs text-center font-semibold px-2 py-1 rounded shadow-lg">
              {course.level}
            </span>
            {/* <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs text-center font-semibold px-2 py-1 rounded shadow-lg">
                            {course.category}
                        </span> */}
          </div>
        </div>

        {/* <div className="flex items-center gap-2 mt-2">
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                        {hours}h {minutes}m • {course.lessons.length} lessons
                    </span>
                </div> */}

        <h3 className="text-sm text-gray-600 mt-2">
          by{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-800">
            {course.instructor.fullName || "Instructor"}
          </a>
        </h3>

        <p className="text-sm text-gray-900 pt-4">{course.description}</p>

        <div className="flex mt-auto flex-col md:flex-row">
          <div className="">
            <p className="text-md font-semibold my-2 text-indigo-600">
              Rewards from this Course:
            </p>
            <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
              <CircleStackIcon className="w-4 h-4 inline text-yellow-300" />+
              {course.rewards.scoin}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
              <BoltIcon className="w-4 h-4 inline text-yellow-300" />+
              {course.rewards.score}
            </span>
          </div>
          <div className="flex mt-4 md:ml-auto md:mt-auto">
            <button
              onClick={enrollCourse}
              className="flex-1 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Buy Course for{" "}
              {course.price.amount === 0 ? "Free" : course.price.amount}
            </button>
          </div>
        </div>

        {/* Course Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Students Enrolled</p>
            <p className="text-lg font-semibold text-gray-900">
              {course.enrolledStudents.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rating</p>
            <p className="text-lg font-semibold text-gray-900">
              {course.rating.average.toFixed(1)} ({course.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHead;
