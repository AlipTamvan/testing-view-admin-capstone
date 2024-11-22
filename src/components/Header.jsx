import React from "react";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";
const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div
              className={`${
                isSearchOpen ? "flex" : "hidden md:flex"
              } items-center w-full max-w-md relative`}
            >
              <Search className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Cari Disini"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="ml-2 md:hidden"
            >
              <Search
                className={`h-6 w-6 text-gray-400 ${
                  isSearchOpen ? "hidden" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-400" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 transform translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Halo ! Adam</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
