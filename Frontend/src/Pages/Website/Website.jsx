import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCircleArrowUp } from "react-icons/fa6";
import "/src/assets/CSS/Pages/Website.css";
import ParticlesComponent from "/src/Components/ParticlesComponent.jsx";

const Website = () => {
  const [showButton, setShowButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login/", credentials);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="website">
      <div className="websiteHeader">
        <ParticlesComponent id="particles" />
        <nav>
          <div className="website-logo">VidyaVyavastha</div>
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
            <li>
              <a href="#cta">Contact</a>
            </li>
          </ul>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="login-btn">Login</button>
                </Link>
                <Link to="/register-school">
                  <button className="register-btn">Register your School</button>
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="hero">
          <h1 className="animate__animated animate__fadeIn">
            Revolutionize School Management with VidyaVyavasta
          </h1>
          <p className="animate__animated animate__fadeIn animate__delay-1s">
            Streamline administration, attendance, grading, and communication in
            one powerful platform.
          </p>
          <div className="cta-buttons animate__animated animate__fadeIn animate__delay-2s">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>

            <Link to="/register-school">
              <button className="register-btn">Register your School</button>
            </Link>
          </div>
        </div>
      </div>

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
            <h3>Gradebook</h3>
            <p>Easily record and analyze student grades.</p>
          </div>
          <div className="card">
            <i className="icon">💬</i>
            <h3>Communication Portal</h3>
            <p>Connect with parents and staff seamlessly.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <img src="/Images/signup.png" alt="Sign Up" />
            <h3>1. Sign Up</h3>
            <p>Register your school and set up your account.</p>
          </div>
          <div className="step">
            <img src="/Images/customize.jpg" alt="Customize" />
            <h3>2. Customize</h3>
            <p>Add students, teachers, and classes to the system.</p>
          </div>
          <div className="step">
            <img src="/Images/manage.jpg" alt="Manage" />
            <h3>3. Manage</h3>
            <p>Start managing attendance, grades, and communication.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <img src="/Images/user1.jpg" alt="User 1" />
            <p>
              "VidyaVyavasta has made our school management so much easier. Highly
              recommended!"
            </p>
            <h4>John Doe, School Principal</h4>
          </div>
          <div className="card">
            <img src="/Images/user2.jpg" alt="User 2" />
            <p>"The communication portal is a game-changer for our school."</p>
            <h4>Jane Smith, Teacher</h4>
          </div>
          <div className="card">
            <img src="/Images/user3.jpg" alt="User 3" />
            <p>"Affordable and easy to use. Perfect for small schools."</p>
            <h4>Mike Johnson, Admin</h4>
          </div>
        </div>
      </section>

      <section id="cta" className="cta">
        <h2>Ready to Transform Your School Management?</h2>
        <p>Join hundreds of schools already using VidyaVyavasta.</p>
        <div className="cta-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/register-school">
            <button className="register-btn">Register your School</button>
          </Link>
        </div>
      </section>

      <div className="footer">
        <div className="footer-content">
          <div className="about">
            <h3>About Us</h3>
            <p>
              VidyaVyavasta is a modern school management system designed to
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
            <p>Email: support@VidyaVyavasta.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>

      {showButton && (
        <FaCircleArrowUp onClick={scrollToTop} className="back-to-top" />
      )}
    </div>
  );
};

export default Website;
