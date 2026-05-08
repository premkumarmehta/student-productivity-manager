import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {

  const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/premkumarmehta",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/prem-kumar-804837234/",
  },
  {
    icon: FaTwitter,
    href: "https://x.com/premkumartech",
  },
  {
    icon: FaEnvelope,
    href: "mailto:codewithprem12345@gmail.com",
  },
];

  return (
    <footer className="pt-24 pb-10 px-4 border-t border-white/10">
      <div className="container-premium">
        
        {/* Top Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-3 text-3xl font-extrabold"
            >
              <FaGraduationCap className="text-cyan-400" />
              <span className="gradient-text">StudentPro</span>
            </Link>

            <p className="text-gray-400 mt-5 leading-relaxed">
              Empowering students to master productivity, conquer deadlines,
              and achieve academic excellence with modern tools.
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
  {socialLinks.map(({ icon: Icon, href }, index) => (
    <a
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-2xl glass flex items-center justify-center hover:scale-110 transition"
    >
      <Icon />
    </a>
  ))}
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Features
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>Task Management</p>
              <p>Deadline Tracking</p>
              <p>Analytics</p>
              <p>Smart Notifications</p>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>Help Center</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Contact Us</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
          <p>
            © {new Date().getFullYear()} StudentPro. All rights reserved.
          </p>

          <p>
            Designed By <u><a href="https://prem-portfolio-sable.vercel.app/" target="_blank" className="text-blue-500">Prem Kumar</a></u> .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;