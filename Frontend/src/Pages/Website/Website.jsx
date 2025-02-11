import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "/src/assets/CSS/Pages/Website.css";

const Website = () => {
  return (
    <div className="website">
      {/* Header */}
      <div className="websiteHeader">
        <div id="particles-js"></div>
        <nav>
          <div className="website-logo">EduManage</div>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="auth-buttons">
            <button className="login-btn">
              <a href="login.html">
                login
                <i className="fa-solid fa-user-plus" style={{marginLeft: "10px"}}></i>
              </a>
            </button>
            <button className="register-btn">
              <a href="register.html">
                Register as School Admin
                <i className="fa-solid fa-user-gear" style={{marginLeft: "10px"}}></i>
              </a>
            </button>
          </div>
        </nav>
        <div className="hero">
          <h1 className="animate__animated animate__fadeIn">
            Revolutionize School Management with EduManage
          </h1>
          <p
            className="animate__animated animate__fadeIn animate__delay-1s"
            style={{fontSize: "35px;"}}
          >
            Streamline administration, attendance, grading, and communication in
            one powerful platform.
          </p>
          <div className="cta-buttons animate__animated animate__fadeIn animate__delay-2s">
            <button className="login-btn">
              <Link to ="/admin-dashboard">
                Login
                <i className="fa-solid fa-user-plus" style={{marginLeft: "10px;"}}></i>
              </Link>
            </button>
            <button className="register-btn">
              <Link to = "/register-school">Register as School Admin</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card">
            <i className="icon">📅</i>
            <h3>Attendance Management</h3>
            <p>Track and manage student attendance effortlessly.</p>
          </div>
          <div className="card">
            <i className="icon">📊</i>
            <h3>Grade book</h3>
            <p>Easily record and analyze student grades.</p>
          </div>
          <div className="card">
            <i className="icon">💬</i>
            <h3>Communication Portal</h3>
            <p>Connect with parents and staff seamlessly.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <img
              src="/image/signup.png"
              alt="Sign Up"
              style={{width: "20rem", height: "20rem", marginLeft: "-10px"}}
            />
            <h3>1. Sign Up</h3>
            <p>Register your school and set up your account.</p>
          </div>
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Customize" />
            <h3>2. Customize</h3>
            <p>Add students, teachers, and classes to the system.</p>
          </div>
          <div className="step">
            <img src="https://via.placeholder.com/150" alt="Manage" />
            <h3>3. Manage</h3>
            <p>Start managing attendance, grades, and communication.</p>
          </div>
        </div>
      </section>

      {/* <!-- Testimonials Section --> */}
      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <img src="https://via.placeholder.com/100" alt="Rajesh Hamal" />
            <p>
              "EduManage has made our school management so much easier. Highly
              recommended!"
            </p>
            <h4>Rajesh Hamal, School Principal</h4>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/100" alt="User 2" />
            <p>"The communication portal is a game-changer for our school."</p>
            <h4>Bipin Sir, Teacher</h4>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/100" alt="User 3" />
            <p>"Affordable and easy to use. Perfect for small schools."</p>
            <h4>Madhav sir, Admin</h4>
          </div>
        </div>
      </section>

      {/* <!-- Call-to-Action Section --> */}
      <section id="cta" className="cta">
        <h2>Ready to Transform Your School Management?</h2>
        <p>Join hundreds of schools already using EduManage.</p>
        <div className="cta-buttons">
          <button className="login-btn">
            <a href="login.html">Login</a>
          </button>
          <button className="register-btn">
            <a href="register.html">Register as School Admin</a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <div className="about">
            <h3>About Us</h3>
            <p>
              EduManage is a modern school management system designed to
              simplify administration.
            </p>
          </div>
          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="contact-info">
            <h3>Contact Info</h3>
            <p>Email: support@edumanage.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="team">
          <h3>Our Team</h3>
          <p>Meet the team behind EduManage.</p>
          <div className="images">
            <img src="https://via.placeholder.com/100" alt="Team Member 1" />
            <span>Bipin</span>
            <img src="https://via.placeholder.com/100" alt="Team Member 2" />
            <span>Madhav</span>
            <img src="https://via.placeholder.com/100" alt="Team Member 3" />
            <span>sita</span>
            <img src="https://via.placeholder.com/100" alt="Team Member 4" />
            <span>Rahul</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Website;
