
export default function SortMenu({ sortType, setSortType }) {

  return (
    <div className=" flex items-center justify-center text-center">
      <p className="text-gray-700 w-2/5 md:w-1/3 text-sm">Sort by</p>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="select bg-gray-50 w-full text-gray-700 font-semibold border-gray-500 rounded-3xl p-2 ps-3 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="default" className="font-normal">
          Default
        </option>
        <option value="price_desc" className="font-normal">
          Price: High to Low
        </option>
        <option value="price_asc" className="font-normal">
          Price: Low to High
        </option>
      </select>
    </div>
  );
}
