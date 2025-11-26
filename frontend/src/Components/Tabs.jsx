import { Link } from "react-router-dom";
export default function Tabs({ categories, activeTab, setActiveTab }) {
  return (
    <div className="flex items-center h-full gap-4">
      {categories.map((el, index) => (
        <Link
          key={index}
          onClick={() => setActiveTab(el)}
          to="#"
          className={`
                        px-7 py-1 text-sm font-medium rounded-full transition duration-200 
                        ${
            activeTab === el
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
          }
                    `}
        >
                    {el}       {" "}
        </Link>
      ))}
    </div>
  );
}
