import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import HomePage from "./Pages/HomePage";
import CourseDetailsPage from "./Pages/CourseDetailsPage.jsx";
import EditCoursePage from "./Pages/EditCoursePage.jsx";
export default function App() {
  return (
    <div className="w-full overflow-auto min-h-dvh bg-gray-100 text-gray-900">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>404 Error | Page not found</h1>} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/edit-course/:id" element={<EditCoursePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
