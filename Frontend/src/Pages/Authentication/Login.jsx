import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";


import "/src/assets/CSS/Pages/Authentication.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Directly redirect to admin dashboard
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <Link to="/"><FaHome className="LoginHomeIcon" /></Link>
      <div id="login-container" className="login-Container">
        {/* Image Slider */}
        <div id="img-slider" className="img-slider">
          <img id="student-image" src="/Images/login.png" alt="Student Login" />
          <img id="teacher-image" src="/Images/teacher.png" alt="Teacher Login" />
          <img id="admin-image" src="/Images/admin.png" alt="Admin Login" />
        </div>

        {/* Form */}
        <div className="login-form-container">
          <div className="logOption" id="role">
            <h3>Login:</h3>
            <div className="selectUserButton">
              <button className="std" onClick="handleRoleClick('student')">
                <i className="fa-solid fa-user-graduate"></i>
                <span>Student</span>
              </button>
              <button
                className="teacherOpt"
                onClick="handleRoleClick('teacher')"
              >
                <i className="fa fa-chalkboard-user"></i>
                <span>Teacher</span>
              </button>
              <button className="adminOpt" onClick="handleRoleClick('admin')">
                <i className="fa fa-user-gear"></i>
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form id="login-form" onSubmit={handleLogin}>
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="form__label">
                Email
              </label>
            </div>
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="School Code"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <label htmlFor="identifier" className="form__label">
                School Code
              </label>
            </div>
            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
            <div className="formButton">
              <button type="submit" className="submit" id="userLogin">
                Sign In
              </button>
              <button className="forgot">
                Forgot Password?
              </button>
            </div>

            <p className="register-link">
              Don't have an account?{" "}
              <Link to="/register-school">Register your school</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;