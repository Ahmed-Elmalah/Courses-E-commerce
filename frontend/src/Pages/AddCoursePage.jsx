import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md"; // أيقونة المسح

const ApiUrl = "http://localhost:3000/api";

export default function AddCoursePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // جلب الأقسام عشان الـ Dropdown
  useEffect(() => {
    axios.get(`${ApiUrl}/category`).then((res) => {
      if (res.data.status === "success") {
        setCategories(res.data.data.categories);
      }
    });
  }, []);

  // القيم المبدئية (فاضية)
  const initialValues = {
    title: "",
    instructor: "",
    duration: "",
    price: "",
    difficulty: "Beginner",
    categoryId: "",
    description: "",
    image: "",
    lessons: [], // ✅ مصفوفة الدروس فاضية في البداية
  };

  // قواعد التحقق (شاملة الدروس)
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").min(3),
    instructor: Yup.string().required("Instructor is required"),
    price: Yup.number().required("Price is required").min(0),
    duration: Yup.number().required("Duration is required"),
    categoryId: Yup.string().required("Category is required"),
    image: Yup.string().url("Must be a valid URL").optional(),
    description: Yup.string().optional(),
    // تحقق من مصفوفة الدروس
    lessons: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        content: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // تجهيز البيانات (تحويل الأرقام)
      const payload = {
        ...values,
        price: Number(values.price),
        duration: Number(values.duration),
        categoryId: Number(values.categoryId),
        // الدروس بتتبعت زي ما هي مصفوفة
      };

      const res = await axios.post(`${ApiUrl}/courses`, payload);

      if (res.status === 201) {
        toast.success("Course created successfully! 🎉");
        navigate("/"); // رجوع للصفحة الرئيسية
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <div className="container mx-auto px-4 mt-10 max-w-4xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            Create New Course
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-6">
                
                {/* --- 1. Basic Course Details --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="col-span-full">
                    <label className="label-text font-bold">Course Title</label>
                    <Field
                      name="title"
                      className="input bg-white border border-indigo-600 input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Master React.js"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Instructor */}
                  <div>
                    <label className="label-text font-bold">Instructor</label>
                    <Field name="instructor" className="input input-bordered w-full bg-white border border-indigo-600" />
                    <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="label-text font-bold">Category</label>
                    <Field as="select" name="categoryId" className="select select-bordered w-full bg-white border border-indigo-600">
                      <option value="" disabled>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Price & Duration */}
                  <div>
                    <label className="label-text font-bold">Price ($)</label>
                    <Field type="number" name="price" className="input input-bordered w-full bg-white border border-indigo-600" />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="label-text font-bold">Duration (Hours)</label>
                    <Field type="number" name="duration" className="input input-bordered w-full bg-white border border-indigo-600" />
                    <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="label-text font-bold">Difficulty</label>
                    <Field as="select" name="difficulty" className="select select-bordered w-full bg-white border border-indigo-600">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </Field>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="label-text font-bold">Image URL</label>
                    <Field name="image" className="input input-bordered w-full bg-white border border-indigo-600" placeholder="https://..." />
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="label-text font-bold">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="4"
                    className="textarea textarea-bordered w-full text-base resize-none bg-white border border-indigo-600"
                    placeholder="Course details..."
                  />
                </div>

                {/* --- 2. Lessons Section (Dynamic FieldArray) --- */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-800">Course Lessons</h3>
                  </div>

                  <FieldArray name="lessons">
                    {({ insert, remove, push }) => (
                      <div className="space-y-4">
                        {values.lessons.length > 0 &&
                          values.lessons.map((lesson, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex gap-4 items-start">
                              <span className="font-bold text-gray-400 mt-3">#{index + 1}</span>
                              
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <Field
                                    name={`lessons.${index}.title`}
                                    placeholder="Lesson Title"
                                    className="input input-sm input-bordered w-full bg-white border border-indigo-600"
                                  />
                                  <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                  <Field
                                    name={`lessons.${index}.content`}
                                    placeholder="Content / URL"
                                    className="input input-sm input-bordered w-full bg-white border border-indigo-600"
                                  />
                                  <ErrorMessage name={`lessons.${index}.content`} component="div" className="text-red-500 text-xs" />
                                </div>
                                <div>
                                  <Field
                                    name={`lessons.${index}.duration`}
                                    placeholder="Duration (e.g. 10m)"
                                    className="input input-sm input-bordered w-full bg-white border border-indigo-600"
                                  />
                                  <ErrorMessage name={`lessons.${index}.duration`} component="div" className="text-red-500 text-xs" />
                                </div>
                              </div>

                              {/* زرار حذف الدرس */}
                              <button
                                type="button"
                                className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50"
                                onClick={() => remove(index)}
                              >
                                <MdDelete size={20} />
                              </button>
                            </div>
                          ))}

                        {/* زرار إضافة درس جديد */}
                        <button
                          type="button"
                          className="btn btn-outline btn-indigo w-full border-dashed border-2"
                          onClick={() => push({ title: "", content: "", duration: "" })}
                        >
                          + Add Lesson
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* --- Actions --- */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white flex-1 text-lg"
                  >
                    {isSubmitting ? "Creating..." : "Create Course"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn btn-ghost flex-1 text-lg"
                  >
                    Cancel
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}