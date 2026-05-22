import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] =
  useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const { data } =
      await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    login(data);

    toast.success(
      `Welcome back, ${data.name}!`
    );

    navigate("/dashboard");

  } catch (error) {

    toast.error(
      error.response?.data
        ?.message ||
        "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const token =
    localStorage.getItem(
      "token"
    );

  if (token) {
    navigate(
      "/dashboard"
    );
  }
}, []);

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
          <FaLock className="text-4xl text-cyan-400 mx-auto" />
          <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Login to access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="Enter password"
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
    "Login"
  )}
</button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
