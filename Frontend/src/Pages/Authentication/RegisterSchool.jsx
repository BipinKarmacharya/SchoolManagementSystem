import { useState } from "react";
import { Link } from "react-router-dom";

import "/src/assets/CSS/Pages/Authentication.css";

function RegisterSchool() {
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/register-school/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schoolName, email, password }),
    });

    if (response.ok) {
      alert("School registered successfully!");
    } else {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-school">
      <div class="register-container">
        <div className="registration-form-container">
          <h2>Register Your School</h2>
          <form id="register-form">
            <div class="form-group">
              <label for="school-name">School Name</label>
              <input
                type="text"
                id="school-name"
                name="school-name"
                placeholder="Enter school name"
                required
              />
            </div>

            <div class="form-group">
              <label for="school-code">School Code</label>
              <input
                type="text"
                id="school-code"
                name="school-code"
                placeholder="Enter School Code"
                required
              />
            </div>

            <div class="form-group">
              <label for="admin-email">Email Address</label>
              <input
                type="email"
                id="admin-email"
                name="admin-email"
                placeholder="Enter email address"
                required
              />
            </div>

            <div class="form-group">
              <label for="school-address">School Address</label>
              <input
                type="text"
                id="school-address"
                name="school-address"
                placeholder="Enter school address"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" class="register-btn">
              Register School
            </button>
          </form>
          <p class="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        {/* Image */}
        <div class="register-img">
          <img src="/Images/register.jpg" alt="EduManage Logo" />
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;
