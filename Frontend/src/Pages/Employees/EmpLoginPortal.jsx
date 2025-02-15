import React, { useState, useEffect } from 'react';
import DataTable from '/src/Components/LoginDataTable';

const EmployeePortal = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API or database
    const fetchData = async () => {
      // Replace this with an actual API call
      const response = await fetch('http://127.0.0.1:8000/api/employees');
      const data = await response.json();
      setEmployees(data);
    };

    fetchData();
  }, []);

  const headers = ['S.N', 'Employee ID', 'Employee\'s Name', 'Phone', 'Username', 'Password', 'Actions'];

  const extractEmployeeData = employees.map(employee => ({
    employee_id: employee.employee_id,
    emp_name: employee.first_name + ' ' + employee.middle_name + ' ' + employee.last_name,
    phone: employee.phone,
    username: employee.email,
    password: employee.password,
  }));

  const renderActions = (item) => {
    return <button>Send Email</button>;
  };

  return (
    <div className="employee-portal">
      <h1>Employee Portal</h1>
      <DataTable data={extractEmployeeData} headers={headers} renderActions={renderActions} />
    </div>
  );
};

export default EmployeePortal;
