import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const menuItems = [
  { icon: PieChart, label: "Dashboard", path: "/" },
  { icon: MessageSquare, label: "Complaint", path: "/complaint" },
  { icon: Users, label: "Public Services", path: "/public-services" },
  { icon: Settings, label: "Category", path: "/category" },
  { icon: User, label: "User", path: "/user" },
  { icon: Settings, label: "Setting", path: "/setting" },
];

const ElegantSidebar = ({ className, onClose }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`bg-gradient-to-br from-indigo-800 to-indigo-900 text-white p-6 space-y-8 h-full flex flex-col transition-all duration-300 ease-in-out ${className}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Laporin</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-indigo-200 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="space-y-1 flex-grow">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
              isActivePath(path)
                ? "bg-white text-indigo-900 shadow-lg transform scale-105"
                : "text-indigo-100 hover:bg-indigo-700/50"
            }`}
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Icon
              size={20}
              className={`transition-all duration-200 ${
                hoveredItem === label ? "transform rotate-6" : ""
              }`}
            />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="pt-6 border-t border-indigo-700">
        <a
          href="#"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-all duration-200 ease-in-out"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log-Out</span>
        </a>
      </div>
    </div>
  );
};

export default ElegantSidebar;
