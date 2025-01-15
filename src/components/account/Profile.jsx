import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get("http://20.255.59.99:45/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-sky-600 flex pt-12 md:pt-20 xl:pt-28 pb-6">
      <div className="max-w-7xl mx-auto pt-2 md:pl-20 md:pr-2 2xl:px-2">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3">
            <img src="images/defaultAvatar.png" />
          </div>
          <div className="flex flex-col px-4 md:w-2/3 md:pl-7 py-5 justify-left">
            <div className="h-full">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-4xl sm:text-5xl font-bold">{user.fullName || "Guest"}</h2>
                <div>
                  <button className="border-2 border-white bg-transparent p-1 mr-2 text-white hover:border-white hover:text-sky-600 hover:bg-white shadow-lg">
                    <PencilSquareIcon className="w-8 h-8" />
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="text-2xl md:text-3xl font-bold">{user.username || "guest"}</div>
                <div className="bg-white rounded-full w-2 h-2"></div>
                <div className="text-xl md:text-2xl">{user.role === "student" ? "Student" : user.role === "instructor" ? "Instructor" : "Admin"}</div>
              </div>
            </div>
            <div className="bottom-0">
              <div className="text-xl">{user.createdAt}</div>
              <div className="flex flex-row gap-4">
                <a className="text-white text-2xl">0 Followers</a>
                <a className="text-white text-2xl">0 Followings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
