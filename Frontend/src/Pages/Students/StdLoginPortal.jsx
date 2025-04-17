import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';
import SearchForm from '/src/Components/SearchForm'; // Import SearchForm component
import useDebounce from '/src/assets/hooks/useDebounce'; // Import debounce hook

const StudentPortal = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [selectedClass, setSelectedClass] = useState(""); // Class filter state
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounced search

  // Fetch students data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/students/');
      const data = await response.json();
      setStudents(data);
    };
    fetchData();
  }, []);

  const headers = ['S.N', 'Student ID', "Student's Name", 'Phone', 'Username', 'Password', 'Actions'];

  // Filter students based on search (name or ID) and class filter
  const filteredStudents = students.filter(student => {
    const fullName = `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.toLowerCase();
    const studentId = student.student_id.toLowerCase();

    // Check if the student matches the search term (name or ID)
    const matchesSearch =
      fullName.includes(debouncedSearchTerm.toLowerCase()) ||
      studentId.includes(debouncedSearchTerm.toLowerCase());

    // Check if the student matches the selected class (if any)
    const matchesClass = selectedClass === "" || student.enroll_class.toString() === selectedClass;

    return matchesSearch && matchesClass;
  });

  const extractStudentData = filteredStudents.map(student => ({
    student_id: student.student_id,
    name: `${student.first_name} ${student.middle_name || ''} ${student.last_name}`,
    phone: student.phone,
    email: student.email,
    password: "pass" + student.first_name, // Example, replace with actual password logic
  }));

  const sendEmailToStudent = async (student) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/send-student-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.student_id,
          email: student.email,
          password: student.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error || 'Error sending email');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending email');
    }
  };

  const renderActions = (student) => (
    <button onClick={() => sendEmailToStudent(student)}>
      Send Email
    </button>
  );

  // Get unique class options for the dropdown (sorted)
  const classOptions = [...new Set(students.map((s) => s.enroll_class))].sort((a, b) => a - b);

  return (
    <div className="student-portal">
      <h2>Student Portal</h2>

      {/* SearchForm with search and class filter */}
      <SearchForm
        searchPlaceholder="Search Student (Name or ID)"
        options={classOptions.map((c) => ({ value: c.toString(), label: `Class ${c}` }))} // Class options
        optionLabel="View Students By Class"
        onSearchChange={(e) => setSearchTerm(e.target.value)} // Search handler
        onSelectChange={(e) => setSelectedClass(e.target.value)} // Class filter handler
      />

      {/* Data Table */}
      <DataTable data={extractStudentData} headers={headers} renderActions={renderActions} />
    </div>
  );
};

export default StudentPortal;
