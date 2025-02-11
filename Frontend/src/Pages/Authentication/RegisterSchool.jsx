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
    // <form onSubmit={handleRegister}>
    //     <input type="text" placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
    //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     <button type="submit">Register School</button>
    // </form>

    <div className="register-school">
      <div class="register-container">
      <div class="register-logo">
        <img src="/Images/logad.png" alt="EduManage Logo" />
      </div>
      <h2>Register Your School</h2>
      <form id="register-form">
        {/* School Name */}
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

        {/* Admin Email */}
        <div class="form-group">
          <label for="admin-email">Admin Email</label>
          <input
            type="email"
            id="admin-email"
            name="admin-email"
            placeholder="Enter admin email"
            required
          />
        </div>

        {/* Admin Password */}
        <div class="form-group">
          <label for="admin-password">Admin Password</label>
          <input
            type="password"
            id="admin-password"
            name="admin-password"
            placeholder="Enter admin password"
            required
          />
        </div>

        {/* School Address */}
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

        {/* Submit Button */}
        <button type="submit" class="register-btn">
          Register School
        </button>
      </form>

      {/* Link to Login Page */}
      <p class="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
    </div>
  );
}

export default RegisterSchool;
