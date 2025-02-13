// import { Link } from "react-router-dom";
// import { students } from "/src/assets/JSON/StudentsData.js";
import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';

import SearchForm from "../../Components/SearchForm";

const StudentsList = () => {
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
  
    const headers = ['S.N', 'Student ID', 'Student\'s Name', 'Class', 'Phone', 'Parent', 'Fee Remain', 'Actions'];
  
    const extractStudentData = students.map(student => ({
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      class: student.class,
      phone: student.phone,
      parent: student.parent,
      feeRemain: student.feeRemain,
    }));
  
    const renderActions = (item) => {
      return <button>Print T/C</button>;
    };
  return (
    <>
      <div className="students-list">
        <SearchForm />

        <section className="data-table">
          <h2>Student List</h2>
          {/* <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Student ID</th>
                <th>Student's Name</th>
                <th>Parent</th>
                <th>Class</th>
                <th>Fee Remaining</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.student_id}>
                  <td>{index + 1}</td>
                  <td>{student.student_id}</td>
                  <td>{student.first_name} {student.middle_name} {student.last_name}</td>
                  <td>{student.parent}</td>
                  <td>{student.class}</td>
                  <td>{student.fee_remaining}</td>
                  <td>{student.phone}</td>
                  <td><Link to="/character-certificate">Print TC</Link></td>
                </tr>
              ))}
            </tbody>
          </table> */}

          
          <DataTable data={extractStudentData} headers={headers} renderActions={renderActions} />
        </section>
      </div>
    </>
  );
};

export default StudentsList;