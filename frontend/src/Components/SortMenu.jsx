
export default function SortMenu({ sortType, setSortType }) {

  return (
    <div className="w-1/5 flex gap-1 items-center justify-center">
      <h1 className="text-gray-700">Sort by</h1>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="select bg-gray-50 w-3/4 text-gray-700 font-semibold border-none rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
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
