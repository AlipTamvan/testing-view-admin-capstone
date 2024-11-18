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
  X,
} from "lucide-react";

const Sidebar = ({ className, onClose }) => (
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
        { icon: PieChart, label: "Dashboard" },
        { icon: MessageSquare, label: "Complaint" },
        { icon: Users, label: "Public Services" },
        { icon: Settings, label: "Category" },
        { icon: Users, label: "User" },
        { icon: Settings, label: "Setting" },
      ].map(({ icon: Icon, label }) => (
        <a
          key={label}
          href="#"
          className="flex items-center space-x-2 text-white hover:text-indigo-200 py-2 px-2 rounded-lg hover:bg-indigo-600 transition-colors"
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

const MetricCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-xl md:text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Chart = () => (
  <div className="h-[200px] md:h-[300px] mt-4">
    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
      Chart Placeholder
    </div>
  </div>
);

const RecentComplaints = () => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h2 className="text-lg font-semibold mb-4">Recent Complaint</h2>
    <div className="space-y-4">
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
          className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-sm text-gray-500 truncate">
              Created Complaint {item.complaint}
            </p>
            <p className="text-xs text-gray-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentUsers = () => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h2 className="text-lg font-semibold mb-4">Recent User</h2>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="pb-2 px-2">No Complaint</th>
            <th className="pb-2 px-2">Date Created</th>
            <th className="pb-2 px-2">Client</th>
            <th className="pb-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((_, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="py-2 px-2">ZR-22222</td>
              <td className="py-2 px-2">3 Jul, 2020</td>
              <td className="py-2 px-2">Adam kurniawan</td>
              <td className="py-2 px-2">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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

export default function Dashboard() {
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
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Complaint Masuk" value={20} />
              <MetricCard title="Feedback Selesai" value={20} />
              <MetricCard title="Category Complaint" value={20} />
              <MetricCard title="Import CSV" value={20} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-4">Complaint Grafik</h2>
              <Chart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentComplaints />
              <RecentUsers />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
