import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import API from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
const navigate = useNavigate();

const [loading, setLoading] =
  useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await API.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    toast.success(
      "Registration successful!"
    );

    navigate("/login");

  } catch (error) {

    toast.error(
      error.response?.data
        ?.message ||
        "Register failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass p-10 rounded-3xl border border-white/10"
      >

        {/* Header */}
        <div className="text-center mb-8">
          <FaUser className="text-4xl text-cyan-400 mx-auto" />
          <h2 className="text-3xl font-bold mt-4">Create Account</h2>
          <p className="text-gray-400 mt-2">
            Join StudentPro and boost your productivity
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <div className="flex items-center mt-2 glass px-4 py-3 rounded-xl">
              <FaUser className="text-cyan-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="bg-transparent w-full ml-3 outline-none text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="flex items-center mt-2 glass px-4 py-3 rounded-xl">
              <FaEnvelope className="text-cyan-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full ml-3 outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="flex items-center mt-2 glass px-4 py-3 rounded-xl">
              <FaLock className="text-cyan-400" />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Create password"
                className="bg-transparent w-full ml-3 outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer text-gray-400"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
    loading
      ? "bg-cyan-700 cursor-not-allowed"
      : "bg-cyan-500 hover:bg-cyan-400 text-black"
  }`}
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

      Processing...
    </>
  ) : (
    "Register"
  )}
</button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
