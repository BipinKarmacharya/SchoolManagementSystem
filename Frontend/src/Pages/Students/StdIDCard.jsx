import "/src/assets/CSS/Components/IDCard.css";
const StdIDCard = ({ student }) => {
  return (
    <>
      <div className="id-card student-id">
        <div className="id-header">
          <div className="organization-name">Tech University</div>
          <div className="id-type">Student Identity Card</div>
        </div>

        <div className="photo-container">
          <img
            src={student.profile_image}
            alt="Student Photo"
            className="id-photo"
          />
        </div>

        <div className="id-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{student.first_name} {student.middle_name} {student.last_name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Student ID:</span>
            <span className="detail-value">{student.student_id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Class:</span>
            <span className="detail-value">{student.enroll_class}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Valid Until:</span>
            <span className="detail-value">2025-06-30</span>
          </div>
        </div>

        <div className="id-footer">
          <div className="validity">Valid with university stamp</div>
        </div>
      </div>
    </>
  );
};

export default StdIDCard;