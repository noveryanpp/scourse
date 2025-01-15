import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Profile from "../components/account/Profile";
import StudentStats from "../components/account/StudentStats";
import InstructorCourses from "../components/account/InstructorCourses";

const Account = () => {
  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <Profile />
        </div>
        <div className="w-full">
          <StudentStats />
        </div>
      </div>
    </div>
  );
};

export default Account;
