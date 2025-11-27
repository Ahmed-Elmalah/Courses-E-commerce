import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
    description: "",
    image: "",
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
            description: course.description || "",
            image: course.image ?? course.img ?? "",
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
      description: Yup.string().optional(),
      image: Yup.string()
        .test(
          'is-url-or-empty', 
          'Must be a valid URL', 
          (value) => !value || Yup.string().url().isValidSync(value)
        )
        .optional(),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          price: Number(values.price),
          duration: Number(values.duration),
          categoryId: Number(values.categoryId),
          image: values.image || "",
        };

        const res = await axios.put(`${ApiUrl}/courses/${id}`, payload);

        if (res.status === 200 || res.status === 201) {
          toast.success("Course updated successfully!");
          navigate(`/courses/${id}`); // رجعه لصفحة التفاصيل
        }
      } catch (err) {
        toast.error("Failed to update course ");
      }
    },
  });

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
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

            {/* Description Field */}
            <div className="col-span-full">
              {" "}
              {/* عشان ياخد العرض كامل لو انت عامل grid */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description
              </label>
              <div className="relative">
                <textarea
                  rows="5" // عدد السطور المبدئي
                  placeholder="Write a detailed description about the course content, objectives, and prerequisites..."
                  {...formik.getFieldProps("description")}
                  className={`
         w-full px-4 py-2 border border-gray-300 resize-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
        ${
          formik.touched.description && formik.errors.description
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-300"
        }
      `}
                ></textarea>

                {/* أيقونة صغيرة اختيارية في الزاوية كمنظر جمالي */}
                <div className="absolute bottom-3 right-3 text-gray-400 text-xs pointer-events-none">
                  {formik.values.description
                    ? formik.values.description.length
                    : 0}{" "}
                  chars
                </div>
              </div>
              {/* رسالة الخطأ */}
              {formik.touched.description && formik.errors.description && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formik.errors.description}
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

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                {...formik.getFieldProps("image")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="https://example.com/image.png"
              />
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.image}
                </div>
              )}

              {/* معاينة للصورة لو موجودة */}
              {formik.values.image && (
                <div className="mt-2 w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={formik.values.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")} // اخفيها لو الرابط بايظ
                  />
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
