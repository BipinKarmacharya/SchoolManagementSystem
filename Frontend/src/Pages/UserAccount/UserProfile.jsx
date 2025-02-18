import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import '/src/assets/CSS/Components/ProfileCard.css';
import { students } from '/src/assets/JSON/StudentsData.js';
import { FaPen } from "react-icons/fa"; // Corrected import

const UserProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    const data = students.find(student => student.id === 1);
    setStudentData(data);
    setEditedData(data);
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  function handleImage(e, type) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'profile') {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@gmail+\.com+$/;
    if (!re.test(email)) {
      setErrors({ ...errors, email: "Invalid email" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    if (!re.test(phone)) {
      setErrors({ ...errors, phone: "Invalid telephone" });
    } else {
      setErrors({ ...errors, phone: "" });
    }
  };

  const verifyChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone") {
      validatePhone(value);
    }
  };

  function handleSave() {
    if (isEditingInfo) {
      setStudentData(editedData);
      setIsEditingInfo(false);
    }
    if (isEditingImages) {
      setIsEditingImages(false);
    }
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }

  return (
    <>
      <div className="profile-card">
        {/* Cover Photo Section */}
        <div className="cover-photo">
          {/* Cover photo content */}
        </div>

        {/* Profile Photo Section */}
        <div className="profile-photo">
          {isEditingImages && (
            <input
              type="file"
              accept="image/*"
              id="fileInputProfile"
              onChange={(e) => handleImage(e, 'profile')}
              style={{ display: "none" }}
            />
          )}
          <label htmlFor="fileInputProfile" className="custom-file-buttonpro"><FaPen /></label>
          {imageSrc ? (
            <img src={imageSrc} alt="Profile Preview" className="proimage-preview" />
          ) : (
            <div className="profile-placeholder">Profile Image</div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="profile-info">
          {isEditingInfo ? (
            <>
              <input
                type="text"
                name="first_name"
                value={editedData.first_name || ''}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="last_name"
                value={editedData.last_name || ''}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={editedData.email || ''}
                onChange={(e) => {
                  handleInputChange(e);
                  verifyChange(e);
                }}
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="text"
                name="address"
                value={editedData.address || ''}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="phone"
                value={editedData.phone || ''}
                onChange={(e) => {
                  handleInputChange(e);
                  verifyChange(e);
                }}
                placeholder="Phone"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </>
          ) : (
            <>
              <h1>{studentData.first_name} {studentData.last_name}</h1>
              <p>{studentData.email}</p>
              <p>{studentData.address}</p>
              <p>{studentData.phone}</p>
            </>
          )}

          {/* Buttons for Edit and Save */}
          <div className="button-container">
            {!isEditingInfo && !isEditingImages && (
              <>
                <button onClick={() => setIsEditingInfo(true)}>Edit Info</button>
                <button onClick={() => setIsEditingImages(true)}>Edit Profile</button>
              </>
            )}
            {(isEditingInfo || isEditingImages) && (
              <button onClick={handleSave}>Save Changes</button>
            )}
          </div>
        </div>

        {/* Change Password Link */}
        <Link to="/Change-Pass">Change Password</Link> 
      </div>

      {/* Popup for "Profile Updated" message */}
      {showPopup && (
        <div className="popup">
          <p>Profile Updated</p>
        </div>
      )}
    </>
  );
};

export default UserProfile;