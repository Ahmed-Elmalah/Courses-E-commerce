
import { CiSearch } from "react-icons/ci";


export default function SearchBar({ searchTerm, setSearchTerm }) {

  return (
    <div className="relative h-full flex flex-col items-center z-50 text-2xl">
      <CiSearch className="absolute left-[15px] top-[8px] z-50 text-2xl" />

      <input
        className="input input-primary bg-white rounded-3xl w-full ps-12 p-0"
        type="search"
        placeholder="Search courses by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
