import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Section1 from "../Components/Section1";
import CourseCard from "../Components/CourseCard";
import Pagination from "../Components/Pagination";
const ApiUrl = "http://localhost:3000/api";
const categories = ["All", "Programming", "Languages", "Skills"];
const itemsPerPage = 6;

export default function HomePage() {

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

useEffect(()=>{
  const fetchCategories = async ()=>{
    try{
      const res = await axios.get(`${ApiUrl}/category`)
      if (res.data.status === "success"){
        setCategories([{ id: 0, name: "All" }, ...res.data.data.categories]);
      }
    }catch(err){
      console.error("Failed to fetch categories", err);
    }
  };
  fetchCategories();
},[])

  useEffect(() => {
    setCurrentPage(1);
    let queryParams = {};

    if (searchTerm) queryParams.search = searchTerm;
    if (activeTab !== 0) queryParams.category = activeTab;
    if (sortType === "price_asc") queryParams.sort = "price";
    else if (sortType === "price_desc") queryParams.sort = "-price";

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiUrl}/courses?${queryString}`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.status === "success") {
          setCourses(res.data.data.courses);
        } else {
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setCourses([]);
      });

  }, [searchTerm, activeTab, sortType]);

  const totalResultsCount = courses.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalResultsCount / itemsPerPage);
  return (
    <div className="w-full flex-col gap-10 items-center overflow-hidden">
      <Header />
      
      <Section1
        categories={categories}
        searchTerm={searchTerm}
        activeTab={activeTab}
        sortType={sortType}
        setSearchTerm={setSearchTerm}
        setActiveTab={setActiveTab}
        setSortType={setSortType}
      />

      <div className="container w-full md:w-80/100 flex flex-col gap-5 mx-auto px-4 justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Courses ({totalResultsCount} Results)
        </h1>

        {currentCourses.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCourses.map((course, index) => (
              <CourseCard key={course.id || index} el={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 text-lg">
            No courses found matching your criteria.
          </div>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
