import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import "/src/assets/CSS/Pages/Authentication.css";

function RegisterSchool() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/auth/school/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name: schoolName, 
        school_code: schoolCode, 
        email: email, 
        address: address, 
        password: password 
      }),
    });

    if (response.ok) {
      alert("School registered successfully!");
    } else {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-school">
      <Link to="/"><FaHome className="HomeIcon"/></Link>
      <div className="register-container">
        <div className="registration-form-container">
          <h2>Register Your School</h2>
          <form id="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="school-name">School Name</label>
              <input
                type="text"
                id="school-name"
                name="school-name"
                placeholder="Enter school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-code">School Code</label>
              <input
                type="text"
                id="school-code"
                name="school-code"
                placeholder="Enter School Code"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-email">Email Address</label>
              <input
                type="email"
                id="admin-email"
                name="admin-email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="school-address">School Address</label>
              <input
                type="text"
                id="school-address"
                name="school-address"
                placeholder="Enter school address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-button">
              Register School
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        {/* Image */}
        <div className="register-img">
          <img src="/Images/register.jpg" alt="EduManage Logo" />
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;


