import React, { useState, useEffect } from "react";
import "/src/assets/CSS/Pages/Students.css";
import SearchForm from "/src/Components/SearchForm";
import Profile from "/src/Components/Profile";
import axios from "axios";
import useDebounce from "/src/assets/hooks/useDebounce"; // Import debounce hook

// Function to group students by class
const groupByClass = (students) => {
  return students.reduce((acc, student) => {
    (acc[student.enroll_class] = acc[student.enroll_class] || []).push(student);
    return acc;
  }, {});
};

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [selectedClass, setSelectedClass] = useState(""); // Class filter
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounced search

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students/");
        setStudents(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter students based on search (name & student ID) and class selection
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.middle_name ? student.middle_name + " " : ""}${student.last_name}`.toLowerCase();
    const studentId = student.student_id.toLowerCase();

    const matchesSearch =
      debouncedSearchTerm === "" ||
      fullName.includes(debouncedSearchTerm.toLowerCase()) ||
      studentId.includes(debouncedSearchTerm.toLowerCase()); // ✅ Search by student ID

    const matchesClass = selectedClass === "" || student.enroll_class.toString() === selectedClass;

    return matchesSearch && matchesClass;
  });

  // Group filtered students by class
  const studentsByClass = groupByClass(filteredStudents);

  // Get unique class options for the dropdown
  const classOptions = [...new Set(students.map((s) => s.enroll_class))].sort((a, b) => a - b);

  return (
    <div className="all-students">
      <SearchForm
        searchPlaceholder="Search Student (Name or ID)"
        options={classOptions.map((c) => ({ value: c.toString(), label: `Class ${c}` }))}
        optionLabel="View Students By Class"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSelectChange={(e) => setSelectedClass(e.target.value)}
      />
      <div className="all-students-container">
        {Object.keys(studentsByClass).sort((a, b) => a - b).map((enroll_class) => (
          <div key={enroll_class} className="class-section">
            <div className="classInfo">
              <h2>Class {enroll_class}</h2>
            </div>
            <div className="allStudentsData">
              {studentsByClass[enroll_class].map((student) => (
                <Profile key={student.id} student={student} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
