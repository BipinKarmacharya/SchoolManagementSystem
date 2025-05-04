import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/src/assets/CSS/Pages/Classes.css";

const AddClasses = () => {
  const [className, setClassName] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employee/");
        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
        } else {
          console.error("Failed to fetch teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/class/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: className,
        tuition_fee: parseFloat(tuitionFee), // Convert string to float
        class_teacher: selectedTeacher, // Send selected teacher ID
      }),
    });

    if (response.ok) {
      toast.success("Class added successfully!");
      setClassName("");
      setTuitionFee("");
      setSelectedTeacher("");
    } else {
      toast.error("Failed to add class. Please try again.");
    }
  };

  return (
    <>
      <div className="add-classes">
        <ToastContainer className="addClassToastify" />
        <div className="formHeader">
          <h2>Add New Class</h2>
          <p>Fields Marked * are required.</p>
        </div>
        <form onSubmit={handleSubmit} id="addClasses">
          <fieldset>
            <legend>Class Name*</legend>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Name Of Class"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Monthly Tuition Fee*</legend>
            <input
              type="text"
              value={tuitionFee}
              onChange={(e) => setTuitionFee(e.target.value)}
              placeholder="Monthly Tuition Fees"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Class Teacher*</legend>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
            >
              <option value="">Select Class Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.first_name} {teacher.last_name} ({teacher.email})
                </option>
              ))}
            </select>
          </fieldset>
          <div className="formButtons">
            <button
              type="reset"
              className="reset"
              onClick={() => {
                setClassName("");
                setTuitionFee("");
                setSelectedTeacher("");
              }}
            >
              <i className="fa-solid fa-rotate"></i> Reset
            </button>
            <button type="submit" className="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClasses;