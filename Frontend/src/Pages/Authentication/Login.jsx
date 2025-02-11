import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "/src/assets/CSS/Pages/Authentication.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "student") navigate("/student-dashboard");
      else if (data.role === "teacher") navigate("/teacher-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div id="login-container" className="login-Container">
        <div className="logoption" id="role">
          <h3>Login:</h3>

          <button className="std" onclick="handleRoleClick('student')">
            <i className="fa-solid fa-user-graduate"></i>
            <span>Student</span>
          </button>
          <button className="teacheropt" onclick="handleRoleClick('teacher')">
            <i className="fa fa-chalkboard-user"></i>
            <span>Teacher</span>
          </button>
          <button className="adminopt" onclick="handleRoleClick('admin')">
            <i className="fa fa-user-gear"></i>
            <span>Admin</span>
          </button>
        </div>

        <div className="img-container">
          <div id="img-slider" className="img-slider">
            <img
              id="student-image"
              src="/Images/login.png"
              alt="Student Login"
            />
            <img
              id="teacher-image"
              src="/Images/teacher.png"
              alt="Teacher Login"
            />
            <img id="admin-image" src="/Images/admin.png" alt="Admin Login" />
          </div>
        </div>

        <div className="box">
          <form id="login-form">
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Name"
                required
              />
              <label for="name" className="form__label" id="name">
                Name
              </label>
            </div>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Password"
                required
              />
              <label for="password" className="form__label" id="password">
                Password
              </label>
            </div>
            <button type="submit" className="submit" id="userLogin">
              Sign In
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            <span className="forgot">Forgot Password?</span>
            <p className="register-link">
              Don't have an account?{" "}
              <Link to = "/register-school">Register your school</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
