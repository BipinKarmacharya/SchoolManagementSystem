import PageTitle from "../../Components/PageTitle";

const AddEmployee = () => {
  return (
    <>
      <div className="add-students">
        <div className="formHeader">
          <h2>Employee Onboarding Form</h2>
          <p>Fields Marked * are required.</p>
        </div>
        <form action="" id="addStudentForm">
          <div className="studentInfo">
            <div className="infoHeader">
              <h5>1. Employee Information</h5>
            </div>
            <div className="fieldsetDiv">
              <fieldset>
                <legend>First Name*</legend>
                <input
                  type="text"
                  name="employeeFirstName"
                  id="employeeFirstName"
                  placeholder="First Name"
                  required
                />
              </fieldset>

              <fieldset>
                <legend>Middle Name - (Optional)</legend>
                <input
                  type="text"
                  name="employeeMiddleName"
                  id="employeeMiddleName"
                  placeholder="Middle Name"
                  required
                />
              </fieldset>

              <fieldset>
                <legend>Last Name*</legend>
                <input
                  type="text"
                  name="employeeLastName"
                  id="employeeLastName"
                  placeholder="Last Name"
                  required
                />
              </fieldset>

              <fieldset>
                <legend>Gender*</legend>
                <select name="selectGender" id="selectGender">
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
                  value=""
                  // onChange={handleStudentChange}
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
                  // value={studentData.phone}
                  // onChange={handleStudentChange}
                />
              </fieldset>

              <fieldset>
                <legend>Email*</legend>
                <input
                  type="email"
                  name="emp_email"
                  id="emp_email"
                  placeholder="Email Address" 
                  // value={studentData.phone}
                  // onChange={handleStudentChange}
                />
              </fieldset>

              <fieldset>
                <legend>Photo - (Optional)</legend>
                <input type="file" name="employeePhoto" id="employeePhoto" />
              </fieldset>

              <fieldset>
                <legend>Department*</legend>
                <select name="selectClass" id="selectClass" defaultValue="">
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="1">Administrative</option>
                </select>
              </fieldset>

              <fieldset>
                <legend>Designation*</legend>
                <select name="selectClass" id="selectClass" defaultValue="">
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="1">Teacher</option>
                </select>
              </fieldset>

              <fieldset>
                <legend>Date of Onboarding*</legend>
                <input type="date" name="addDate" id="addDate" required />
              </fieldset>

              <fieldset>
                <legend>Salary*</legend>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  placeholder="Salary"
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
                <legend>Date Of Birth*</legend>
                <input type="date" name="birthDate" id="birthDate" required />
              </fieldset>

              <fieldset>
                <legend>Citizenship*</legend>
                <input
                  type="file"
                  name="citizenship"
                  id="citizenship"
                  required
                />
              </fieldset>

              <fieldset>
                <legend>National ID*</legend>
                <input
                  type="text"
                  name="nid"
                  id="nid"
                  placeholder="National ID number"
                />
              </fieldset>

              <fieldset>
                <legend>PAN</legend>
                <input type="file" name="pan" id="pan" required />
              </fieldset>

              <fieldset>
                <legend>Other Document</legend>
                <input type="file" name="otherDoc" id="otherDoc" required />
              </fieldset>
              
              <fieldset>
                <legend>Blood Group - (Optional)</legend>
                <select
                  name="blood_group"
                  id="studentBloodGroup"
                  placeholder="Blood Group"
                  // value={studentData.blood_group}
                  // onChange={handleStudentChange}
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
                  // value=
                  // onChange={handleStudentChange}
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
    </>
  );
};

export default AddEmployee;
