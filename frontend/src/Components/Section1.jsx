import SearchBar from "./SearchBar";
import SortMenu from "./SortMenu";
import Tabs from "./Tabs";
export default function Section1({
  categories,
  searchTerm,
  activeTab,
  sortType,
  setSearchTerm,
  setActiveTab,
  setSortType,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="container w-full md:w-90/100 lg:w-80/100 mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-2/3 lg:w-3/8 ">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="lg:w-1/4  w-90/100">
            <SortMenu sortType={sortType} setSortType={setSortType} />
          </div>
        </div>
        <div className="flex justify-center overflow-x-auto">
          <Tabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}