import { useState, useEffect } from "react";

const AddSubjects = () => {
  const [classes, setClasses] = useState([]); // Store class list
  const [teachers, setTeachers] = useState([]); // Store teacher list
  const [selectedClass, setSelectedClass] = useState(""); // Selected class ID
  const [subjectName, setSubjectName] = useState("");
  const [fullMarks, setFullMarks] = useState("");
  const [passMarks, setPassMarks] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [message, setMessage] = useState("");

  // Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/class/");
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

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

    fetchClasses();
    fetchTeachers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/subject/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_class: selectedClass, // Send class ID
        name: subjectName,
        full_marks: parseInt(fullMarks), // Convert to integer
        pass_marks: parseInt(passMarks), // Convert to integer
        subject_teacher: selectedTeacher, // Send teacher ID
      }),
    });

    if (response.ok) {
      setMessage("Subject added successfully!");
      setSubjectName("");
      setFullMarks("");
      setPassMarks("");
      setSelectedTeacher("");
      setSelectedClass("");
    } else {
      setMessage("Failed to add subject.");
    }
  };

  return (
    <div className="add-subjects">
      <div className="formHeader">
        <h2>Add New Subject</h2>
        <p>Fields Marked * are required.</p>
      </div>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} id="addSubjects">
        <fieldset>
          <legend>Select Class*</legend>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Subject Name*</legend>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Name Of Subject"
            required
          />
        </fieldset>

        <fieldset>
          <legend>Full Marks*</legend>
          <input
            type="number"
            value={fullMarks}
            onChange={(e) => setFullMarks(e.target.value)}
            placeholder="Enter Full Marks"
            required
          />
        </fieldset>

        <fieldset>
          <legend>Pass Marks*</legend>
          <input
            type="number"
            value={passMarks}
            onChange={(e) => setPassMarks(e.target.value)}
            placeholder="Enter Pass Marks"
            required
          />
        </fieldset>

        <fieldset>
          <legend>Select Subject Teacher*</legend>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name} ({teacher.email})
              </option>
            ))}
          </select>
        </fieldset>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddSubjects;
