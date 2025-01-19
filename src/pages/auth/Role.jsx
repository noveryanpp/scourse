import React, { useState } from "react";
import { UserPlusIcon, DocumentPlusIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

function Role() {
  const [role, setRole] = useState("");

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
                <input type="radio" id="instructor-role" value="instructor" className="hidden" checked={role === "instructor"} onChange={(e) => setRole(e.target.value)}/>
                <label
                  for="instructor-role"
                  className={`inline-flex items-center justify-between w-full p-5 bg-white border  rounded-lg cursor-pointer ${role === "instructor" ? "border-blue-600" : "border-gray-200" }  peer-checked:text-blue-600 hover:text-blue-600 hover:bg-blue-100`}
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

                <input type="radio" id="student-role" value="student" className="hidden peer" checked={role === "student"} onChange={(e) => setRole(e.target.value)} />
                <label
                  for="student-role"
                  className={`inline-flex items-center justify-between w-full p-5 bg-white border  rounded-lg cursor-pointer ${role === "student" ? "border-blue-600" : "border-gray-200" }  peer-checked:text-blue-600 hover:text-blue-600 hover:bg-blue-100 mt-5`}
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
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">Register</span>
                  </button>
                  <button className="mt-2 tracking-wide font-semibold bg-gray-100 text-gray-900 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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

export default Role;
