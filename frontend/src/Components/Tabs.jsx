import { Link } from "react-router-dom";
export default function Tabs({ categories, activeTab, setActiveTab }) {
  return (
    <div className="md:flex items-center h-full md:gap-4 grid grid-cols-2 gap-1.5">
      {categories.map((el) => (
        <Link
          key={el.id}
          onClick={() => setActiveTab(el.id)}
          to="#"
          className={`
                         py-1 px-5 text-center text-sm font-medium rounded-full transition duration-200 
                        ${
            activeTab === el.id
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
          }
                    `}
        >
                    {el.name}       
        </Link>
      ))}
    </div>
  );
}
