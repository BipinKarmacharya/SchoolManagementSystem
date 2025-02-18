import "/src/assets/CSS/Components/IDCard.css";
const StudentIDCard = () => {
  return (
    <>
      <div className="id-card student-id">
        <div className="id-header">
          <div className="organization-name">Tech University</div>
          <div className="id-type">Student Identity Card</div>
        </div>

        <div className="photo-container">
          <img
            src="https://via.placeholder.com/100"
            alt="Student Photo"
            className="id-photo"
          />
        </div>

        <div className="id-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">Sarah Johnson</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Student ID:</span>
            <span className="detail-value">ST-2023-045</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Department:</span>
            <span className="detail-value">Computer Science</span>
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

export default StudentIDCard;
