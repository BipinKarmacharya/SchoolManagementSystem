import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Register from "./Pages/Authentication/RegisterSchool";
import Login from "./Pages/Authentication/Login";
import Website from "./Pages/Website/Website";

// Student Dashboard
import StudentDashboard from "./Student Dashboard/StudentDashboard"

// Employee Dashboard
import EmployeeDashboard from "./Employee Dashboard/EmployeeDashboard"

// Import the new AdminRoutes
import AdminRoutes from "./Components/AdminRoutes"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-school" element={<Register />} />
        <Route path="/*" element={<AdminRoutes />} /> {/* ✅ Admin Routes Handled Separately */}

        {/* User Profile */}
        {/* <Route path="/profile-setting" element={<UserProfile />} /> */}

        <Route path="/student-dashboard" element={<StudentDashboard />} />

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
