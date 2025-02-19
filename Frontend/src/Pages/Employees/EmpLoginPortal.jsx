import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePortal = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetching data from an API or database
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/employees');
      const data = await response.json();
      setEmployees(data);
    };

    fetchData();
  }, []);

  const headers = ['S.N', 'Employee ID', 'Employee\'s Name', 'Phone', 'Username', 'Password', 'Actions'];

  const extractEmployeeData = employees.map((employee, index) => ({
    
    employee_id: employee.employee_id,
    emp_name: employee.first_name + ' ' + employee.middle_name + ' ' + employee.last_name,
    phone: employee.phone,
    username: employee.email,
    password: "pass" + employee.first_name, // Example: you may replace this with a proper password field
  }));

  const sendEmail = async (email, employee_id, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/send-employee-email/', {
        employee_id: employee_id,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        toast.success('Email sent successfully!');
      }
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
      console.error('Error sending email:', error);
    }
  };

  const renderActions = (item) => {
    return <button onClick={() => sendEmail(item.username, item.employee_id, item.password)}>Send Email</button>;
  };

  return (
    <div className="employee-portal">
      <ToastContainer className="addClassToastify"/>
      <h1>Employee Portal</h1>
      <DataTable data={extractEmployeeData} headers={headers} renderActions={renderActions} />
    </div>
  );
};

export default EmployeePortal;