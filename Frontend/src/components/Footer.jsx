import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white text-center py-3 mt-auto">
      <p className="text-sm">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/quasimkhan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition duration-300"
        >
          Quasim Khan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
