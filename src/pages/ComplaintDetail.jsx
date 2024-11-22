import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Sidebar Component
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

// Main Complaint Detail Component
export default function ComplaintDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { id: 1, src: "/placeholder1.jpg" },
    { id: 2, src: "/placeholder2.jpg" },
    { id: 3, src: "/placeholder3.jpg" },
  ];

  // Handle navigation back to complaint page
  const handleGoBack = () => {
    navigate("/complaint");
  };

  // Handle image slider navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <Sidebar className="hidden md:block w-64 fixed h-full" />

      {/* Mobile Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center flex-1">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-2 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Search Input */}
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

                {/* Mobile Search Toggle */}
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

              {/* Header Right Section */}
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="mr-2" />
              <span>Kembali</span>
            </button>
          </div>

          {/* Complaint Details Card */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Complaint Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-10 md:h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <h2 className="text-xl font-semibold">Adam Kurniawan</h2>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                PROGRESS
              </span>
            </div>

            {/* Complaint Description */}
            <p className="text-gray-600 mb-6">
              Terjadi kebakaran pada pukul 20.00 di cinere jawa barat
            </p>

            {/* Responsive Image Display */}
            <div className="mb-8">
              {/* Mobile Slider */}
              <div className="md:hidden relative">
                <div className="aspect-square rounded-lg bg-gray-300 overflow-hidden relative">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                  ))}
                </div>

                {/* Mobile Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                >
                  <ChevronRight />
                </button>

                {/* Image Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop/Tablet Grid Display */}
              <div className="hidden md:grid grid-cols-3 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-lg bg-gray-300 overflow-hidden"
                  >
                    {/* Placeholder for image - replace with actual image when available */}
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Section */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Tanggapan</h3>
              <div className="space-y-4">
                <textarea
                  placeholder="Isi Tanggapan Disini"
                  className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                />
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
