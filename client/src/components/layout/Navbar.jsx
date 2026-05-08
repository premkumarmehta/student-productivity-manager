import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="container-premium flex justify-between items-center py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <FaGraduationCap className="text-3xl text-purple-400" />
          <h1 className="text-2xl font-bold gradient-text">
            StudentPro
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-white hover:text-cyan-400 transition duration-300 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-purple-400 hover:bg-purple-500/20 transition"
          >
            Login
          </Link>

          <Link to="/register" className="btn-premium">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-white"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass px-6 py-6"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-cyan-400 transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="border border-purple-400 rounded-xl px-4 py-2 text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="btn-premium text-center"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;