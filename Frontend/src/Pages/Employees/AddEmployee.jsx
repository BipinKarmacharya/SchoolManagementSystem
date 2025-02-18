import React, { useState } from "react";
import axios from "axios";
import "/src/assets/CSS/Pages/Students.css";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    employee_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    phone: "",
    n_id: "",
    email: "",
    profile_image: null,
    blood_group: "",
    document1: null,
    document2: null,
    document3: null,
    date_of_enrollment: "",
    department: "",
    designation: "",
    salary: "",
    school: 1, // Assuming school ID is 1 for this example
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEmployeeData({ ...employeeData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the payload structure
    const payload = {
      school: employeeData.school,
      user: {
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        email: employeeData.email,
        password: "pass" + employeeData.first_name, // Replace with actual password input field
        username: Math.random().toString().slice(-6),
        role: "Teacher",
      },
      employee_id: employeeData.employee_id,
      first_name: employeeData.first_name,
      middle_name: employeeData.middle_name,
      last_name: employeeData.last_name,
      address: employeeData.address,
      phone: employeeData.phone,
      n_id: employeeData.n_id,
      email: employeeData.email,
      blood_group: employeeData.blood_group,
      date_of_enrollment: employeeData.date_of_enrollment,
      department: employeeData.department,
      designation: employeeData.designation,
      salary: employeeData.salary,
      gender: employeeData.gender,
      date_of_birth: employeeData.date_of_birth,
      religion: employeeData.religion,
    };

    console.log("User object:", payload.user);

    try {
      // Send employee registration request
      const employeeResponse = await axios.post(
        "http://127.0.0.1:8000/api/employeeregister/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Employee data submitted successfully:", employeeResponse.data);
      alert("Employee added successfully!");
    } catch (error) {
      console.error("There was an error submitting the form:", error.response?.data || error.message);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="add-students">
      <div className="formHeader">
        <h2>Employee Onboarding Form</h2>
        <p>Fields Marked * are required.</p>
      </div>
      <form id="addEmployeeForm" onSubmit={handleSubmit}>
        <div className="studentInfo">
          <div className="infoHeader">
            <h5>1. Employee Information</h5>
          </div>
          <div className="fieldsetDiv">
            <fieldset>
              <legend>First Name*</legend>
              <input
                type="text"
                name="first_name"
                id="employeeFirstName"
                placeholder="First Name"
                value={employeeData.first_name}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Middle Name - (Optional)</legend>
              <input
                type="text"
                name="middle_name"
                id="employeeMiddleName"
                placeholder="Middle Name"
                value={employeeData.middle_name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset>
              <legend>Last Name*</legend>
              <input
                type="text"
                name="last_name"
                id="employeeLastName"
                placeholder="Last Name"
                value={employeeData.last_name}
                onChange={handleChange}
                required
              />
            </fieldset>

           

            <fieldset>
              <legend>Address*</legend>
              <input
                type="text"
                name="address"
                id="employeeAddress"
                placeholder="Address"
                value={employeeData.address}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Phone*</legend>
              <input
                type="text"
                name="phone"
                id="employeePhone"
                placeholder="Phone"
                value={employeeData.phone}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Email*</legend>
              <input
                type="email"
                name="email"
                id="emp_email"
                placeholder="Email Address"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Photo - (Optional)</legend>
              <input
                type="file"
                name="profile_image"
                id="employeePhoto"
                onChange={handleFileChange}
              />
            </fieldset>

            <fieldset>
              <legend>Department*</legend>
              <select
                name="department"
                id="selectDepartment"
                value={employeeData.department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="Administrative">Administrative</option>
                <option value="Teaching">Teaching</option>
                <option value="Support">Support</option>
              </select>
            </fieldset>

            <fieldset>
              <legend>Designation*</legend>
              <select
                name="designation"
                id="selectDesignation"
                value={employeeData.designation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="Teacher">Teacher</option>
                <option value="Administrator">Administrator</option>
                <option value="Support Staff">Support Staff</option>
              </select>
            </fieldset>

            <fieldset>
              <legend>Date of Onboarding*</legend>
              <input
                type="date"
                name="date_of_enrollment"
                id="addDate"
                value={employeeData.date_of_enrollment}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Salary*</legend>
              <input
                type="number"
                name="salary"
                id="salary"
                placeholder="Salary"
                value={employeeData.salary}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>
        </div>

        <div className="personalInfo">
          <div className="infoHeader">
            <h5>2. Other Information</h5>
          </div>
          <div className="fieldsetDiv">
            

            <fieldset>
              <legend>Citizenship*</legend>
              <input
                type="file"
                name="document1"
                id="citizenship"
                onChange={handleFileChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>National ID*</legend>
              <input
                type="text"
                name="n_id"
                id="nid"
                placeholder="National ID number"
                value={employeeData.n_id}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>PAN</legend>
              <input
                type="file"
                name="document2"
                id="pan"
                onChange={handleFileChange}
              />
            </fieldset>

            <fieldset>
              <legend>Other Document</legend>
              <input
                type="file"
                name="document3"
                id="otherDoc"
                onChange={handleFileChange}
              />
            </fieldset>

            <fieldset>
              <legend>Blood Group - (Optional)</legend>
              <select
                name="blood_group"
                id="employeeBloodGroup"
                placeholder="Blood Group"
                value={employeeData.blood_group}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </fieldset>

          </div>
        </div>

        <div className="formButtons">
          <button type="reset" className="reset">
            <i className="fa-solid fa-rotate"></i> Reset
          </button>
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;