import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaUsers,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";

function AboutSection() {
  const stats = [
    {
      icon: <FaUsers />,
      number: "25K+",
      label: "Students Empowered",
    },
    {
      icon: <FaGraduationCap />,
      number: "500K+",
      label: "Tasks Completed",
    },
    {
      icon: <FaRocket />,
      number: "98%",
      label: "Success-Oriented Design",
    },
  ];

  return (
    <section className="py-28 px-4">
      <div className="container-premium grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Label */}
          <p className="text-cyan-400 uppercase tracking-[0.3em] font-semibold">
            Why Choose StudentPro
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-extrabold mt-5 leading-tight">
            Built For Students Who
            <span className="gradient-text"> Want More</span>
          </h2>

          {/* Mission Statement */}
          <p className="text-gray-300 text-lg md:text-xl mt-8 leading-relaxed">
            StudentPro was created to help ambitious students overcome chaos,
            manage deadlines, and unlock peak productivity through modern,
            student-centered technology.
          </p>

          {/* Mission Points */}
          <div className="mt-10 space-y-5">
            {[
              "Organize academic life with precision",
              "Reduce stress through smart planning",
              "Boost focus, productivity, and goal completion",
            ].map((point, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <FaBullseye />
                </div>

                <p className="text-lg text-gray-200">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-3xl p-8"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-3xl">
                  {stat.icon}
                </div>

                <div>
                  <h3 className="text-4xl font-extrabold gradient-text">
                    {stat.number}
                  </h3>

                  <p className="text-gray-300 text-lg mt-1">
                    {stat.label}
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

export default AboutSection;