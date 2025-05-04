import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/src/assets/CSS/Pages/Dashboard.css";
import { PiStudentFill } from "react-icons/pi";
import { FaUserShield } from "react-icons/fa6";
import { TfiRulerPencil } from "react-icons/tfi";
import MyCalendar from "../Components/MyCalender";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const studentAttendanceData = [
  { date: "Mon", attendance: 80 },
  { date: "Tue", attendance: 85 },
  { date: "Wed", attendance: 90 },
  { date: "Thu", attendance: 75 },
  { date: "Fri", attendance: 95 },
];

const classDistributionData = [
  { name: "Class 1", value: 30 },
  { name: "Class 2", value: 25 },
  { name: "Class 3", value: 20 },
  { name: "Class 4", value: 15 },
  { name: "Class 5", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const Dashboard = () => {
  const [schoolData, setSchoolData] = useState({
    totalStudents: 100,
    totalEmployees: 50,
    totalClasses: 10,
    presentStudents: 80,
    presentEmployees: 45,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("access_token");
    console.log("Token in localStorage:", token); // Debugging token value
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // Fetch school data from the backend
    const fetchSchoolData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/school/<int:pk>", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
        console.error("Error fetching school data:", error.response || error);
        if (error.response && error.response.status === 401) {
          console.warn("Token is invalid or expired. Redirecting to login.");
          navigate("/login");
        }
      }
    };

    fetchSchoolData();
  }, [navigate]);

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
            Today Present Students:{" "}
            <span className="showPercent">{schoolData.presentStudents}%</span>
          </h5>
          <h5>
            Today Present Employees:{" "}
            <span className="showPercent">{schoolData.presentEmployees}%</span>
          </h5>
        </div>
        <div className="gridItem" id="panel">
          <div className="panelText">
            <span>Welcome to the admin panel</span>
            <p>This is where you can manage all.</p>
          </div>
          <img src="/Images/panel.png" alt="#" />
        </div>
        <div className="calender">
          <MyCalendar />
        </div>

        <div className="gridItem barGraph">
          <div className="bar">
            <h3>Student Attendance Trends</h3>
            <LineChart width={350} height={200} data={studentAttendanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div className="pie">
            <h3>Class Enrollment Distribution</h3>
            <PieChart width={300} height={200}>
              <Pie
                data={classDistributionData}
                cx={150}
                cy={100}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {classDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;