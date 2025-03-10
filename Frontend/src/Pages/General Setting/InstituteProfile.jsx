import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/src/assets/CSS/Pages/InstituteProfile.css";

const InstituteProfile = () => {
  const [schoolData, setSchoolData] = useState({
    name: "",
    address: "",
    telephone: "",
    email: "",
    website: "",
    logo: null,
    logo_url: "",
    school_code: "bms",
    established_date: "",
    target_line: "",
    total_students: 0,
    total_teachers: 0,
  });

  useEffect(() => {
    // Fetch school data from the backend
    const fetchSchoolData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/school/1/"); // Fetch school with id=1
        setSchoolData(response.data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchSchoolData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({ ...schoolData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSchoolData({ ...schoolData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(schoolData.telephone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    for (const key in schoolData) {
      formData.append(key, schoolData[key]);
    }

    try {
      await axios.put("http://127.0.0.1:8000/api/school/update/1/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="institute-profile">
      <ToastContainer className="addClassToastify"/>
      <div className="formHeader">
        <h2>Update Institute Profile</h2>
        <p>Fields Marked * are required.</p>
      </div>
      <form id="instituteProfileForm" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formBox">
          <div className="sideA">
            <fieldset className="logoFieldset">
              <legend>Institute Logo*</legend>
              <div className="logoDiv">
                {schoolData.logo ? (
                  <img
                    src={URL.createObjectURL(schoolData.logo)}
                    alt="Logo"
                    id="logoImg"
                  />
                ) : (
                  <img
                    src={schoolData.logo_url || "/Images/VIDYA.png"} // Path to your default logo
                    alt="Default Logo"
                    id="logoImg"
                  />
                )}
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>School Code</legend>
              <input
                type="text"
                name="code"
                id="code"
                value={schoolData.school_code}
                // readOnly
              />
            </fieldset>
            <fieldset>
              <legend>Name of Institute*</legend>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Institute Name"
                value={schoolData.name}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Target Line*</legend>
              <input
                type="text"
                name="target_line"
                id="target_line"
                placeholder="Target Line"
                value={schoolData.target_line}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Established Date*</legend>
              <input
                type="date"
                name="established_date"
                id="established_date"
                placeholder="Established Date"
                value={schoolData.established_date}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>

          <div className="sideB">
            <fieldset>
              <legend>Phone Number*</legend>
              <input
                type="tel"
                name="telephone"
                id="telephone"
                placeholder="Phone Number"
                value={schoolData.telephone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid 10-digit phone number.")}
                onInput={(e) => e.target.setCustomValidity("")}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Email*</legend>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={schoolData.email}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Website</legend>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="Website"
                value={schoolData.website}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <legend>Address*</legend>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={schoolData.address}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Total Students*</legend>
              <input
                type="number"
                name="total_students"
                id="total_students"
                placeholder="Total Students"
                value={schoolData.total_students}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Total Teachers*</legend>
              <input
                type="number"
                name="total_teachers"
                id="total_teachers"
                placeholder="Total Teachers"
                value={schoolData.total_teachers}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>
        </div>
        <div className="formButtons">
          <button type="reset" className="reset">
            <i className="fa-solid fa-rotate"></i> Reset
          </button>
          <button type="submit" className="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstituteProfile;