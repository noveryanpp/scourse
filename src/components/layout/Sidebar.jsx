import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Bars3Icon, XMarkIcon, HomeIcon, AcademicCapIcon, ChartBarIcon, ShoppingBagIcon, StarIcon, UserIcon, ChatBubbleLeftIcon, BellIcon, CircleStackIcon, BanknotesIcon, BoltIcon } from "@heroicons/react/24/outline";
import { API_URL } from '../../utils/constants'
import { useUser, useUserProgress } from "../../hooks/useUser";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useUser();
  const [loadingUserProgress, setLoadingUserProgress] = useState(true)
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    if (!loading) {
      const fetchUserProgress = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/progress/${user._id}`);
          setUserProgress(response.data);
          setLoadingUserProgress(false);
        } catch (error) {
          console.error("Error fetching user progress:", error);
        }
      }
      fetchUserProgress();
    }
  }, [loading]);


  const menuItems = [
    { name: "Home", path: "/home", icon: HomeIcon },
    { name: "Courses", path: "/courses", icon: AcademicCapIcon },
    { name: "Leaderboard", path: "/leaderboard", icon: ChartBarIcon },
    { name: "Shop", path: "/shop", icon: ShoppingBagIcon },
    { name: "Quests", path: "/quests", icon: StarIcon },
    { name: "Forum", path: "/forum", icon: ChatBubbleLeftIcon },
    { name: "Account", path: "/account", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-gradient-to-r from-white via-white/80 to-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="px-2">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center p-1 rounded-xl bg-white text-gray-900 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {isSidebarOpen ? <XMarkIcon className="block h-8 w-8" /> : <Bars3Icon className="block h-8 w-8" />}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Scourse</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {!loadingUserProgress ? 
                <div className="flex flex-wrap grap-2 text-gray-900 text-md">
                  <div className="mx-2"><BoltIcon className="2-6 h-6 inline"/>{userProgress.scores}</div>
                  <div className="mx-2"><CircleStackIcon className="2-6 h-6 inline"/>{userProgress.scoins}</div>
                  <div className="mx-2"><BanknotesIcon className="2-6 h-6 inline"/>{userProgress.scashes}</div>
                </div> 
                  : 
                <div>Loading...</div>
              }

              <Link to="/account" className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-blue-50 transition-all duration-200">
                <span className="hidden md:block text-sm font-medium text-gray-700">{loading ? "Loading..." : user.fullName || "Guest"}</span>
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-lg object-cover border-2 border-white shadow-sm"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar"
                  />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      <div className={`bg-white/60 backdrop-blur-md shadow-sm fixed inset-y-0 left-0 ${isSidebarOpen ? "w-64" : "w-0 md:w-16"} duration-300 ease-in-out bg-white border-r border-gray-200 z-40 pt-16`}>
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <nav className="mt-5 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}
                >
                  <item.icon className={`mr-5 h-8 w-8 flex-shrink-0 transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"} pt-16`}>
        <div className="p-6"></div>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
}

export default Sidebar;
