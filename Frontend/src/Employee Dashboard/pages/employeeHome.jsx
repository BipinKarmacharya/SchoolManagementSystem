import React, { useEffect, useState } from "react";
import "/src/assets/CSS/Pages/Dashboard.css";
// import { SlArrowDown } from "react-icons/sl";
import MyCalendar from "../Components/EmCalendar";  
import { FaPen } from "react-icons/fa";
import '../assets/CSS/Pages/EmDashboard.css';
// import '/src/assets/CSS/Components/MyCalendar.css';
import '../assets/CSS/Components/EmProfile.css';
import { employees } from '/src/assets/JSON/EmployeesData.js';  

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Fetch employee data on component mount
  useEffect(() => {
    const data = employees.find(employee => employee.id === 1);
    setEmployeeData(data);
  }, []);

  // Loading state if employee data is not yet fetched
  if (!employeeData) {
    return <div>Loading...</div>;
  }

  // Handle image selection and preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Emdashboard">
      <h3>Welcome Back😊, {employeeData.first_name}</h3>

      <div className="Emcon">
        <div className="Emdetails">
          <span>Details</span>
        </div>
        
        {/* Hidden file input for profile image change */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImage}
          style={{ display: "none" }}
        />
        <label htmlFor="fileInput" className="custom-file-buttonEm">
          <FaPen />
        </label>

        {/* Profile image preview */}
        <div className="Emprofileimg">
          {imageSrc && <img src={imageSrc} alt="Profile Preview" className="Emimage-preview" />}
        </div>

        {/* Employee name and details */}
        <span className="Emname">
          {employeeData.first_name} {employeeData.middle_name} {employeeData.last_name}
        </span>
        <span className="employee_id">{employeeData.employee_id}</span>
        <span className="address">{employeeData.address}</span>

        {/* Employee post */}
        <div className="Post">
          <span>Post: <span>{employeeData.Post}</span></span>
        </div>

        
       
      </div>
      <div className="calendar">
          <MyCalendar />
        </div>

      {/* Dashboard grid items */}
      <div className="EmtodayCount" id="todayCount">
        <h5>
          Course Completion: <span className="EmshowPercent">0%</span>
        </h5>
        <div className="EmpresentBox"></div>
        <h5>
          Today Present Employee: <span className="EmshowPercent">100%</span>
        </h5>
        <div className="EmpresentBox"></div>
      </div>

      


      </div>

  
  )
};

export default Dashboard;
