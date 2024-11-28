import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Users,
  User,
  X,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({ className, onClose }) => {
  const location = useLocation();
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`bg-indigo-700 text-white p-4 md:p-6 space-y-6 h-full flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Laporin</h1>
        {onClose && (
          <button onClick={onClose} className="md:hidden">
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="space-y-4 flex-grow">
        {[
          { icon: PieChart, label: "Dashboard", path: "/" },
          { icon: MessageSquare, label: "Complaint", path: "/complaint" },
          { icon: Users, label: "Public Services", path: "/public-services" },
          { icon: Settings, label: "Category", path: "/category" },
          { icon: User, label: "User", path: "/user" },
          { icon: Settings, label: "Setting", path: "/setting" },
        ].map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center space-x-2 py-2 px-2 rounded-lg transition-colors ${
              isActivePath(path)
                ? "bg-white text-indigo-700"
                : "text-white hover:text-indigo-200 hover:bg-indigo-600"
            }`}
          >
            <Icon size={20} />
            <span className="text-sm md:text-base">{label}</span>
          </Link>
        ))}
      </nav>
      <div>
        <a
          href="#"
          className="flex items-center space-x-2 text-white hover:text-indigo-200 py-2 px-2 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm md:text-base">Log-Out</span>
        </a>
      </div>
    </div>
  );
};

const ComplaintList = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const complaintCategories = [
    { value: "ALL", label: "Semua Kategori" },
    { value: "KEBAKARAN", label: "Kebakaran" },
    { value: "KEMACETAN", label: "Kemacetan" },
    { value: "KECELAKAAN", label: "Kecelakaan" },
    { value: "POHON_TUMBANG", label: "Pohon Tumbang" },
    { value: "PEMBEGALAN", label: "Pembegalan" },
    { value: "BANJIR", label: "Banjir" },
    { value: "PENCURIAN", label: "Pencurian" },
    { value: "KESEHATAN", label: "Masalah Kesehatan" },
  ];

  const complaintStatuses = [
    { value: "ALL", label: "Semua Status" },
    { value: "PROGRESS", label: "Dalam Proses" },
    { value: "SELESAI", label: "Selesai" },
    { value: "CANCEL", label: "Dibatalkan" },
  ];

  const complaintsData = [
    {
      name: "Adam Kurniawan",
      complaint: "Terjadi kebakaran pada pukul 20.00 di cinere jawa barat",
      status: "PROGRESS",
      category: "KEBAKARAN",
    },
    {
      name: "Ariska Sari",
      complaint: "Terjadi macet pada pukul 20.00 di cinere jawa barat",
      status: "SELESAI",
      category: "KEMACETAN",
    },
    {
      name: "taehyoung",
      complaint: "Terjadi kecelakaan pada pukul 20.00 di cinere jawa barat",
      status: "PROGRESS",
      category: "KECELAKAAN",
    },
    {
      name: "Aliva",
      complaint: "Terjadi pohon tumbang pada pukul 20.00 di cinere jawa barat",
      status: "CANCEL",
      category: "POHON_TUMBANG",
    },
    {
      name: "Restanti",
      complaint: "Terjadi pembegalan pada pukul 20.00 di cinere jawa barat",
      status: "SELESAI",
      category: "PEMBEGALAN",
    },
    {
      name: "Budi Setiawan",
      complaint: "Terjadi banjir di perumahan",
      status: "PROGRESS",
      category: "BANJIR",
    },
  ];

  const filteredComplaints = complaintsData.filter((item) => {
    const categoryFilter =
      selectedCategory === "ALL" || item.category === selectedCategory;
    const statusFilter =
      selectedStatus === "ALL" || item.status === selectedStatus;
    return categoryFilter && statusFilter;
  });

  return (
    <div className="space-y-4 md:px-4">
      <div className="flex mb-4 gap-4">
        {/* Filter Kategori */}
        <div className="relative w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-gray-700"
          >
            {complaintCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            size={20}
          />
        </div>

        {/* Filter Status */}
        <div className="relative w-full md:w-64">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-gray-700"
          >
            {complaintStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Kondisi jika tidak ada komplain yang sesuai */}
      {filteredComplaints.length === 0 ? (
        <div className="p-4 text-center text-gray-600">
          <p>
            Tidak ada komplain dengan kategori atau status yang dipilih. Cobalah
            memilih kategori atau status lainnya.
          </p>
        </div>
      ) : (
        filteredComplaints.map((item, index) => (
          <Link
            key={index}
            className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md"
            to="/complaint-detail"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gray-300 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 max-w-xl">
                  {item.complaint}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "PROGRESS"
                    ? "bg-yellow-100 text-yellow-800"
                    : item.status === "SELESAI"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

const Pagination = () => (
  <div className="flex items-center justify-center gap-2 mt-6">
    <button className="hidden md:inline px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
      « Previous
    </button>
    <button className="md:hidden px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
      «
    </button>

    {[1, 2, 3].map((page) => (
      <button
        key={page}
        className={`px-3 py-1 rounded ${
          page === 1
            ? "bg-[#4338CA] text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {page}
      </button>
    ))}
    <span className="px-2">...</span>
    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
      10
    </button>
    <button className="md:hidden px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
      »
    </button>
    <button className="hidden md:inline px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
      Next »
    </button>
  </div>
);

export default function Complaint() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar className="hidden md:block w-64 fixed h-full" />

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 flex">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col md:ml-64">
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

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
            <ComplaintList />
            <Pagination />
          </div>
        </main>
      </div>
    </div>
  );
}
