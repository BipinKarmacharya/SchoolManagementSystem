import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';

const StudentPortal = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API or database
    const fetchData = async () => {
      // Replace this with an actual API call
      const response = await fetch('/JSON/StudentData.json');
      const data = await response.json();
      setStudents(data);
    };
    
    fetchData();
  }, []);

  const headers = ['S.N', 'Student ID', 'Student\'s Name', 'Phone', 'Username', 'Password', 'Actions'];

  const extractStudentData = students.map(student => ({
    student_id: student.student_id,
    first_name: student.first_name,
    last_name: student.last_name,
    phone: student.phone,
    username: student.username,
    password: student.password,
  }));

  const renderActions = (item) => {
    return <button>Send Email</button>;
  };

  return (
    <div className="student-portal">
      <h2>Student Portal</h2>
      <DataTable data={extractStudentData} headers={headers} renderActions={renderActions} />
    </div>
  );
};

export default StudentPortal;
