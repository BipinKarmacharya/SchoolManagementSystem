import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [classes, setClasses] = useState([]); // State to store classes

  useEffect(() => {
    // Fetch available classes when the component loads
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/class/");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

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

    // Create the payload structure
    const payload = {
      school: studentData.school,
      user: {
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        password: "pass" + studentData.first_name, // Replace with actual password input field
        username: Math.random().toString().slice(-6),
        role: "student", // Ensure the role value matches the expected value on the backend
      },
      first_name: studentData.first_name,
      middle_name: studentData.middle_name,
      last_name: studentData.last_name,
      address: studentData.address,
      enroll_class: studentData.enroll_class,
      phone: studentData.phone,
      email: studentData.email,
      gender: studentData.gender,
    };

    try {
      // Send student registration request
      const studentResponse = await axios.post(
        "http://127.0.0.1:8000/api/student/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Student added successfully!");
      const studentId = studentResponse.data.id;

      // Prepare parent data
      const parentPayload = {
        ...parentData,
        student: studentId, // Link parent with student
      };

      // Send parent registration request
      const parentResponse = await axios.post(
        "http://127.0.0.1:8000/api/parent/",
        parentPayload
      );

    } catch (error) {
      toast.error("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="add-students">
      <ToastContainer className="addClassToastify"/>
      <div className="formHeader">
        <h2>Admission Form</h2>
        <p>Fields Marked * are required.</p>
      </div>
      <form onSubmit={handleSubmit} id="addStudentForm" >
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
              <select
                name="enroll_class"
                id="studentEnrollClass"
                value={studentData.enroll_class}
                onChange={handleStudentChange}
                required
              >
                <option value="" disabled>
                  Select Class
                </option>
                {classes && classes.length > 0 ? (
                  classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading classes...</option>
                )}
              </select>
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