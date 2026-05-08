import React from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaCalendarCheck,
  FaChartPie,
  FaBell,
  FaUserGraduate,
  FaLayerGroup,
} from "react-icons/fa";

function FeaturesSection() {
  const features = [
    {
      icon: <FaTasks />,
      title: "Smart Task Management",
      desc: "Create, organize, prioritize, and complete academic tasks with powerful productivity workflows.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Deadline Tracking",
      desc: "Never miss assignments, exams, or project deadlines with intelligent scheduling tools.",
    },
    {
      icon: <FaChartPie />,
      title: "Productivity Analytics",
      desc: "Visualize progress, performance, and study efficiency through actionable analytics.",
    },
    {
      icon: <FaBell />,
      title: "Smart Notifications",
      desc: "Get reminders for important deadlines, tasks, and study sessions automatically.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Student-Focused Design",
      desc: "Built specifically for academic success, balancing assignments, exams, and personal growth.",
    },
    {
      icon: <FaLayerGroup />,
      title: "All-in-One Dashboard",
      desc: "Tasks, schedules, productivity, and goals in one unified premium dashboard.",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container-premium">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-cyan-400 font-semibold uppercase tracking-widest">
            Powerful Features
          </p>

          <h2 className="text-4xl md:text-6xl font-extrabold mt-4">
            Everything You Need To
            <span className="gradient-text"> Excel Academically</span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg md:text-xl">
            From task planning to productivity insights, StudentPro helps you
            stay ahead with modern tools built for ambitious students.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-8"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mt-4 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;