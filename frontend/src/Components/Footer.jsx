import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r bottom-0 from-indigo-800 to-indigo-950 w-full text-white mt-10 p-8 py-16 flex justify-center items-center">
      <div className="container wfull  md:w-95/100 lg:w-85/100 h-full">
        <div className="w-full mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row  w-full justify-center md:justify-between items-center  md:items-center gap-8 md:gap-4">
            <div className="flex  flex-col items-center justify-center">
              <div className="flex p-2 gap-2 mb-2 items-center">
                <GiOpenBook className="text-6xl font-bold text-white" />
                <h2 className="text-5xl font-bold text-white ">CourseWave</h2>
              </div>
              <p className="text-[12px] text-indigo-200">
                &copy; {new Date().getFullYear()} CourseWave. All rights
                reserved.
              </p>
            </div>
            <div className="flex  items-center h-1/2 w-full lg:w-1/2 gap-8 md:gap-4">
              <div className="flex flex-col items-center w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Quick Links
                </h3>
                <ul className="text-indigo-200 flex flex-col items-center gap-1 text-center md:text-left">
                  <li className="mb-1">
                    <a
                      href="#"
                      className="hover:text-indigo-100 transition-colors duration-200"
                    >
                      Courses
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="hover:text-indigo-100 transition-colors duration-200"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="#"
                      className="hover:text-indigo-100 transition-colors duration-200"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-100 transition-colors duration-200"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <h3 className="text-3xl font-semibold text-white mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-200 hover:text-white transition-colors duration-200"
                  >
                    <FaFacebookF className="text-xl" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-200 hover:text-white transition-colors duration-200"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-200 hover:text-white transition-colors duration-200"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
