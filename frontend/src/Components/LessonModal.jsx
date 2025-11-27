import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

export default function LessonModal({ isOpen, onClose, onSubmit, initialValues, isEditMode }) {
  if (!isOpen) return null;

  const formik = useFormik({
    enableReinitialize: true, // عشان لما نفتح التعديل، البيانات تتحدث
    initialValues: initialValues || {
      title: "",
      content: "",
      duration: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").min(3),
      content: Yup.string().required("Content is required"),
      duration: Yup.string().required("Duration is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  // قفل المودال لو دوسنا بره
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") onClose();
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 backdrop-blur-sm transition-opacity"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditMode ? "Edit Lesson" : "Add New Lesson"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...formik.getFieldProps("title")}
              className="input input-bordered w-full focus:ring-2 text-white focus:ring-indigo-500"
              placeholder="e.g. Introduction to React"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content / URL</label>
            <textarea
              rows="3"
              {...formik.getFieldProps("content")}
              className="textarea textarea-bordered w-full focus:ring-2 text-white focus:ring-indigo-500"
              placeholder="e.g. https://video-url.com or Description"
            ></textarea>
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.content}</div>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              {...formik.getFieldProps("duration")}
              className="input input-bordered w-full focus:ring-2 text-white focus:ring-indigo-500"
              placeholder="e.g. 10 mins"
            />
            {formik.touched.duration && formik.errors.duration && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.duration}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white flex-1 border-none"
            >
              {isEditMode ? "Save Changes" : "Add Lesson"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 flex-1 border-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}