import React, { useState, useRef, useEffect } from "react";
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
  Hospital,
  TrafficCone,
  TreePine,
  School,
  ShieldAlert,
  AlertCircle,
  Construction,
  Edit,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ className, onClose }) => {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }

    if (path === "/users") {
      return location.pathname.startsWith("/user");
    }
    if (path === "/public-services" && location.pathname.startsWith("/news")) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 text-white p-4 md:p-6 space-y-6 h-full flex flex-col ${className} transition-colors duration-300`}
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
          { icon: Users, label: "Users", path: "/users" },
        ].map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center space-x-2 py-2 px-2 rounded-lg transition-colors duration-300 ${
              isActivePath(path)
                ? "bg-white text-indigo-700"
                : "text-white hover:bg-indigo-500/95 hover:text-white"
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
          className="flex items-center space-x-2 text-white hover:bg-indigo-500/70 hover:text-white py-2 px-2 rounded-lg transition-colors duration-300"
        >
          <LogOut size={20} />
          <span className="text-sm md:text-base">Log-Out</span>
        </a>
      </div>
    </div>
  );
};

const BottomNavigation = () => {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    if (path === "/users") {
      return location.pathname.startsWith("/user");
    }
    if (path === "/public-services" && location.pathname.startsWith("/news")) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: PieChart, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "Complaint", path: "/complaint" },
    { icon: Users, label: "Services", path: "/public-services" },
    { icon: User, label: "Users", path: "/users" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:block lg:hidden">
      <div className="flex justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              isActivePath(path)
                ? "text-indigo-700"
                : "text-gray-500 hover:text-indigo-700"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Mock data dengan nama pengirim
  const recentComplaints = [
    {
      id: 1,
      sender: "John Doe",
      title: "Jalanan Bolong",
      status: "Belum Ditangani",
    },
    {
      id: 2,
      sender: "Jane Smith",
      title: "Macet Di Tol Cikupa",
      status: "Belum Ditangani",
    },
    {
      id: 3,
      sender: "Alex Johnson",
      title: "Keluhan Produk",
      status: "Belum Ditangani",
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/edit-profile");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Search Section */}
          <div className="flex items-center flex-1">
            <div className={`flex items-center w-full max-w-md relative`}>
              <Search className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Cari Disini"
                className="w-full pl-10 pr-4 py-2 mr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Notification and Profile Section */}
          <div className="flex items-center space-x-4 ">
            {/* Notification Dropdown */}
            <div className="relative mt-2" ref={notificationRef}>
              <button
                className="relative"
                onClick={() =>
                  setShowNotificationDropdown(!showNotificationDropdown)
                }
              >
                <Bell className="h-6 w-6 text-gray-400" />
                {recentComplaints.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 transform translate-x-1/2 -translate-y-1/2"></span>
                )}
              </button>

              {showNotificationDropdown && (
                <div
                  className="fixed md:absolute top-16 md:top-auto right-4 md:right-0 md:mt-4 
          w-[calc(100%-2rem)] md:w-96 
          bg-white border-none rounded-lg shadow-2xl 
          z-50
          md:before:content-[''] md:before:absolute md:before:border-l-8 md:before:border-r-8 md:before:border-b-8 
          md:before:border-l-transparent md:before:border-r-transparent md:before:border-b-white 
          md:before:-top-2 md:before:right-2 md:before:rotate-180 mt-1"
                >
                  <div className="p-4 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold">
                        Komplain Terbaru
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {recentComplaints.map((complaint) => (
                        <div
                          key={complaint.id}
                          className="py-3 border-b last:border-b-0 flex items-center hover:bg-gray-50 cursor-pointer rounded-lg transition-colors duration-200"
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                            {complaint.senderAvatar ? (
                              <img
                                src={complaint.senderAvatar}
                                alt={complaint.sender}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 text-lg">
                                {complaint.sender.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="ml-3 flex-grow">
                            <p className="text-sm font-medium text-gray-800">
                              {complaint.sender} Baru Saja Complaint
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-48">
                              {complaint.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {recentComplaints.length > 0 && (
                      <div className="mt-3 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                          Lihat Semua Komplain
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section */}
            <div className="relative" ref={profileRef}>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Halo ! Adam</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-300 ${
                    showProfileDropdown ? "rotate-90" : ""
                  }`}
                />
              </div>

              {showProfileDropdown && (
                <div
                  className="fixed md:absolute top-16 md:top-auto right-4 md:right-0 md:mt-4 
                w-[calc(50%-2rem)] md:w-48 
                bg-white border-none rounded-lg shadow-2xl 
                z-50
                md:before:content-[''] md:before:absolute md:before:border-l-8 md:before:border-r-8 md:before:border-b-8 
                md:before:border-l-transparent md:before:border-r-transparent md:before:border-b-white 
                md:before:-top-2 md:before:right-2 md:before:rotate-180 mt-1"
                >
                  <div className="py-1 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Edit className="h-5 w-5 text-gray-500" />
                      <span>Edit Profil</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2">
                      <LogOut className="h-5 w-5 text-red-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
const MetricCard = ({ title, value }) => (
  <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h3 className="text-xs md:text-sm lg:text-base font-medium text-gray-500">
      {title}
    </h3>
    <p className="text-lg md:text-xl lg:text-2xl font-bold mt-1">{value}</p>
  </div>
);

// RecentComplaints Component
const RecentComplaints = () => (
  <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">
      Recent Complaint
    </h2>
    <div className="space-y-3 md:space-y-4">
      {[
        {
          name: "Francisco Gibbs",
          complaint: "Kebakaran hutan",
          time: "Just now",
        },
        {
          name: "Adam Kurniawan",
          complaint: "Banjir",
          time: "Friday 12:26PM",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 md:space-x-4 p-2 hover:bg-gray-50 rounded-lg"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm lg:text-base font-medium truncate">
              {item.name}
            </p>
            <p className="text-xs md:text-sm text-gray-500 truncate">
              Created Complaint {item.complaint}
            </p>
            <p className="text-[10px] md:text-xs text-gray-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// RecentUsers Component
const RecentUsers = () => (
  <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">
      Recent User
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="text-left text-[10px] md:text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
            <th className="pb-2 px-2">No Complaint</th>
            <th className="pb-2 px-2">Date Created</th>
            <th className="pb-2 px-2">Client</th>
            <th className="pb-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((_, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="py-2 px-2 text-xs md:text-sm">ZR-22222</td>
              <td className="py-2 px-2 text-xs md:text-sm">3 Jul, 2020</td>
              <td className="py-2 px-2 text-xs md:text-sm">Adam kurniawan</td>
              <td className="py-2 px-2">
                <span className="px-2 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  PAID
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
const Chart = () => (
  <div className="h-[200px] md:h-[300px] mt-4">
    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
      Chart Placeholder
    </div>
  </div>
);

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 pb-16 md:pb-16 lg:pb-0">
      {/* Persistent Sidebar for Large Screens */}
      <Sidebar className="hidden lg:block w-64 fixed h-full" />

      <div className="flex-1 flex flex-col lg:ml-64">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4 lg:px-8 space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <MetricCard title="Complaint Masuk" value={20} />
              <MetricCard title="Feedback Selesai" value={20} />
              <MetricCard title="Category Complaint" value={20} />
              <MetricCard title="Import CSV" value={20} />
            </div>

            <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">
                Complaint Grafik
              </h2>
              <Chart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RecentComplaints />
              <RecentUsers />
            </div>
          </div>
        </main>

        {/* Bottom Navigation for Mobile and Tablet */}
        <BottomNavigation />
      </div>
    </div>
  );
}
