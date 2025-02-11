import { Routes, Route } from "react-router-dom";
import Admin from "./Admin"; 

// Import pages
import Dashboard from "../Pages/Dashboard";
import InstituteProfile from "../Pages/General Setting/InstituteProfile";
import AllClasses from "../Pages/Class Rooms/AllClasses";
import AddClasses from "../Pages/Class Rooms/AddClasses";
import AllStudents from "../Pages/Students/AllStudents";
import AddStudents from "../Pages/Students/AddStudents";
import StudentsList from "../Pages/Students/StudentsList";
import ViewDetails from "../Pages/Students/ViewDetails";
import AllEmployee from "../Pages/Employees/AllEmployee";
import AddEmployee from "../Pages/Employees/AddEmployee";
import EmployeeAttendance from "../Pages/Attendance/EmployeeAttendance";
import StudentAttendance from "../Pages/Attendance/StudentAttendance";
import Search from "../Pages/Attendance/Search";
import Character from "../Pages/Certificates/Character";
import NewNotice from "../Pages/Notices/NewNotice";
import PreviousNotice from "../Pages/Notices/PreviousNotice";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="institute-profile" element={<InstituteProfile />} />
        <Route path="all-classes" element={<AllClasses />} />
        <Route path="add-classes" element={<AddClasses />} />
        <Route path="all-students" element={<AllStudents />} />
        <Route path="add-students" element={<AddStudents />} />
        <Route path="students-list" element={<StudentsList />} />
        <Route path="all-employee" element={<AllEmployee />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="employee-attendance" element={<EmployeeAttendance />} />
        <Route path="search" element={<Search />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="character-certificate" element={<Character />} />
        <Route path="new-notice" element={<NewNotice />} />
        <Route path="prev-notice" element={<PreviousNotice />} />
        <Route path="students/:id/view" element={<ViewDetails />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
