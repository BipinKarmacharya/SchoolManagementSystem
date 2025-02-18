import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "/src/assets/CSS/Pages/Authentication.css";

function Login() {
  const [role, setRole] = useState("school_admin"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Create the login payload
    const loginData = {
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
      if (role === "school_admin") {
        navigate("/admin-dashboard");
      } else if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "employee") {
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
              <button className="std" onClick={() => setRole("student")}>
                <i className="fa-solid fa-user-graduate"></i>
                <span>Student</span>
              </button>
              <button className="std" onClick={() => setRole("employee")}>
                <i className="fa fa-chalkboard-user"></i>
                <span>Teacher</span>
              </button>
              <button className="std" onClick={() => setRole("school_admin")}>
                <i className="fa fa-user-gear"></i>
                <span>Admin</span>
              </button>
            </div>
          </div>

          <form id="login-form" onSubmit={handleLogin}>
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





// token generate garepaxi use


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import "/src/assets/CSS/Pages/Authentication.css";

// function Login() {
//   const [role, setRole] = useState("school_admin"); // Default role
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     // Create the login payload
//     const loginData = {
//       identifier,
//       password,
//       role,
//     };

//     console.log("Login payload:", loginData); // For testing

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       if (!response.ok) throw new Error("Invalid credentials");
//       const data = await response.json();
//       localStorage.setItem("token", data.access);
//       localStorage.setItem("refreshToken", data.refresh);
//       localStorage.setItem("role", data.role);

//       // Redirect to different dashboards based on role
//       if (role === "school_admin") {
//         navigate("/admin-dashboard");
//       } else if (role === "student") {
//         navigate("/student-dashboard");
//       } else if (role === "employee") {
//         navigate("/teacher-dashboard");
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="login">
//       <Link to="/">
//         <FaHome className="LoginHomeIcon" />
//       </Link>
//       <div id="login-container" className="login-Container">

//         {/* Image */}

//         <div id="img-slider" className="img-slider">
//           <img id="student-image" src="/Images/login.png" alt="Student Login" />
//           {/* <img id="teacher-image" src="/Images/teacher.png" alt="Teacher Login" /> */}
//           {/* <img id="admin-image" src="/Images/admin.png" alt="Admin Login" /> */}
//         </div>

//         {/* Form */}

//         <div className="login-form-container">
//           <div className="logOption" id="role">
//             <h3>Login as:</h3>
//             <div className="selectUserButton">
//               <button className="std" onClick={() => setRole("student")}>
//                 <i className="fa-solid fa-user-graduate"></i>
//                 <span>Student</span>
//               </button>
//               <button className="std" onClick={() => setRole("employee")}>
//                 <i className="fa fa-chalkboard-user"></i>
//                 <span>Teacher</span>
//               </button>
//               <button className="std" onClick={() => setRole("school_admin")}>
//                 <i className="fa fa-user-gear"></i>
//                 <span>Admin</span>
//               </button>
//             </div>
//           </div>

//           <form id="login-form" onSubmit={handleLogin}>
//             {(role === "school_admin" || role === "student" || role === "employee") && (
//               <div className="form__group field">
//                 <input
//                   type="text"
//                   className="form__field"
//                   placeholder={
//                     role === "school_admin"
//                       ? "School Code"
//                       : role === "student"
//                       ? "Student ID"
//                       : "Teacher ID"
//                   }
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="identifier" className="form__label">
//                   {role === "school_admin" ? "School Code" : role === "student" ? "Student ID" : "Teacher ID"}
//                 </label>
//               </div>
//             )}

//             <div className="form__group field">
//               <input
//                 type="password"
//                 className="form__field"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="password" className="form__label">
//                 Password
//               </label>
//             </div>

//             <div className="formButton">
//               <button type="submit" className="submit" id="userLogin">
//                 Sign In
//               </button>
//               <button className="forgot">Forgot Password?</button>
//             </div>

//             <p className="register-link">
//               Don't have an account? <Link to="/register-school">Register your school</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;