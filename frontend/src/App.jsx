import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CourseDetailsPage from './Pages/CourseDetailsPage.jsx';
export default function App() {
  return (
    <div className="w-full overflow-auto bg-gray-100 text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="*" element={<h1>404 Error | Page not found</h1>} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
