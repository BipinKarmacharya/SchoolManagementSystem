import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';

const StudentPortal = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API or database
    const fetchData = async () => {
      // Replace this with an actual API call
      const response = await fetch('http://127.0.0.1:8000/api/students/');
      const data = await response.json();
      setStudents(data);
    };
    
    fetchData();
  }, []);

  const headers = ['S.N', 'Student ID', 'Student\'s Name', 'Phone', 'Username', 'Password', 'Actions'];

  const extractStudentData = students.map(student => ({
    student_id: student.student_id,
    name: student.first_name + ' ' + student.middle_name+ ' ' + student.last_name,
    phone: student.phone,
    email: student.email,
    password: student.first_name, 
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
