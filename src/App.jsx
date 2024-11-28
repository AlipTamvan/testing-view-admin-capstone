import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import ComplaintDetail from "./pages/ComplaintDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaint-detail" element={<ComplaintDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
