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
    school: 2, // Assuming school ID is 1 for this example
    user: 1, // Assuming user ID is 1 for this example
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
    const formData = new FormData();

    // Append text fields from employeeData
    const textFields = [
      "employee_id",
      "first_name",
      "middle_name",
      "last_name",
      "address",
      "phone",
      "n_id",
      "email",
      "blood_group",
      "date_of_enrollment",
      "department",
      "designation",
      "salary",
      "school",
      "user",
    ];
    textFields.forEach((field) => {
      formData.append(field, employeeData[field]);
    });

    // Append file fields from employeeData explicitly
    if (employeeData.profile_image)
      formData.append("profile_image", employeeData.profile_image);
    if (employeeData.document1)
      formData.append("document1", employeeData.document1);
    if (employeeData.document2)
      formData.append("document2", employeeData.document2);
    if (employeeData.document3)
      formData.append("document3", employeeData.document3);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/employees/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      });
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="add-students">
      <div className="formHeader">
        <h2>Employee Onboarding Form</h2>
        <p>Fields Marked * are .</p>
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
                
              />
            </fieldset>

            <fieldset>
              <legend>Gender*</legend>
              <select
                name="gender"
                id="selectGender"
                value={employeeData.gender}
                onChange={handleChange}
             
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
              </select>
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
              <legend>Date Of Birth*</legend>
              <input
                type="date"
                name="date_of_birth"
                id="birthDate"
                value={employeeData.date_of_birth}
                onChange={handleChange}
                
              />
            </fieldset>

            <fieldset>
              <legend>Citizenship*</legend>
              <input
                type="file"
                name="document1"
                id="citizenship"
                onChange={handleFileChange}
               
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

            <fieldset>
              <legend>Religion - (Optional)</legend>
              <select
                name="religion"
                id="employeeReligion"
                placeholder="Religion"
                value={employeeData.religion}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Religion
                </option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Others">Others</option>
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