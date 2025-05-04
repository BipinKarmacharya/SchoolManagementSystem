import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/assets/CSS/Components/Header.css";

// Import Icons
import { MdOutlineLogout } from "react-icons/md";
import { LuUserRoundCog } from "react-icons/lu";
import { HiMenuAlt1 } from "react-icons/hi";

const Header = ({ toggleSidebar }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [schoolDetails, setSchoolDetails] = useState({
    schoolName: "Institute Name",
    address: "Address of Institute",
    targetLine: "Target Line of Institute",
  });
  const navigate = useNavigate();

  const toggleCard = () => {
    setIsCardVisible(!isCardVisible);
  };

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token

        if (!token) {
          console.warn("No token found. Redirecting...");
          navigate("/login"); // or to /login
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/school/me/", {
            headers: {
              Authorization: `Bearer ${token}`
            },
        });

        const userDetails = response.data;
        setSchoolDetails({
          schoolName: userDetails.school.name,
          address: userDetails.school.address,
          targetLine: userDetails.school.target_line,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Clear authentication tokens from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("school_id");

    // Redirect to the landing page
    navigate("/");
  };

  return (
    <div className="header-container">
      <header className="navHeader">
        <div className="instituteLogo">
          <img src="/Images/VIDYA-white.png" alt="Logo" id="instituteLogo" />
        </div>
        <HiMenuAlt1 id="menuIcon" onClick={toggleSidebar} />
        <div className="schoolDetails">
          <span className="schoolName">{schoolDetails.schoolName}</span>
          <span className="schoolAddress">{schoolDetails.address}</span>
          <span className="targetLine">{schoolDetails.targetLine}</span>
        </div>
        <div className="navImg">
          <img
            src="/Images/VIDYA-white.png"
            alt="User Profile"
            id="userProfile"
            onClick={toggleCard}
          />
        </div>
      </header>

      {/* Dropdown Card */}
      <div className={`dropdown ${isCardVisible ? "active" : ""}`}>
        <ul>
          <Link to="/profile-setting">
            <li>
              Profile <LuUserRoundCog className="dropdownIcon" />
            </li>
          </Link>
          <li onClick={handleLogout}>
            Logout <MdOutlineLogout className="dropdownIcon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;