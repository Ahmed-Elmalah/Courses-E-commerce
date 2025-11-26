import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

export default function App() {
  return (
    <div className="w-full  bg-gray-100 text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="*" element={<h1>404 Error | Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
