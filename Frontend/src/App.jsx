import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Register from "./Pages/Authentication/RegisterSchool";
import Login from "./Pages/Authentication/Login";
import Website from "./Pages/Website/Website";

// User Profile
import UserProfile from "./Pages/UserAccount/UserProfile";
import StudentDashboard from "./Student Dashboard/StudentDashboard"

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
        <Route path="/profile-setting" element={<UserProfile />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
