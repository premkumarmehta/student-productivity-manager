import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket } from "react-icons/fa";

function CTABannerSection() {
  return (
    <section className="py-28 px-4">
      <div className="container-premium">
        
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-purple-500/30 border border-white/10"
        >
          {/* Glow Effects */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <FaRocket className="text-cyan-400" />
              <span className="text-gray-200 font-medium text-sm">
                Start Your Productivity Transformation Today
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Stop Managing Chaos.
              <span className="gradient-text"> Start Achieving More.</span>
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-2xl text-gray-300 mt-8 leading-relaxed">
              Join ambitious students using StudentPro to organize tasks,
              conquer deadlines, and unlock academic excellence.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/register"
                className="btn-premium flex items-center justify-center gap-3"
              >
                Get Started Now <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl border border-cyan-400 text-white hover:bg-cyan-500/10 transition text-center"
              >
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTABannerSection;