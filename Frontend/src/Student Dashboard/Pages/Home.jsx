import React, { useEffect, useState } from "react";
import "/src/assets/CSS/Pages/Dashboard.css";
// import {SdashImg} from "../assets/images/sdash.png";
import { SlArrowDown } from "react-icons/sl";
import MyCalendar from "../Components/MyCalender";
import { FaPen } from "react-icons/fa";
import '../assets/CSS/Pages/StudentDashboard.css';
// import '../assets/CSS/Components/MyCalendar.css';
import '../assets/CSS/Components/ProfileStd.css';

import { students } from '/src/assets/JSON/StudentsData.js';

const Dashboard = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({}); // State to hold edited data
  const [imageSrc, setImageSrc] = useState(null);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  useEffect(() => {
    const data = students.find(student => student.id === 1);
    setStudentData(data);
    setEditedData(data); // Initialize editedData with the student data
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to enable editing
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save changes
  const handleSave = () => {
    setStudentData(editedData); 
    setIsEditing(false);
  };

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="StdDashboard">
      <h3>Welcome Back😊, {studentData.first_name}</h3>
    
      <div className="stdPanelText">
        <span>Welcome to the student panel</span>
        <p>This is where you can manage all.</p>

        <div className="stdPanelImage">
          <img src="/images/sdash.png" alt="background" />
        </div>
      </div>

      <div className="stdContainer">
        <div className="stdDetails">
          <span>Details</span>
          <div className="icon" onClick={toggleDropdown}>
            <SlArrowDown className={`arrow ${isDropdownVisible ? "rotate" : ""}`} />
          </div>
          <div className={`dropdownContent ${isDropdownVisible ? "visible" : ""}`}>
            <div className="edit">
              {isEditing ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <FaPen onClick={handleEdit} />
              )}
            </div>
            <span>
              Name: 
              <input 
                type="text" 
                name="first_name" 
                value={editedData.first_name} 
                onChange={handleInputChange} 
                disabled={!isEditing}
              /> 
              <input 
                type="text" 
                name="last_name" 
                value={editedData.last_name} 
                onChange={handleInputChange} 
                disabled={!isEditing}
              />
            </span>
            <p>Id: {studentData.student_id}</p>
            <p>
              Email: 
              <input 
                type="email" 
                name="email" 
                value={editedData.email} 
                onChange={handleInputChange} 
                disabled={!isEditing}
              />
            </p>
            <p>
              Phone: 
              <input 
                type="number" 
                name="phone" 
                value={editedData.phone} 
                onChange={handleInputChange} 
                disabled={!isEditing}
              />
            </p>
            <p>
              Address: 
              <input 
                type="text" 
                name="address" 
                value={editedData.address} 
                onChange={handleInputChange} 
                disabled={!isEditing}
              />
            </p>
          </div>
        </div>
        <input
          type="file"
          accept="image"
          id="fileInput"
          onChange={handleImage}
          style={{ display: "none" }}
        />
        <label htmlFor="fileInput" className="custom-file-buttonstd">
          <FaPen />
        </label>
        <div className="stdProfileImg">
        {imageSrc && <img src={imageSrc} alt="Profile Preview" className="stdimage-preview" />}
        </div>

        <span className="stdname">{studentData.first_name} {studentData.last_name}</span>
        <div className="stdgpa">
          <span>GPA: 4.00</span>
        </div>
        <div className="stdTodayCount" id="todayCount">
          <h5>
            Attendance: <span className="stdShowPercent">0%</span>
          </h5>
          <div className="stdPresentBox"></div>
          <h5>
            Course Completion: <span className="stdShowPercent">100%</span>
          </h5>
          <div className="stdPresentBox"></div>
        </div>

        <div className="calendar">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;