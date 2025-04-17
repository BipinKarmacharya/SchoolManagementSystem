import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/assets/CSS/Pages/Classes.css";
import { TbEdit, TbTrashX } from "react-icons/tb";
import { FaUserGraduate, FaBook } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import EditClass from "./EditClass"; // Import Edit Component
import axios from "axios"; // Import axios for API calls

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]); // Store teachers list
  const [selectedClass, setSelectedClass] = useState(null); // Store class to edit
  const [isEditing, setIsEditing] = useState(false); // Modal visibility

  // Fetch classes and teachers
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/class/");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        console.log("Fetched classes:", data); // Log classes data to check structure
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employee/");
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        console.log("Fetched teachers:", data); // Log teachers data to check structure
        setTeachers(data); // Store the fetched teachers list
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchClasses();
    fetchTeachers();
  }, []);

  const handleEditClick = (cls) => {
    setSelectedClass(cls); // Set the selected class
    setIsEditing(true); // Show edit modal
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedClass(null);
  };

  const getTeacherName = (classTeacherName) => {
    return classTeacherName || "Not Assigned"; // If there's no teacher name, show "Not Assigned"
  };

  // Function to delete a class
  const deleteClass = async (classId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/class/${classId}/`);
      console.log("Class deleted successfully:", response);
      // Update your classes state to remove the deleted class
      setClasses(classes.filter((cls) => cls.id !== classId)); // Remove the class from the UI
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };  

  return (
    <div className="allClasses">
      {classes.map((cls) => (
        <div className="class" key={cls.id}>
          <div className="classTitle">
            <h3>Class {cls.name}</h3>
            <div className="classIcons">
              <TbEdit onClick={() => handleEditClick(cls)} /> {/* Open Edit */}
              <TbTrashX onClick={() => deleteClass(cls.id)} id="delete" />

            </div>
          </div>
          <div className="classDetails">
            <div className="totalStudents">
              <div className="text-Class-details">
                <h2>{cls.total_students || 0}</h2>
                <h4>Students</h4>
              </div>
              <FaUserGraduate className="stdIcon" />
            </div>
            <div className="totalSubjects">
              <div className="text-Class-details">
                <h2>{cls.subject_count || 0}</h2>
                <h4>Subjects</h4>
              </div>
              <FaBook className="subjectIcon" />
            </div>
            <div className="classTeacher">
              <h5>Class Teacher:</h5>
              <h5>{getTeacherName(cls.class_teacher_name)}</h5>{" "}
              {/* Display Teacher's Full Name */}
            </div>
          </div>
        </div>
      ))}

      <div className="class addNew" id="addNewClass">
        <div>
          <MdOutlineAdd />
          <Link to="/admin-dashboard/add-classes">
            <h4>
              Add New <br />
              Class
            </h4>
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedClass && (
        <EditClass classData={selectedClass} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllClasses;
