import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import noImg from "../assets/noImage.webp";
import Swal from "sweetalert2";
import LessonsCard from "../Components/LessonsCard";

const ApiUrl = "http://localhost:3000/api";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const cat = ["Programming", "Languages", "Soft Skills"];

  // --- Data Fetching ---

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`${ApiUrl}/courses/${id}`);

      if (res.data.status === "success" && res.data.data) {
        setCourse(res.data.data);
      }
    };

    fetchCourse();
  }, [id]);

  // delete course function

  const deleteCourse = async () => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#4f39f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      theme: "dark",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted",
          text: "Your file has been deleted.",
          icon: "success",
          theme: "dark",
        });
        axios.delete(`${ApiUrl}/courses/${course.id}`);
        navigate("../");
      }
    });
  };

  // update course function


  // --- Display Course Details ---

  const hasDiscount =
    course.discount && course.discount > 0 && course.discount !== course.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <button
          onClick={() => navigate("../")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back to Courses
        </button>

        {course.title ? (
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10">
            <div className="border-b pb-4 mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-indigo-600 font-medium">
                {cat[course.categoryId - 1] || "Uncategorized"}
              </p>
            </div>

            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img
                src={course.image || course.img || noImg}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Description */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  About This Course
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {course.description ||
                    "No description is available for this course."}
                </p>

                {/* Lessons/Course Content Section */}
                <div className="mt-10 pt-4 border-t">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Course Content ({course.lessons?.length || 0} Lessons)
                  </h2>

                  <ul className="space-y-4">
                    {course.lessons &&
                      course.lessons.map((lesson) => (
                        <LessonsCard key={lesson.id} lesson={lesson} />
                      ))}
                  </ul>
                </div>

                {/* Course Features */}
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

                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg transform hover:scale-105 mb-4"
                    onClick={() => {}}
                  >
                    CheckOut
                  </button>

                  {/* زراير التحكم (Edit & Delete) - منظر فقط */}
                  <div className="flex space-x-3 mt-4">
                    <button onClick={()=> navigate(`/edit-course/${course.id}`)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition duration-200 text-sm opacity-80 cursor-default">
                      Edit Course
                    </button>

                    <button
                      onClick={deleteCourse}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition duration-200 text-sm opacity-80 cursor-default"
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Loading course details or course not found...
          </p>
        )}
      </div>
    </div>
  );
}
