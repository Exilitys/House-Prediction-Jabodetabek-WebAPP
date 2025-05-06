import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">House Predict</span>
      </div>

      {/* Navigation Links */}
      <div className="flex w-full justify-evenly mx-3 lg:w-1/2 lg:mr-auto">
        {["Home", "Prediction", "House", "About"].map((link) => (
          <a
            key={link}
            href={link == "Home" ? "/" : `/${link.toLowerCase()}`}
            className="text-gray-700 hover:text-black transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Profile Picture */}
    </nav>
  );
};

export default Navbar;
