import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LessonModal({ isOpen, onClose, onSubmit, initialValues, isEditMode }) {
  if (!isOpen) return null;

  // 1. تعريف قواعد التحقق
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").min(3),
    content: Yup.string().required("Content is required"),
    duration: Yup.string().required("Duration is required"),
  });

  // 2. القيم الافتراضية
  const defaultValues = {
    title: "",
    content: "",
    duration: "",
  };

  return (
    <div
      id="modal-backdrop"
      onClick={(e) => e.target.id === "modal-backdrop" && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditMode ? "Edit Lesson" : "Add New Lesson"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* 👇👇👇 بداية Formik Components 👇👇👇 */}
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={validationSchema}
          enableReinitialize={true} // عشان يحدث البيانات لو فتحت تعديل بعد إضافة
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Field
                  name="title"
                  type="text"
                  className="input  input-bordered w-full focus:ring-2 focus:ring-indigo-500 bg-white border border-indigo-600"
                  placeholder="e.g. Introduction to React"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content / URL</label>
                <Field
                  name="content"
                  as="textarea" // حولناه لـ textarea بسهولة
                  rows="3"
                  className="textarea  textarea-bordered w-full focus:ring-2 focus:ring-indigo-500 bg-white border border-indigo-600"
                  placeholder="e.g. https://video-url.com or Description"
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Duration Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <Field
                  name="duration"
                  type="text"
                  className="input  input-bordered w-full focus:ring-2 focus:ring-indigo-500 bg-white border border-indigo-600"
                  placeholder="e.g. 10 mins"
                />
                <ErrorMessage name="duration" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
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

            </Form>
          )}
        </Formik>
        {/* 👆👆👆 نهاية Formik Components 👆👆👆 */}

      </div>
    </div>
  );
}