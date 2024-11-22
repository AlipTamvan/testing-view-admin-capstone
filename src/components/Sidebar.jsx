import {
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export const Sidebar = ({ className, onClose }) => {
  const location = useLocation();

  // Menu items
  const menuItems = [
    { icon: PieChart, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "Complaint", path: "/complaint" },
    { icon: Users, label: "Public Services", path: "/public-services" },
    { icon: Settings, label: "Category", path: "/category" },
    { icon: Users, label: "User", path: "/user" },
    { icon: Settings, label: "Setting", path: "/setting" },
  ];

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
        {menuItems.map(({ icon: Icon, label, path }) => (
          <a
            key={label}
            href={path}
            className={`flex items-center space-x-2 py-2 px-2 rounded-lg transition-colors ${
              location.pathname === path
                ? "bg-white text-indigo-700" // Active styles
                : "text-white hover:text-indigo-200 hover:bg-indigo-600" // Default styles
            }`}
          >
            <Icon size={20} />
            <span className="text-sm md:text-base">{label}</span>
          </a>
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
