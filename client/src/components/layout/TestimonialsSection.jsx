import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaUserGraduate,
} from "react-icons/fa";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Prem Kumar",
      role: "MCA Student",
      review:
        "StudentPro completely transformed how I manage assignments and deadlines. My productivity has improved massively.",
    },
    {
      name: "Prince Kumar",
      role: "Engineering Student",
      review:
        "The dashboard and task planning tools helped me reduce stress and stay ahead of exams with confidence.",
    },
    {
      name: "Lokesh Kumar",
      role: "MCA Student",
      review:
        "Finally, a productivity system built for students. Clean, modern, and actually useful for academic success.",
    },
  ];

  return (
    <section className="py-28 px-4">
      <div className="container-premium">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-cyan-400 uppercase tracking-[0.3em] font-semibold">
            Student Success Stories
          </p>

          <h2 className="text-4xl md:text-6xl font-extrabold mt-5">
            Trusted By
            <span className="gradient-text"> Ambitious Students</span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg md:text-xl">
            Join students who are transforming productivity, reducing stress,
            and achieving more with StudentPro.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-8 relative"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-4xl text-cyan-400 mb-6" />

              {/* Review */}
              <p className="text-gray-200 text-lg leading-relaxed">
                {testimonial.review}
              </p>

              {/* Rating */}
              <div className="flex gap-1 mt-6 text-yellow-400">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar key={starIndex} />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-2xl">
                  <FaUserGraduate />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    {testimonial.name}
                  </h3>

                  <p className="text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;