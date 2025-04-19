import React from "react";
import { CalendarCheck, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-4 pt-10 pb-6 mt-16 border-t border-purple-100 bg-gray-50">
      <div className="flex flex-col items-center justify-between max-w-6xl mx-auto md:flex-row">
        {/* Left Side: Logo + Tagline */}
        <div className="flex items-start gap-3 mb-6 md:mb-0">
          <CalendarCheck className="text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-purple-700">EventSync</h3>
            <p className="text-sm text-gray-600">Simplifying event management</p>
          </div>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex gap-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} EventSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
