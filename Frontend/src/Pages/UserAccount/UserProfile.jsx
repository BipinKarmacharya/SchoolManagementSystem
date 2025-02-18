import React, { useEffect, useState } from "react";
import '/src/assets/CSS/Components/ProfileCard.css';
import { students } from '/src/assets/JSON/StudentsData.js';

const UserProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false); 
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [editedData, setEditedData] = useState({});

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

  // Handle input changes for profile info
  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  function handleSave() {
    if (isEditingInfo) {
      setStudentData(editedData); 
      setIsEditingInfo(false); 
    }
    if (isEditingImages) {
   
      setIsEditingImages(false); 
    }
  }

  return (
    <div className="profile-card">
      {/* Cover Photo Section */}
      <div className="cover-photo">
       
      </div>

      {/* Profile Photo Section */}
      <div className="profile-photo">
        {isEditingImages && (
          <input
            type="file"
            accept="image/*"
            id="fileInputProfile"
            onChange={(e) => handleImage(e, 'profile')
            }
            
          />
        )}
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
              onChange={handleInputChange}
              placeholder="Email"
            />
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
              onChange={handleInputChange}
              placeholder="Phone"
            />
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
              <button onClick={() => setIsEditingImages(true)}>Edit Images</button>
            </>
          )}
          {(isEditingInfo || isEditingImages) && (
            <button onClick={handleSave}>Save Changes</button>
          )}
         
        </div>
  
      </div>
      
      <span>Change Password</span>
    </div>
  );
}

export default UserProfile;