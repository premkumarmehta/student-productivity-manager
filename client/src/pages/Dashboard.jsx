import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaTasks,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import TaskManager from "../components/tasks/TaskManager";
import toast from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully!");
  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Student Dashboard</h1>
       
        <div className="flex items-center gap-2 px-4 py-2">
          <button onClick={() => navigate("/")} className="px-6 text-white hover:text-cyan-400 transition duration-300 font-medium">Home</button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-xl"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl mt-10"
      >
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-cyan-400" />
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {user?.name || "Student"}{" "}
            </h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="glass p-6 rounded-2xl">
          <FaTasks className="text-3xl text-cyan-400" />
          <h3 className="text-xl mt-3 font-bold">Tasks</h3>
          <p className="text-gray-400">Manage your daily work</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <FaChartLine className="text-3xl text-purple-400" />
          <h3 className="text-xl mt-3 font-bold">Progress</h3>
          <p className="text-gray-400">Track productivity growth</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <FaUserCircle className="text-3xl text-green-400" />
          <h3 className="text-xl mt-3 font-bold">Profile</h3>
          <p className="text-gray-400">Manage your account</p>
        </div>
      </div>

      {/* Task Manager */}
      <TaskManager />
    </div>
  );
}

export default Dashboard;
