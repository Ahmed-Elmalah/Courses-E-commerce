import { useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { CgMenuRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full px-4 flex justify-center items-center shadow-2xl">
      <div className="container w-90/100 md:w-80/100 py-5 h-full flex justify-between items-center relative">
        <Link
          to={"/"}
          className="h-full flex items-center gap-2 cursor-pointer"
        >
          <GiOpenBook className="text-4xl text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">CourseWave</h1>
        </Link>
        <nav className="h-full text-gray-800 hidden md:flex md:justify-end gap-6 items-center">
          <Link className="hover:text-indigo-600 transition duration-150">
            Courses
          </Link>
          <Link className="hover:text-indigo-600 transition duration-150">
            Pricing
          </Link>
          <Link className="hover:text-indigo-600 transition duration-150">
            Blog
          </Link>
          <Link className="hover:text-indigo-600 transition duration-150">
            Support
          </Link>
        </nav>
        <button
          className="text-2xl text-gray-800 md:hidden z-50 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <IoClose className="text-white" /> : <CgMenuRight />}
        </button>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 border-gray-300  shadow-xl p-6 transition-transform duration-300 ease-in-out md:hidden z-40 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="mt-20 flex flex-col gap-6 text-xl">
            <Link
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200"
            >
              Courses
            </Link>
            <Link
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200"
            >
              Pricing
            </Link>
            <Link
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200"
            >
              Blog
            </Link>
            <Link
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
