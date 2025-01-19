import React, { useEffect, useState } from "react";
import axios from 'axios'
import Sidebar from "../components/layout/Sidebar";
import PageHead from "../components/layout/PageHead";
import Quest from "../components/Quest";
import { useUser } from "../hooks/useUser";
import { API_URL } from "../utils/constants";

const Quests = () => {
  const {user, loading} = useUser();
  const [userProgress, setUserProgress] = useState(null);
  const pageTitle = "Quests";
  const pageDescription = "Do Quests and Get Free Rewards!!!";
  const pageHeadBackground = "from-purple-600 to-fuchsia-600";

  useEffect(() => {
    const getUserProgress = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/progress/${user._id}`)
        setUserProgress(response.data)
      } catch (error) {
        setError(error.message);
      }
    }
    if(!loading){
      getUserProgress();
    }
  }, [loading])

  const quests = [
    {
      title: "Earn 100 scores",
      objective: "100 scores",
      prize: "SilverChest",
    },
    {
      title: "Earn 1000 scores",
      objective: "1000 scores",
      prize: "GoldenChest",
    },
    {
      title: "Earn 10000 scores",
      objective: "10000 scores",
      prize: "DiamondChest",
    },
    {
      title: "Buy 10 courses",
      objective: "10 courses",
      prize: "GoldenChest",
    },
    {
      title: "Buy 30 courses",
      objective: "30 courses",
      prize: "EmeraldChest",
    },
    {
      title: "Buy 50 courses",
      objective: "50 courses",
      prize: "BlackChest",
    },
  ];

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen w-screen bg-gray-100 top-0 absolute">
        <div className="w-full">
          <PageHead pageTitle={pageTitle} pageHeadBackground={pageHeadBackground} pageDescription={pageDescription} />
        </div>
        <div className="mx-auto py-6 px-2 md:px-6 lg:px-8">
          <div className="max-w-7xl flex flex-col gap-4 mx-auto justify-center">
            {userProgress != null && quests.map((quest) => {
              const value = quest.objective.split(' ')[0]
              const target = quest.objective.split(' ')[1]
              let progress;
              if(target === 'scores'){
                progress = (userProgress.scores / parseInt(value)) * 100
              } else if (target === 'courses'){
                progress = (userProgress.courses.length / parseInt(value)) * 100
                console.log(value+"au"+progress)
              }
              return (
                <div>
                  <div className="w-full flex flex-row text-gray-900 items-center justify-center">
                    <div className="flex flex-col w-full">
                      <h2 className="text-2xl font-semibold p-2">{quest.title}</h2>
                      <div className="max-w-6xl h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-4 bg-blue-600 rounded-full" style={{ width: progress+"%" }}></div>
                      </div>
                    </div>
                    <div>Prize</div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent my-5"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
