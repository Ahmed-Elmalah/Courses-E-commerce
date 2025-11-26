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
      <div className="container w-80/100 mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div>
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
