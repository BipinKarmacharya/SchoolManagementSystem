// import React from "react";
// import "/src/assets/CSS/Pages/Dashboard.css";

// import { PiStudentFill } from "react-icons/pi";
// import { FaUserShield } from "react-icons/fa6";
// import { TfiRulerPencil } from "react-icons/tfi";

// import MyCalendar from "../Components/MyCalender";

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       <div className="gridContainer">
//         <div className="gridItem totalStudent" id="totalStudent">
//           <h4>Total Students</h4>
//           <div className="totalCount">
//             <PiStudentFill className="gridIcon" />
//             <h2>100</h2>
//           </div>
//         </div>
//         <div className="gridItem totalEmployees" id="totalEmployees">
//           <h4>Total Employees</h4>
//           <div className="totalCount">
//             <FaUserShield className="gridIcon" />
//             <h2>21</h2>
//           </div>
//         </div>
//         <div className="gridItem totalClasses" id="totalCourses">
//           <h4>Total Classes</h4>
//           <div className="totalCount">
//             <TfiRulerPencil className="gridIcon" />
//             <h2>10</h2>
//           </div>
//         </div>
//         <div className="gridItem todayCount" id="todayCount">
//           <h5>
//             Today Present Students: <span className="showPercent">0%</span>
//           </h5>
//           <div className="presentBox"></div>
//           <h5>
//             Today Present Employee: <span className="showPercent">100%</span>
//           </h5>
//           <div className="presentBox"></div>
//         </div>

//         <div className="gridItem" id="panel">
//           <div className="panelText">
//             <span>welcome to admin panel</span>
//             <p>This is where you can manage all.</p>
//           </div>
//           <img src="/Images/panel.png" alt="#" />
//         </div>
//         <div className="calender">
//           <MyCalendar />
//         </div>

//         {/* <div className="checkDiv">Check Div</div> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import "/src/assets/CSS/Pages/Dashboard.css";
import { PiStudentFill } from "react-icons/pi";
import { FaUserShield } from "react-icons/fa6";
import { TfiRulerPencil } from "react-icons/tfi";
import MyCalendar from "../Components/MyCalender";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
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
  return (
    <div className="dashboard">
      <div className="gridContainer">
        <div className="gridItem totalStudent" id="totalStudent">
          <h4>Total Students</h4>
          <div className="totalCount">
            <PiStudentFill className="gridIcon" />
            <h2>100</h2>
          </div>
        </div>
        <div className="gridItem totalEmployees" id="totalEmployees">
          <h4>Total Employees</h4>
          <div className="totalCount">
            <FaUserShield className="gridIcon" />
            <h2>21</h2>
          </div>
        </div>
        <div className="gridItem totalClasses" id="totalCourses">
          <h4>Total Classes</h4>
          <div className="totalCount">
            <TfiRulerPencil className="gridIcon" />
            <h2>10</h2>
          </div>
        </div>
        <div className="gridItem todayCount" id="todayCount">
          <h5>
            Today Present Students: <span className="showPercent">0%</span>
          </h5>
          <div className="presentBox"></div>
          <h5>
            Today Present Employee: <span className="showPercent">100%</span>
          </h5>
          <div className="presentBox"></div>
        </div>
        <div className="gridItem" id="panel">
          <div className="panelText">
            <span>welcome to admin panel</span>
            <p>This is where you can manage all.</p>
          </div>
          <img src="/Images/panel.png" alt="#" />
        </div>
        <div className="calender">
          <MyCalendar />
        </div>

        {/* CheckDiv Section with Graphs */}
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
