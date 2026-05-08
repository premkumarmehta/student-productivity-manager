import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaTasks, FaChartLine, FaClock } from "react-icons/fa";

function HeroSection() {
  const stats = [
    {
      icon: <FaTasks />,
      title: "10K+ Tasks Managed",
      desc: "Students organize smarter every day.",
    },
    {
      icon: <FaChartLine />,
      title: "95% Productivity Boost",
      desc: "Track goals and stay focused.",
    },
    {
      icon: <FaClock />,
      title: "Save 5+ Hours Weekly",
      desc: "Manage time like a pro.",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      <div className="container-premium grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <FaCheckCircle className="text-cyan-400" />
            <span className="text-sm text-gray-200">
              Smart Productivity Platform for Students
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Master Your
            <span className="gradient-text"> Tasks, Goals </span>
            & Academic Success
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Organize assignments, manage deadlines, track productivity,
            and transform your student life with an all-in-one premium
            productivity system.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="btn-premium flex items-center justify-center gap-2"
            >
              Get Started <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl border border-cyan-400 text-white hover:bg-cyan-500/10 transition text-center"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid gap-6"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-purple-400">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;