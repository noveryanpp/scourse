import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Quiz from "./Quiz";
import parse from "html-react-parser";
import "./Section.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Section = () => {
  const { courseId, sectionId } = useParams();
  const [section, setSection] = useState("");
  const [totalSection, setTotalSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://20.255.59.99:45/api/courses/${courseId}/section/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSection(response.data.sectionData);
        setTotalSection(response.data.sectionsLength);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-gray-100 absolute top-0">
        <div className="w-screen pt-20">
          <div className="flex flex-col max-w-7xl mx-auto p-4 md:pl-20 xl:pl-4">
            <div className="bg-white p-5 md:p-10">
              {loading ? (
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
                    <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 pl-4 pr-2">
                      Next
                      <ChevronRightIcon className="w-5 h-5 inline" />
                    </button>
                  </Link>
                ) : (
                  <Link to={`/course/${courseId}`}>
                    <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 px-4">Finish</button>
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
