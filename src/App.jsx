import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Quests from "./pages/Quests";
import Account from "./pages/Account";
import Forum from "./pages/Forum";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Role from "./pages/auth/Role";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Section from "./pages/course/Section";
import CourseBuilder from "./pages/CourseBuilder";
import CourseEditor from "./pages/CourseEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<Role />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/course/:courseId/section/:sectionId" element={<Section />} />
        <Route path="/course/create" element={<CourseBuilder />} />
        <Route path="/course/:id/edit" element={<CourseEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
