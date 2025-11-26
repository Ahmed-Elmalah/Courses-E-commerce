import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full px-4 flex justify-center items-center shadow-2xl">
      <div className="container w-80/100  py-5 h-full flex justify-between items-center">
        <Link to={"/"} className="h-full flex items-center gap-2 cursor-pointer">
          <GiOpenBook className="text-4xl text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">CourseWave</h1>
        </Link>
        <nav className="w-2/7 h-full flex justify-between items-center text-gray-800">
          <Link>Courses</Link>
          <Link>Pricing</Link>
          <Link>Blog</Link>
          <Link>Support</Link>
        </nav>
      </div>
    </header>
  );
}
