import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [date, setDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]); // State to store class names
  const [isFormValid, setIsFormValid] = useState(false);

  // Fetch class names from the database
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/classes/");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    checkFormValidity(e.target.value, selectedClass);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    checkFormValidity(date, e.target.value);
  };

  const checkFormValidity = (date, selectedClass) => {
    setIsFormValid(date && selectedClass !== "");
  };

  return (
    <form id="attendanceSearchForm">
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="inputDate"
        required
      />
      <select
        name="selectOption"
        id="selectOption"
        value={selectedClass}
        onChange={handleClassChange}
        required
      >
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>

      <Link to={isFormValid ? `/admin-dashboard/attendance?enroll_class=${selectedClass}` : "#"} id="search">
        <button type="button" disabled={!isFormValid}>
          Search
        </button>
      </Link>
    </form>
  );
};

export default Search;