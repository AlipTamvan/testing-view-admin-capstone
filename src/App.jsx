import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import ComplaintDetail from "./pages/ComplaintDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaint-detail" element={<ComplaintDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
