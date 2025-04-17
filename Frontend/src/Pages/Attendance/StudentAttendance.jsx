import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "/src/assets/css/Pages/Attendance.css";

const StudentAttendance = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedClass = queryParams.get("enroll_class");


  const [students, setStudents] = useState([]); // State to store students
  const [attendance, setAttendance] = useState([]); // State to store attendance

  // Fetch students based on the selected class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/students/?enroll_class=${selectedClass}`
        );
        setStudents(response.data);
        setAttendance(
          response.data.map((student) => ({
            id: student.id,
            isChecked1: true, // Default "Present" checked
            isChecked2: false,
            isChecked3: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (selectedClass) {
      fetchStudents();
    }
  }, [selectedClass]);

  const handleCheck = (studentId, checkboxNumber) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.id === studentId
          ? {
              ...student,
              isChecked1: checkboxNumber === 1 ? !student.isChecked1 : false,
              isChecked2: checkboxNumber === 2 ? !student.isChecked2 : false,
              isChecked3: checkboxNumber === 3 ? !student.isChecked3 : false,
            }
          : student
      )
    );
  };

  return (
    <>
      <div className="Attendance">
        <header>
          <h2>Student Attendance - Class {selectedClass}</h2>
        </header>
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const attendanceRecord =
                  attendance.find((a) => a.id === student.id) || {};
                return (
                  <tr key={student.id}>
                    <td>{student.student_id}</td>
                    <td>
                      {student.first_name} {student.middle_name} {student.last_name}
                    </td>
                    <td className="status">
                      <input
                        type="checkbox"
                        checked={attendanceRecord.isChecked1 || false}
                        onChange={() => handleCheck(student.id, 1)}
                      />
                      <span>P</span>
                      <input
                        type="checkbox"
                        checked={attendanceRecord.isChecked2 || false}
                        onChange={() => handleCheck(student.id, 2)}
                      />
                      <span>A</span>
                      <input
                        type="checkbox"
                        checked={attendanceRecord.isChecked3 || false}
                        onChange={() => handleCheck(student.id, 3)}
                      />
                      <span>L</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={() => console.log(attendance)}
        id="submit-Student-Attendance"
      >
        Submit
      </button>
    </>
  );
};

export default StudentAttendance;