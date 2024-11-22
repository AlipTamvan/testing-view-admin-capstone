import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </Router>
  );
};

export default App;
