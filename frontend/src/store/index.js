import { create } from "zustand";

const initialState = {
  searchTerm: "",
  activeTab: "All",
  sortType: "default",
  currentPage: 1,
  itemsPerPage: 6,
};

const useCourseStore = create((set) => ({
  ...initialState,
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),

  setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }),

  setSortType: (type) => set({ sortType: type }),

  setCurrentPage: (page) => set({ currentPage: page }),

  resetFilters: () => set(initialState),
}));

export default useCourseStore;
