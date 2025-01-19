import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Quiz from "./Quiz";
import parse from "html-react-parser";
import "./Section.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { API_URL } from "../../utils/constants"
import { useUser } from "../../hooks/useUser"

const Section = () => {
  const { user, loading } = useUser()
  const { courseId, sectionId } = useParams();
  const [section, setSection] = useState("");
  const [totalSection, setTotalSection] = useState("");
  const [sectionLoading, setSectionLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSectionLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/courses/${courseId}/section/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSection(response.data.sectionData);
        setTotalSection(response.data.sectionsLength);
        setSectionLoading(false);
      } catch (err) {
        setError(err.message);
        setSectionLoading(false);
        console.error("Error fetching section:", err);
      }
    };

    fetchSection();
  }, [sectionId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [section]);

  const handleFinish = async () => {
    try {
      const token = localStorage.getItem("token");
      const userProgress = await axios.get(`${API_URL}/api/progress/${user._id}`);
      const userCourseProgress = userProgress.data.courses.find(course => course.courseId.toString() === courseId.toString());
      console.log(userCourseProgress.lastSection.toString())
      if(sectionId === userCourseProgress.lastSection.toString()){
        const response = await axios(`${API_URL}/api/progress/${courseId}/finishsection`, {
          method: "post",
          url: `${API_URL}/api/progress/${courseId}/finishsection`, 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data.message)
      } else if(sectionId > userCourseProgress.lastSection.toString()){
        console.log("You haven't finished section ", userCourseProgress.lastSection)
      }
    } catch (error) {
      setError(error.message);
      console.error("Error finishing section:", error);
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-gray-100 absolute top-0">
        <div className="w-screen pt-20">
          <div className="flex flex-col max-w-7xl mx-auto p-4 md:pl-20 xl:pl-4">
            <div className="bg-white p-5 md:p-10">
              {sectionLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error || !section ? (
                <div>
                  <div className="flex items-center justify-center min-h-screen text-red-500">{error || "Section not found"}</div>
                </div>
              ) : (
                <div>
                  <h1 className="text-gray-900 font-bold mb-4 text-3xl md:text-4xl">{section.title}</h1>
                  <div className="text-gray-900 section-content">{parse(section.content)}</div>
                </div>
              )}
              <Quiz />
              <div className="flex flex-row gap-2 mt-3">
                {sectionId > 1 ? (
                  <Link to={`/course/${courseId}/section/${sectionId - 1}`}>
                    <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 pr-4 pl-2">
                      <ChevronLeftIcon className="w-5 h-5 inline" />
                      Prev
                    </button>
                  </Link>
                ) : (
                  <div></div>
                )}
                {sectionId < totalSection ? (
                  <Link to={`/course/${courseId}/section/${parseInt(sectionId) + 1}`}>
                    <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 pl-4 pr-2" onClick={handleFinish}>
                      Next
                      <ChevronRightIcon className="w-5 h-5 inline" />
                    </button>
                  </Link>
                ) : (
                  <Link to={`/course/${courseId}`}>
                    <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 px-4" onClick={handleFinish}>Finish</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
