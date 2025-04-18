import "/src/assets/CSS/Components/IDCard.css";
const EIDCard = ({employee}) => {
  return (
    <>
      <div className="id-card employee-id">
        <div className="id-header">
          <div className="organization-name">Tech Corporation</div>
          <div className="id-type">Employee Identity Card</div>
        </div>

        <div className="photo-container">
          <img
            src="https://via.placeholder.com/100"
            alt="Employee Photo"
            className="id-photo"
          />
        </div>

        <div className="id-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{employee.first_name} {employee.middle_name} {employee.last_name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Employee ID:</span>
            <span className="detail-value">{employee.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Position:</span>
            <span className="detail-value">Senior Developer</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Valid Until:</span>
            <span className="detail-value">Indefinite</span>
          </div>
        </div>

        <div className="id-footer">
          <div className="validity">Company property - Must be returned</div>
        </div>
      </div>
    </>
  );
};

export default EIDCard;
