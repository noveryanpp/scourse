import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import PageHead from "../components/layout/PageHead";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const pageTitle = "Dashboard";
  const pageDescription = "Manage your Courses!!!";
  const pageHeadBackground = "from-purple-600 to-pink-600";

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://20.255.59.99:45/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);

        if (response.data.role !== "instructor") {
          console.log("User is not an instructor, redirecting to /home");
          navigate("/home");
        } else {
          console.log("User is an instructor, access granted to Dashboard");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://20.255.59.99:45/api/courses/${user._id}/ownedCourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
    fetchCourses();
  }, [navigate]);



  useEffect(() => {
    if (user && user.role === "instructor") {
      fetchCourses();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  const handleDelete = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "delete",
        url: `http://20.255.59.99:45/api/courses/${courseId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error deleting courses:", err);
    } finally {
      fetchCourses();
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <PageHead pageTitle={pageTitle} pageHeadBackground={pageHeadBackground} pageDescription={pageDescription} />
        </div>
        <div className="max-w-7xl mx-auto px-2 md:pl-20 overflow-hidden">
          <div className="flex w-full">
            <div className="flex-auto relative">
              <div className="flex items-center justify-between mt-8 mb-5 mx-2 text-gray-900">
                <h2 className="text-4xl font-semibold text-center">{user?._id}</h2>
              </div>
              <div className="relative bg-white backdrop-blur-sm rounded-3xl p-8 border border text-gray-900">
                <div className="space-y-3">
                  <div className="flex flex-row items-center">
                    <div className="font-semibold w-48">Thumbnail</div>
                    <div className="font-semibold w-full">Title</div>
                    <div className="font-semibold w-48 text-center">Students</div>
                    <div className="font-semibold w-48 text-center">Sections</div>
                    <div className="font-semibold w-48 text-center">Price</div>
                    <div className="font-semibold w-48 text-center"></div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                  {courses.map((course, index) => (
                    <div key={course._id} className="flex flex-row items-center">
                      <div className="w-48 flex flex-row items-center">
                        <div className="font-semibold pr-5">{index + 1}</div>
                        <div className="flex w-12 h-12 rounded-full bg-white/10 items-center justify-center"></div>
                      </div>
                      <div className="font-semibold w-full">{course.title}</div>
                      <div className="font-semibold w-48 text-center">{course.enrolledStudents.length}</div>
                      <div className="font-semibold w-48 text-center">{course.length}</div>
                      <div className="font-semibold w-48 text-center">{course.price.amount === 0 ? "Free" : course.price.amount}</div>
                      <div className="font-semibold w-48 text-center flex flex-row gap-1">
                        <Link to={`/course/${course._id}/edit`}>
                          <button className="bg-transparent p-1 border-0 hover:text-blue-600">
                            <PencilSquareIcon className="w-6 h-6" />
                          </button>
                        </Link>
                        <button className="bg-transparent p-1 border-0 hover:text-blue-600" onClick={() => handleDelete(course._id)}>
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                  <div className="flex flex-row items-center">
                    <div className="font-semibold mx-auto">
                      <Link to="/course/create">
                        <button className="bg-white border-2 border-gray-200">Add New Courses</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
