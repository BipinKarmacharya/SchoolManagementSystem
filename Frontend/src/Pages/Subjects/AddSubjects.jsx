import { useState, useEffect } from "react";

const AddSubjects = () => {
  const [classes, setClasses] = useState([]); // Store class list
  const [selectedClass, setSelectedClass] = useState(""); // Selected class ID
  const [subjectName, setSubjectName] = useState("");
  const [fullMarks, setFullMarks] = useState("");
  const [passMarks, setPassMarks] = useState("");
  const [subjectTeacher, setSubjectTeacher] = useState("");
  const [message, setMessage] = useState("");

  // Fetch available classes when the component loads
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/classes/");
        if (response.ok) {
          const data = await response.json();
          setClasses(data); // Store classes
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/subjects/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_class: selectedClass, // Send class ID
        name: subjectName,
        full_marks: parseInt(fullMarks), // Convert to integer
        pass_marks: parseInt(passMarks), // Convert to integer
        subject_teacher: subjectTeacher,
      }),
    });

    if (response.ok) {
      setMessage("Subject added successfully!");
      setSubjectName("");
      setFullMarks("");
      setPassMarks("");
      setSubjectTeacher("");
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
          <legend>Subject Teacher*</legend>
          <input
            type="text"
            value={subjectTeacher}
            onChange={(e) => setSubjectTeacher(e.target.value)}
            placeholder="Class Teacher Name"
            required
          />
        </fieldset>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddSubjects;
