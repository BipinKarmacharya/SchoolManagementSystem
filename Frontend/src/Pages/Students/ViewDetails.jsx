import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "/src/assets/CSS/Pages/ViewDetails.css";

const ViewDetails = () => {
  const { id } = useParams(); // Get student ID from URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/studentregister/${id}/`);
        setStudent(response.data);
      } catch (err) {
        setError("Student not found");
      }
    };

    fetchStudent();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!student) return <h2>Loading...</h2>;

  return (
    <div className="view-details">
      <h2>Student Details</h2>
      <div className="student-info">
        <div className="student-photo">
          <img src={student.profile_image} alt={`${student.first_name} ${student.last_name}`} className="profile-img" />
        </div>
        <div className="student-details-info">
          <p><strong>Student ID:</strong> {student.student_id}</p>
          <p><strong>Name:</strong> {student.first_name} {student.middle_name} {student.last_name}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Blood Group:</strong> {student.blood_group}</p>
          <p><strong>Religion:</strong> {student.religion}</p>
          <p><strong>Class:</strong> {student.enroll_class}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;