import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "/src/assets/CSS/Pages/Authentication.css";

// Icons
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";

function Login() {
  const [role, setRole] = useState("School Admin"); // Default role
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Create the login payload
    const loginData = {
      identifier,
      email,
      password,
      role,
    };

    console.log("Login payload:", loginData); // For testing

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Invalid credentials");
      const data = await response.json();
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("role", data.role);

      // Redirect to different dashboards based on role
      if (role === "School Admin") {
        navigate("/admin-dashboard");
      } else if (role === "Student") {
        navigate("/student-dashboard");
      } else if (role === "Teacher") {
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <FaHome className="LoginHomeIcon" />
      </Link>
      <div id="login-container" className="login-Container">
        {/* Image */}

        <div id="img-slider" className="img-slider">
          <img id="student-image" src="/Images/login.png" alt="Student Login" />
          {/* <img id="teacher-image" src="/Images/teacher.png" alt="Teacher Login" /> */}
          {/* <img id="admin-image" src="/Images/admin.png" alt="Admin Login" /> */}
        </div>

        {/* Form */}

        <div className="login-form-container">
          <div className="logOption" id="role">
            <h3>Login as:</h3>
            <div className="selectUserButton">
              <div className="login-user">
                <button
                  className={`std ${role === "Student" ? "active-role" : ""}`}
                  onClick={() => {
                    setRole("Student");
                    console.log("Selected Role:", "Student");
                  }}
                >
                  <PiStudentBold className="login-user-icon" />
                </button>
                <span>Student</span>
              </div>
              <div className="login-user">
                <button
                  className={`std ${role === "Teacher" ? "active-role" : ""}`}
                  onClick={() => {
                    setRole("Teacher");
                    console.log("Selected Role:", "Teacher");
                  }}
                >
                  <LiaChalkboardTeacherSolid className="login-user-icon" />
                </button>
                <span>Teacher</span>
              </div>
              <div className="login-user">
                <button
                  className={`std ${
                    role === "School Admin" ? "active-role" : ""
                  }`}
                  onClick={() => {
                    setRole("School Admin");
                    console.log("Selected Role:", "School Admin");
                  }}
                >
                  <RiAdminFill className="login-user-icon" />
                </button>
                <span>Admin</span>
              </div>
            </div>
          </div>

          <form id="login-form" onSubmit={handleLogin}>
            {(role === "School Admin" ||
              role === "Student" ||
              role === "Teacher") && (
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder={
                    role === "School Admin"
                      ? "School Code"
                      : role === "Student"
                      ? "Student ID"
                      : "Teacher ID"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                <label htmlFor="identifier" className="form__label">
                  {role === "School Admin"
                    ? "School Code"
                    : role === "Student"
                    ? "Student ID"
                    : "Teacher ID"}
                </label>
              </div>
            )}

            <div className="form__group field">
              <input
                type="email"
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
              <button className="forgot">Forgot Password?</button>
            </div>

            <p className="register-link">
              Don't have an account? <Link to="/register-school">Register your school</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
