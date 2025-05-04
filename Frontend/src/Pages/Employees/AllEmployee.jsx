import { useState, useEffect } from "react";
import axios from "axios";
import "/src/assets/CSS/Pages/Students.css";

import SearchForm from "/src/Components/SearchForm";
import Profile from "/src/Components/Profile";

// Function to group employees by department
const groupByDepartment = (employees) => {
  return employees.reduce((acc, employee) => {
    (acc[employee.department] = acc[employee.department] || []).push(employee);
    return acc;
  }, {});
};

const AllEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/employee/");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle dropdown selection change
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // Filter employees based on search term and department selection
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.first_name} ${employee.middle_name ? employee.middle_name + " " : ""}${employee.last_name}`.toLowerCase();
    
    const matchesSearch = searchTerm === "" || fullName.includes(searchTerm);
    const matchesDepartment = selectedDepartment === "" || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Group filtered employees by department
  const employeesByDepartment = groupByDepartment(filteredEmployees);

  // Get unique department names
  const departmentOptions = [
    ...new Set(employees.map((emp) => emp.department)),
  ].map((dept) => ({ value: dept, label: dept }));

  return (
    <div className="all-employees">
      <SearchForm
        searchPlaceholder="Search Employee"
        options={departmentOptions}
        optionLabel="View Employees By Department"
        onSearchChange={handleSearchChange}
        onSelectChange={handleDepartmentChange}
      />
      <div className="all-employees-container">
        {Object.keys(employeesByDepartment).map((department) => (
          <div key={department} className="department-section">
            <div className="departmentInfo">
              <h2>Department: {department}</h2>
            </div>
            <div className="allEmployeesData">
              {employeesByDepartment[department].map((employee) => (
                <Profile key={employee.id} person={employee} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEmployee;