import React, { useState, useEffect } from "react";

const EditClass = ({ classData, onClose }) => {
  const [className, setClassName] = useState(classData.name);
  const [tuitionFee, setTuitionFee] = useState(classData.tuition_fee);
  const [classTeacher, setClassTeacher] = useState(classData.class_teacher);
  const [teachers, setTeachers] = useState([]); // Store teacher list

  // Fetch teachers from database
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employee/");
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/class/${classData.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: className,
          tuition_fee: tuitionFee,
          class_teacher: classTeacher, // Send selected teacher ID
        }),
      });

      if (response.ok) {
        alert("Class updated successfully!");
        onClose(); // Close modal after update
      } else {
        const errorData = await response.json();
        alert("Failed to update class: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Error updating class: " + error.message);
    }
  };

  return (
    <div className="edit-modal">
      <div className="modal-content">
        <h2>Edit Class</h2>
        <form onSubmit={handleSubmit}>
          <label>Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <label>Tuition Fee</label>
          <input
            type="number"
            value={tuitionFee}
            onChange={(e) => setTuitionFee(e.target.value)}
          />

          <label>Class Teacher</label>
          <select value={classTeacher} onChange={(e) => setClassTeacher(e.target.value)}>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.user.first_name} {teacher.user.last_name} {/* Display teacher's name */}
              </option>
            ))}
          </select>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClass;
