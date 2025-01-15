import React from "react";
import { Link } from "react-router-dom";
import {
  CircleStackIcon,
  BanknotesIcon,
  BoltIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";

const Card = ({ course }) => {
  // Calculate total duration
  const totalDuration = course.lessons.reduce(
    (acc, lesson) => acc + lesson.duration,
    0
  );
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <Link to={`/course/${course._id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-t-xl"
            src={course.thumbnail}
            alt={course.title}
          />
          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg">
            {course.level}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {course.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-600">
                {course.rating.average.toFixed(1)} ({course.rating.count})
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {hours}h {minutes}m
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {course.enrolledStudents.length} students
              </span>
            </div>
            <span className="text-lg font-bold text-indigo-600">
              Rp {course.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className="block">
      <div className="group max-w-xs 2xl:max-w-72 xl:max-w-sm lg:max-w-md md:max-w-md sm:max-w-screen bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 ease-in-out">
        <img
          className="rounded-t-lg"
          src="images/16x10.png"
          alt="product image"
        />
        <div className="p-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-color duration-300">
            {course.title}
          </h5>
          <h3 className="text-sm text-gray-600">
            {course.instructor.fullName || "Instructor"}
          </h3>
          <div className="flex mt-3 items-center">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
              {course.length} Sections
            </span>
            <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
              <CircleStackIcon className="w-4 h-4 inline text-yellow-300" />+
              {course.rewards.scoin}
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs text-center font-semibold px-2 py-1 rounded me-2 shadow-lg">
              <BoltIcon className="w-4 h-4 inline text-yellow-300" />+
              {course.rewards.score}
            </span>
          </div>

          <div className="flex items-center mt-2">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-600">
                {course.rating.average.toFixed(1)} ({course.rating.count})
              </span>
            </div>
          </div>

          <div className="flex items-center mt-3 text-white w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:bg-blue-800 hover:text-blue-300 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Buy Course for{" "}
            {course.price.amount === 0 ? "Free" : course.price.amount}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
