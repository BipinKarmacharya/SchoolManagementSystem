import React, { useState } from "react";
import axios from "axios";

const AddStudents = () => {
  const [studentData, setStudentData] = useState({
    student_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    enroll_class: "", // Added enroll_class field
    profile_image: null,
    blood_group: "",
    religion: "",
    document1: null,
    document2: null,
    document3: null,
    date_of_birth: "",
    date_of_enrollment: "",
    gender: "",
    school: 1, // Assuming school ID is 1 for this example
  });

  const [parentData, setParentData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    pdocument: null,
  });

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentData({ ...parentData, [name]: value });
  };

  // Update file state based on which input triggered the event.
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "pdocument") {
      setParentData((prevData) => ({
        ...prevData,
        pdocument: files[0],
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append text fields from studentData
    const textFields = [
      "student_id",
      "first_name",
      "middle_name",
      "last_name",
      "address",
      "phone",
      "email",
      "enroll_class",
      "blood_group",
      "religion",
      "date_of_birth",
      "date_of_enrollment",
      "gender",
      "school",
    ];
    textFields.forEach((field) => {
      formData.append(field, studentData[field]);
    });

    // Append file fields from studentData explicitly
    if (studentData.profile_image)
      formData.append("profile_image", studentData.profile_image);
    if (studentData.document1)
      formData.append("document1", studentData.document1);
    if (studentData.document2)
      formData.append("document2", studentData.document2);
    if (studentData.document3)
      formData.append("document3", studentData.document3);

    try {
      // First post the student data (with files) to the API.
      const studentResponse = await axios.post(
        "http://127.0.0.1:8000/api/students/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const studentId = studentResponse.data.id;

      // Prepare parent data.
      // Note: If pdocument (parent file) needs to be sent as a file, you might need to handle it similarly via FormData.
      const parentPayload = {
        ...parentData,
        student: studentId,
      };

      // Post parent data (assuming JSON data here).
      const parentResponse = await axios.post(
        "http://127.0.0.1:8000/api/parents/",
        parentPayload
      );

      console.log(
        "Student and Parent data submitted successfully:",
        studentResponse.data,
        parentResponse.data
      );
    } catch (error) {
      console.error(
        "There was an error submitting the form:",
        error.response?.data || error.message
      );
    }
  };

  return (
  
      <div className="add-students">
        {/* <PageTitle title="Admission Form" /> */}
        <div className="formHeader">
          <h2>Admission Form</h2>
          <p>Fields Marked * are required.</p>
        </div>
        <form onSubmit={handleSubmit} id="addStudentForm">
          <div className="studentInfo">
            <div className="infoHeader">
              <h5>1. Student Information</h5>
            </div>
            <div className="fieldsetDiv">
              <fieldset>
                <legend>First Name*</legend>
                <input
                  type="text"
                  name="first_name"
                  id="studentFirstName"
                  placeholder="First Name"
                  value={studentData.first_name}
                  onChange={handleStudentChange}
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Middle Name</legend>
                <input
                  type="text"
                  name="middle_name"
                  id="studentMiddleName"
                  placeholder="Middle Name"
                  value={studentData.middle_name}
                  onChange={handleStudentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Last Name*</legend>
                <input
                  type="text"
                  name="last_name"
                  id="studentLastName"
                  placeholder="Last Name"
                  value={studentData.last_name}
                  onChange={handleStudentChange}
                  required
                />
              </fieldset>

              <fieldset>
                <legend>Gender*</legend>
                <select
                  name="gender"
                  id="gender"
                  placeholder="Gender"
                  value={studentData.gender}
                  onChange={handleStudentChange}
                  // defaultValue=""
                  required
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
                  id="studentAddress"
                  placeholder="Address"
                  value={studentData.address}
                  onChange={handleStudentChange}
                  required
                />
              </fieldset>
              
              <fieldset>
                <legend>Phone*</legend>
                <input
                  type="text"
                  name="phone"
                  id="studentPhone"
                  placeholder="Phone"
                  value={studentData.phone}
                  onChange={handleStudentChange}
                />
              </fieldset>

              <fieldset>
                <legend>Email - (Optional)</legend>
                <input
                  type="email"
                  name="email"
                  id="studentEmail"
                  placeholder="Email"
                  value={studentData.email}
                  onChange={handleStudentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Enroll Class*</legend>
                <input
                  type="text"
                  name="enroll_class"
                  id="studentEnrollClass"
                  placeholder="Enroll Class"
                  value={studentData.enroll_class}
                  onChange={handleStudentChange}
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Photo - (Optional)</legend>
                <input
                  type="file"
                  name="profile_image"
                  id="studentProfileImage"
                  onChange={handleFileChange}
                />
              </fieldset>
              
              <fieldset>
                <legend>Date of Birth*</legend>
                <input
                  type="date"
                  name="date_of_birth"
                  id="studentDateOfBirth"
                  value={studentData.date_of_birth}
                  onChange={handleStudentChange}
                />
              </fieldset>
              
              <fieldset>
                <legend>Date of Enrollment*</legend>
                <input
                  type="date"
                  name="date_of_enrollment"
                  id="studentDateOfEnrollment"
                  value={studentData.date_of_enrollment}
                  onChange={handleStudentChange}
                />
              </fieldset>
            </div>
          </div>

          {/* Other Information */}

          <div className="personalInfo">
            <div className="infoHeader">
              <h5>2. Other Information</h5>
            </div>
            <div className="fieldsetDiv">
            <fieldset>
                <legend>Birth Certificate - (Optional)</legend>
                <input
                  type="file"
                  name="document1"
                  id="studentDocument1"
                  onChange={handleFileChange}
                />
              </fieldset>

              <fieldset>
                <legend>Transfer Certificate - (Optional)</legend>
                <input
                  type="file"
                  name="document2"
                  id="studentDocument2"
                  onChange={handleFileChange}
                />
              </fieldset>
              <fieldset>
                <legend>Other Document - (Optional)</legend>
                <input
                  type="file"
                  name="document3"
                  id="studentDocument3"
                  onChange={handleFileChange}
                />
              </fieldset>

              <fieldset>
                <legend>Blood Group - (Optional)</legend>
                <select
                  name="blood_group"
                  id="studentBloodGroup"
                  placeholder="Blood Group"
                  value={studentData.blood_group}
                  onChange={handleStudentChange}
                  // defaultValue=""
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
                  id="studentReligion"
                  placeholder="Religion"
                  value={studentData.religion}
                  onChange={handleStudentChange}
                  // defaultValue=""
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

          {/* Parents Information */}

          <div className="parentsInfo">
            <div className="infoHeader">
              <h5>3. Parent Information</h5>
            </div>
            <div className="fieldsetDiv">
              <fieldset>
                <legend>First Name*</legend>
                <input
                  type="text"
                  name="first_name"
                  id="parentFirstName"
                  placeholder="First Name"
                  value={parentData.first_name}
                  onChange={handleParentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Last Name*</legend>
                <input
                  type="text"
                  name="last_name"
                  id="parentLastName"
                  placeholder="Last Name"
                  value={parentData.last_name}
                  onChange={handleParentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Phone*</legend>
                <input
                  type="text"
                  name="phone"
                  id="parentPhone"
                  placeholder="Phone"
                  value={parentData.phone}
                  onChange={handleParentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Email*</legend>
                <input
                  type="email"
                  name="email"
                  id="parentEmail"
                  placeholder="Email"
                  value={parentData.email}
                  onChange={handleParentChange}
                />
              </fieldset>
              <fieldset>
                <legend>Parent Document</legend>
                <input
                  type="file"
                  name="pdocument"
                  id="parentDocument"
                  onChange={handleFileChange}
                />
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

export default AddStudents;
