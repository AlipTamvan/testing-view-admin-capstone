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
  Plus,
  Calendar,
  FileImage,
  Pencil,
  AlignLeft,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const BottomNavigation = () => {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: PieChart, label: "Dashboard", path: "/" },
    { icon: MessageSquare, label: "Complaint", path: "/complaint" },
    { icon: Users, label: "Services", path: "/public-services" },
    { icon: Settings, label: "Category", path: "/category" },
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

const PublicNews = () => {
  const [newsData, setNewsData] = useState([
    {
      image: "/placeholder-image.jpg",
      title: "Edukasi Lingkungan Sejak Dini",
      date: "2024-08-27",
      content:
        "Universitas Indonesia melaksanakan program edukasi kepada siswa sekolah dasar untuk meningkatkan kesadaran mencintai lingkungan.",
    },
    {
      image: "/placeholder-image.jpg",
      title: "Trafo PLN untuk Warga Bogor",
      date: "2024-01-30",
      content:
        "Berkat aspirasi warga saat reses, masyarakat Cikaret, Bogor, kini memiliki trafo PLN yang memberikan peningkatan akses listrik lebih merata.",
    },
    {
      image: "/placeholder-image.jpg",
      title: "Peningkatan Ketangguhan Bencana",
      date: "2024-02-09",
      content:
        "Pemerintah menggalakkan program pelatihan kesiapsiagaan penting megathrust, fokus pada kesiapan dan kesejahteraan.",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNewsIndex, setSelectedNewsIndex] = useState(null);

  const NewsSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Judul terlalu pendek!")
      .max(100, "Judul terlalu panjang!")
      .required("Judul wajib diisi"),
    date: Yup.date()
      .required("Tanggal wajib diisi")
      .max(new Date(), "Tanggal tidak boleh di masa depan"),
    content: Yup.string()
      .min(20, "Konten terlalu pendek!")
      .max(500, "Konten terlalu panjang!")
      .required("Konten wajib diisi"),
    image: Yup.mixed()
      .test("fileSize", "Ukuran file terlalu besar", (value) => {
        return !value || value.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Format file tidak valid", (value) => {
        return (
          !value ||
          ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleCloseModal = (resetForm, isUpdate = false) => {
    resetForm();
    setSelectedImage(null);
    if (isUpdate) {
      setIsUpdateModalOpen(false);
    } else {
      setIsAddModalOpen(false);
    }
  };

  const handleAddNews = (values, { resetForm }) => {
    const newNewsItem = {
      image: selectedImage || "/placeholder-image.jpg",
      title: values.title,
      date: values.date,
      content: values.content,
    };

    setNewsData((prev) => [newNewsItem, ...prev]);
    setSelectedImage(null);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleUpdateNews = (values, { resetForm }) => {
    const updatedNewsItem = {
      image: selectedImage || newsData[selectedNewsIndex].image,
      title: values.title,
      date: values.date,
      content: values.content,
    };

    const updatedNewsData = [...newsData];
    updatedNewsData[selectedNewsIndex] = updatedNewsItem;
    setNewsData(updatedNewsData);
    setSelectedImage(null);
    setIsUpdateModalOpen(false);
    resetForm();
  };

  const openUpdateModal = (news, index) => {
    setSelectedNewsIndex(index);
    setSelectedImage(news.image);
    setIsUpdateModalOpen(true);
  };

  const renderModal = (isUpdate = false) => {
    const initialValues = isUpdate
      ? newsData[selectedNewsIndex]
      : { title: "", date: "", content: "", image: null };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {isUpdate ? "Perbarui Berita" : "Tambah Berita Baru"}
            </h2>
            <button
              onClick={() => handleCloseModal(() => {}, isUpdate)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={NewsSchema}
            onSubmit={isUpdate ? handleUpdateNews : handleAddNews}
          >
            {({ setFieldValue, errors, touched, resetForm }) => (
              <Form className="p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gambar Berita
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="relative cursor-pointer">
                      <div className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                        <FileImage size={20} />
                        <span>
                          {selectedImage ? "Ganti Gambar" : "Pilih Gambar"}
                        </span>
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                        className="sr-only"
                      />
                    </label>
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Input Fields with Improved Design */}
                {[
                  {
                    name: "title",
                    label: "Judul",
                    type: "text",
                    placeholder: "Masukkan judul berita",
                    icon: <Pencil size={20} className="text-gray-400" />,
                  },
                  {
                    name: "date",
                    label: "Tanggal",
                    type: "date",
                    icon: <Calendar size={20} className="text-gray-400" />,
                  },
                  {
                    name: "content",
                    label: "Konten",
                    type: "textarea",
                    placeholder: "Masukkan konten berita",
                    icon: <AlignLeft size={20} className="text-gray-400" />,
                  },
                ].map(({ name, label, type, placeholder, icon }) => (
                  <div key={name} className="relative">
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                      </div>
                      <Field
                        type={type}
                        name={name}
                        id={name}
                        as={type === "textarea" ? "textarea" : "input"}
                        rows={type === "textarea" ? 3 : undefined}
                        placeholder={placeholder}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none 
                          ${
                            touched[name] && errors[name]
                              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                      />
                    </div>
                    <ErrorMessage
                      name={name}
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleCloseModal(resetForm, isUpdate)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    {isUpdate ? "Perbarui Berita" : "Tambah Berita"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="hidden md:block text-xl font-bold text-gray-800 mb-4 sm:mb-0">
          Berita Terkini
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus size={20} className="mr-2" />
          Tambah Berita Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <div
            key={index}
            onClick={() => openUpdateModal(news, index)}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 cursor-pointer"
          >
            <div
              className="h-48 bg-gray-300 bg-cover bg-center"
              style={{
                backgroundImage: `url(${news.image})`,
              }}
            ></div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {news.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3">
                {new Date(news.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add News Modal */}
      {isAddModalOpen && renderModal()}

      {/* Update News Modal */}
      {isUpdateModalOpen && renderModal(true)}
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

export default function PublicServices() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 pb-16 md:pb-16 lg:pb-0">
      {/* Persistent Sidebar for Large Screens */}
      <Sidebar className="hidden lg:block w-64 fixed h-full" />

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
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
            <PublicNews />
            <Pagination />
          </div>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
