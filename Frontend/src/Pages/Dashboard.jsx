import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/assets/CSS/Pages/Dashboard.css";

import { PiStudentFill } from "react-icons/pi";
import { FaUserShield } from "react-icons/fa6";
import { TfiRulerPencil } from "react-icons/tfi";

import MyCalendar from "../Components/MyCalender";

const Dashboard = () => {
  const [schoolData, setSchoolData] = useState({
    totalStudents: 0,
    totalEmployees: 0,
    totalClasses: 0,
    presentStudents: 0,
    presentEmployees: 0,
  });

  useEffect(() => {
    // Fetch school data from the backend
    const fetchSchoolData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("http://127.0.0.1:8000/api/school/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setSchoolData({
          totalStudents: data.total_students,
          totalEmployees: data.total_employees,
          totalClasses: data.total_classes,
          presentStudents: data.present_students,
          presentEmployees: data.present_employees,
        });
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchSchoolData();
  }, []);

  return (
    <div className="dashboard">
      <div className="gridContainer">
        <div className="gridItem totalStudent" id="totalStudent">
          <h4>Total Students</h4>
          <div className="totalCount">
            <PiStudentFill className="gridIcon" />
            <h2>{schoolData.totalStudents}</h2>
          </div>
        </div>
        <div className="gridItem totalEmployees" id="totalEmployees">
          <h4>Total Employees</h4>
          <div className="totalCount">
            <FaUserShield className="gridIcon" />
            <h2>{schoolData.totalEmployees}</h2>
          </div>
        </div>
        <div className="gridItem totalClasses" id="totalCourses">
          <h4>Total Classes</h4>
          <div className="totalCount">
            <TfiRulerPencil className="gridIcon" />
            <h2>{schoolData.totalClasses}</h2>
          </div>
        </div>
        <div className="gridItem todayCount" id="todayCount">
          <h5>
            Today Present Students: <span className="showPercent">{schoolData.presentStudents}%</span>
          </h5>
          <div className="presentBox"></div>
          <h5>
            Today Present Employees: <span className="showPercent">{schoolData.presentEmployees}%</span>
          </h5>
          <div className="presentBox"></div>
        </div>

        <div className="gridItem" id="panel">
          <div className="panelText">
            <span>Welcome to the admin panel</span>
            <p>This is where you can manage all.</p>
          </div>
          <div className="panelImage">
            <img src="./assets/images/background.png" alt="#" />
          </div>
        </div>
        <div className="calender">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;