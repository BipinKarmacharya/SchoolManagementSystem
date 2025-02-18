import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';

// import SearchForm from "/src/Components/SearchForm";

const StudentsList = () => {
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
  
    const headers = ['S.N', 'Student ID', 'Student\'s Name', 'Class', 'Phone', 'Parent', 'Fee Remain', 'Actions'];
  
    const extractStudentData = students.map(student => ({
      student_id: student.student_id,
      first_name: student.first_name + student.middle_name + student.last_name,
      class: student.enroll_class,
      phone: student.phone,
      parent: student.parent,
      feeRemain: student.feeRemain,
    }));
  
    const renderActions = (item) => {
      return <Link to={`/character/${item.student_id}`}><button>Print T/C</button></Link>;
    };
  return (
    <>
      <div className="students-list">
        {/* <SearchForm /> */}

        <section className="data-table">
          <h2>Student List</h2>
          <DataTable data={extractStudentData} headers={headers} renderActions={renderActions} />
        </section>
      </div>
    </>
  );
};

export default StudentsList;