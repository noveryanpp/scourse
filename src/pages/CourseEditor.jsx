import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flowbite, Tabs } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChevronLeftIcon, DocumentTextIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageHead from "../components/layout/PageHead";
import Sidebar from "../components/layout/Sidebar";
import { API_URL } from "../utils/constants";

export default function CourseEditor() {
  // Page Header
  const pageTitle = "Course Editor";
  const pageDescription = "Edit your Course";
  const pageHeadBackground = "from-blue-600 via-purple-600 to-indigo-600";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // State for fetching user data
  const [user, setUser] = useState({});

  const { id } = useParams();

  // State for course
  const [course, setCourse] = useState({});
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState({
    currency: "Free",
    amount: "0",
  });
  const [courseRewards, setCourseRewards] = useState({});
  const [courseLevel, setCourseLevel] = useState("Beginner");
  // const [courseObjectives, setCourseObjectives] = useState("");
  // const [courseRequirements, setCourseRequirements] = useState("");
  const [sections, setSections] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailBase64, setThumbnailBase64] = useState("");

  let isFree = coursePrice.currency === "Free";

  // Fetch user data and default sections data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/courses/${id}`);
        const section = await axios.get(`${API_URL}/api/courses/${id}/section`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setCourse(response.data);
        setSections(section.data.sectionData);
      } catch (err) {
        setError("Failed to fetch course details");
        console.error("Error fetching course:", err);
      } finally {
        setCourseLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  useEffect(() => {
    const isOwnedCourse = () => {
      const isOwned = (course) => course.instructor._id != user._id;
      if (!isOwned) {
        setError("Not your courses");
      } else {
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setCourseRewards(course.rewards);
        setCourseLevel(course.level);
      }
    };

    isOwnedCourse();
  }, [courseLoading]);

  // Function for handling sections update
  function handleChange(id, newTitle, newContent) {
    const newSections = sections.map((section, index) => {
      if (index === id) {
        const updatedSection = {
          ...section,
          title: newTitle || section.title,
          content: newContent || section.content,
          order: id + 1,
        };

        return updatedSection;
      }

      return section;
    });

    setSections(newSections);
  }

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnailBase64(reader.result);
    };
    
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setFileToBase64(file);
    console.log(file)
  };

  // Function for handling sections delete
  function handleDelete(id) {
    setSections((oldValues) => {
      return oldValues.filter((_, i) => i !== id);
    });
  }

  // Function for adding new course data into database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    setMessage("");

    try {
      const requestData = {
        title: courseTitle,
        description: courseDescription,
        instructor: user._id,
        thumbnailImage: thumbnailBase64,
        price: coursePrice,
        rewards: {
          score: courseLevel === "Advanced" ? 100 * sections.length : courseLevel === "Intermediate" ? 80 * sections.length : 50 * sections.length,
          scoin: courseLevel === "Advanced" ? 100 : courseLevel === "Intermediate" ? 80 : 50,
        },
        level: courseLevel,
        sections: sections,
      };

      console.log("Request Data:", JSON.stringify(requestData, null, 2));

      // Post new course data
      const response = await axios({
        method: "put",
        url: `${API_URL}/api/courses/${id}`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Server Response:", response);

      if (response.data) {
        setMessage("Course Saved! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Save Course error:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 400) {
        setMessage("Invalid data. Please check your inputs.");
      } else {
        setMessage("Save Course failed. Please try again later.");
      }
    }
  };

  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], ["link", "image", "video"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["clean"]],
  };

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "link", "image", "video", "code-block", "align"];

  if(courseLoading){
    return(<div>Loading...</div>)
  }

  if(error != ""){
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="w-full">
        <PageHead pageTitle={pageTitle} pageHeadBackground={pageHeadBackground} pageDescription={pageDescription} />
        <div className="max-w-7xl mx-auto pt-5 px-4">
          <div className="flex flex-row gap-2 mb-3">
            <Link to="/dashboard">
              <button className="bg-transparent text-gray-900 hover:text-blue-600">
                <ChevronLeftIcon className="w-6 h-6 inline" />
                Back
              </button>
            </Link>
            <button className="bg-transparent text-gray-900 hover:text-blue-600" onClick={handleSubmit}>
              <DocumentTextIcon className="w-6 h-6 inline mr-1" />
              Save
            </button>
          </div>
          <Flowbite>
            <Tabs aria-label="Tabs with underline" variant="fullWidth">
              <Tabs.Item active title="Course Details">
                <div className="flex flex-col gap-2 text-gray-900">
                  <label className="text-xl font-semibold">Title</label>
                  <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Title" className="bg-white rounded-lg p-2 border-2 border-gray-200" name="title" type="text" />

                  <label htmlFor="description" className="text-xl font-semibold">
                    Description
                  </label>
                  <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} placeholder="Description" className="bg-white rounded-lg p-2 border-2 border-gray-200" name="description"></textarea>

                  <label htmlFor="sectionthumbnail" className="text-xl font-semibold">
                    Upload New Thumbnail
                  </label>
                  <input
                    class="bg-white text-sm text-gray-900 border-2 border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    id="thumbnail"
                    placeholder="Upload Thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnail}
                  />

                  <label htmlFor="price" className="text-xl font-semibold">
                    Price
                  </label>
                  <div className="flex flex-row gap-2">
                    <select
                      value={coursePrice.currency}
                      onChange={(e) => setCoursePrice((prevPrice) => ({ ...prevPrice, currency: e.target.value }))}
                      placeholder="Price"
                      className="bg-white rounded-lg p-2 border-2 border-gray-200 w-28"
                      name="price"
                    >
                      <option value="Free">Free</option>
                      <option value="Scoin">Scoin</option>
                      <option value="Scash">Scash</option>
                    </select>
                    {!isFree ? (
                      <input
                        value={coursePrice.amount}
                        onChange={(e) => setCoursePrice((prevPrice) => ({ ...prevPrice, amount: e.target.value }))}
                        placeholder="Price"
                        className="bg-white rounded-lg p-2 border-2 border-gray-200 w-full"
                        name="price"
                        type="number"
                      />
                    ) : (
                      <div className="p-2 w-full"></div>
                    )}
                  </div>

                  <label htmlFor="Level" className="text-xl font-semibold">
                    Level
                  </label>
                  <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)} placeholder="Level" className="bg-white rounded-lg p-2 border-2 border-gray-200" name="Level">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>

                  {/* <label htmlFor="objectives" className="text-xl font-semibold">
                    Objectives
                  </label>
                  <input value={courseObjectives} onChange={(e) => setCourseObjectives(e.target.value)} placeholder="Objectives" className="bg-white rounded-lg p-2 border-2" name="objectives" />

                  <label htmlFor="requirements" className="text-xl font-semibold">
                    Requirements
                  </label>
                  <input value={courseRequirements} onChange={(e) => setCourseRequirements(e.target.value)} placeholder="Requirements" className="bg-white rounded-lg p-2 border-2" name="requirements" /> */}
                </div>
              </Tabs.Item>

              <Tabs.Item title="Sections">
                {sections.map((section, index) => {
                  const sectionId = index;
                  return (
                    <div className="flex flex-col gap-2 text-gray-900 mb-5">
                      <div className="flex flex-wrap gap-4">
                        <h2 className="text-2xl font-semibold">Section {sectionId + 1}</h2>
                        <button className="bg-transparent py-0 px-1 border-0" onClick={() => handleDelete(sectionId)}>
                          <TrashIcon className="text-gray-900 w-6 h-6 hover:text-blue-600" />
                        </button>
                      </div>
                      <label htmlFor="sectiontitle" className="text-xl font-semibold">
                        Section Title
                      </label>
                      <input
                        value={section.title}
                        onChange={(e) => handleChange(sectionId, e.target.value, section.content)}
                        placeholder="Section Title"
                        className="bg-white rounded-lg p-2 border-2 border-gray-200"
                        type="text"
                        name="sectiontitle"
                      />
                      <label htmlFor="sectioncontent" className="text-xl font-semibold">
                        Section Content
                      </label>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={section.content}
                        onChange={(newContent) => handleChange(sectionId, section.title, newContent)}
                        className="text-gray-900 border-2 rounded-lg bg-white max-h-screen overflow-y-auto"
                        placeholder="This section content..."
                      />
                    </div>
                  );
                })}
                <button
                  className="inline-block p-4 border-2 border-gray-200 rounded-t-lg hover:text-gray-600 hover:border-gray-300 bg-white text-gray-900"
                  type="button"
                  onClick={() => {
                    setSections([...sections, { title: "", content: "" }]);
                    console.log(sections);
                  }}
                >
                  <PlusIcon className="w-6 h-6 inline" />
                  Add new Section
                </button>
              </Tabs.Item>
            </Tabs>
          </Flowbite>
        </div>
      </div>
    </div>
  );
}

{
  /* <button
  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 bg-transparent"
  type="button"
  onClick={() => {
    setSections([...sections, { id: nextId++, title: "", content: "" }]);
  }}
>
  Add Section
</button>; */
}
