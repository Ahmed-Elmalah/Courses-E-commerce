import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import noImg from "../assets/noImage.webp";

// Ensure this URL matches your server address
const ApiUrl = "http://localhost:3000/api";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  // Simplified Data Fetching (Removed catch block)
  useEffect(() => {
    const fetchCourse = async () => {
      // ✅ Removed the try/catch structure entirely
      const res = await axios.get(`${ApiUrl}/courses/${id}`);

      // Access the course object directly from res.data.data
      if (res.data.status === "success" && res.data.data) {
        setCourse(res.data.data);
      }

      // ⚠️ Note: Any network error or server error will now crash the application
      // or lead to an unhandled promise rejection error displayed in the console.
    };

    fetchCourse();
  }, [id]);

  // --- Display Course Details ---
  const hasDiscount =
    course.discount && course.discount > 0 && course.discount !== course.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Conditional rendering: only show content if course.title exists (data loaded) */}
        {course.title && (
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10">
            {/* Course Title and Category */}
            <div className="border-b pb-4 mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-indigo-600 font-medium">
                {course.category || "Uncategorized"}
              </p>
            </div>

            {/* Course Image */}
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img
                src={course.image || course.img || noImg}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Split: Description + Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column (Description) */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  About This Course
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {course.description ||
                    "No description is available for this course."}
                </p>

                {/* Additional Details */}
                <div className="mt-8 pt-4 border-t">
                  <h3 className="text-xl font-bold mb-3">Course Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                    <li>Duration: **{course.duration || "N/A"}** hours</li>
                    <li>
                      Instructor: **{course.instructor || "Training Team"}**
                    </li>
                    <li>Level: **{course.difficulty || "N/A"}**</li>
                  </ul>
                </div>
              </div>

              {/* Sidebar (Pricing and Action) */}
              <div className="lg:col-span-1">
                <div className="sticky top-10 p-6 bg-indigo-50 rounded-lg shadow-xl border border-indigo-200">
                  <p className="text-gray-600 text-xl mb-2">Price:</p>

                  {/* Price and Discount Display */}
                  <div className="flex items-baseline gap-3 mb-6">
                    {hasDiscount ? (
                      <>
                        <span className="text-4xl font-extrabold text-indigo-700">
                          {course.discount}$
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {course.price}$
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          (Great Discount!)
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-extrabold text-indigo-700">
                        {course.price}$
                      </span>
                    )}
                  </div>

                  {/* Purchase Button */}
                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
                    onClick={() => alert(`Adding ${course.title} to cart!`)}
                  >
                    Buy This Course Now 🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
