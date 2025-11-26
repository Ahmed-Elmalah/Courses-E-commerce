import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../Components/Header";
import toast from "react-hot-toast";

const ApiUrl = "http://localhost:3000/api";

export default function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    title: "",
    instructor: "",
    duration: "",
    price: "",
    difficulty: "Beginner",
    categoryId: "",
  });

  // 1. جلب بيانات الكورس + الأقسام
  useEffect(() => {
    const fetchData = async () => {
      try {
        // نجيب الكورس عشان نملى البيانات
        const courseRes = await axios.get(`${ApiUrl}/courses/${id}`);
        // نجيب الأقسام عشان الـ Dropdown
        const categoryRes = await axios.get(`${ApiUrl}/category`);

        if (courseRes.data.status === "success") {
          const course = courseRes.data.data; // تأكد من هيكل الاستجابة حسب الباك اند بتاعك

          // تحديث القيم الابتدائية للفورم
          setInitialValues({
            title: course.title || "",
            instructor: course.instructor || "",
            duration: course.duration || "",
            price: course.price || 0,
            difficulty: course.difficulty || "Beginner",
            categoryId: course.categoryId || "",
          });
        }

        if (categoryRes.data.status === "success") {
          setCategories(categoryRes.data.data.categories);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 2. إعداد Formik
  const formik = useFormik({
    enableReinitialize: true, // مهم جداً عشان يحدث البيانات لما تيجي من الباك اند
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").min(3, "Min 3 chars"),
      instructor: Yup.string().required("Instructor is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Must be positive"),
      duration: Yup.number().required("Duration is required"),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        // تحويل القيم الرقمية للتأكد (عشان الباك اند ميضربش)
        const payload = {
          ...values,
          price: Number(values.price),
          duration: Number(values.duration),
          categoryId: Number(values.categoryId),
        };

        const res = await axios.put(`${ApiUrl}/courses/${id}`, payload);

        if (res.status === 200 || res.status === 201) {
          toast.success('Course updated successfully!')
          navigate(`/courses/${id}`); // رجعه لصفحة التفاصيل
        }
      } catch (err) {
        toast.error("Failed to update course ")
      }
    },
  });

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header />

      <div className="container mx-auto px-4 mt-10 max-w-2xl">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            Edit Course Details
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                {...formik.getFieldProps("title")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Instructor & Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  {...formik.getFieldProps("instructor")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {formik.touched.instructor && formik.errors.instructor && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.instructor}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  {...formik.getFieldProps("price")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </div>
                )}
              </div>
            </div>

            {/* Duration & Difficulty Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  name="duration"
                  {...formik.getFieldProps("duration")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  {...formik.getFieldProps("difficulty")}
                  className="w-full px-4 py-2 border select border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="categoryId"
                {...formik.getFieldProps("categoryId")}
                className="w-full select px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.categoryId}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
