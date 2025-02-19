import { useState, useEffect } from "react";

// CSS
import "/src/assets/CSS/Pages/Subjects.css";

const ViewSubjects = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]); // ✅ Default empty array
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/classes/")
      .then((res) => res.json())
      .then((data) => setClasses(Array.isArray(data) ? data : []));

    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    fetch("http://127.0.0.1:8000/api/subjects/")
  .then((res) => res.json())
  .then((data) => {
    console.log("Subjects API Response:", data); // Debugging line

    // Convert object to an array of subjects with a school_class key
    const transformedSubjects = Object.entries(data.subjects_by_class).flatMap(
      ([classId, subjects]) =>
        subjects.map((subject) => ({
          ...subject,
          school_class: parseInt(classId), // Add class ID to each subject
        }))
    );

    setSubjects(transformedSubjects);
  })
  .catch((error) => {
    console.error("Error fetching subjects:", error);
    setSubjects([]);
  });

  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>View Subjects</h1>
      <div className="subjectFilter">
        <label>Filter by Class: </label>
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div className="all-subjects">
        {classes.map((cls) => (
          (!selectedClass || selectedClass == cls.id) && (
            <div key={cls.id} className="subject-container">
              <h2 style={{ fontWeight: "bold" }}>Class {cls.name}</h2>
              {Array.isArray(subjects) && subjects.length > 0 ? ( // ✅ Safe check before .filter()
                subjects
                  .filter((sub) => sub.school_class === cls.id)
                  .map((sub) => (
                    <div key={sub.id} style={{ padding: "4px" }}>
                      <h4>{sub.name}</h4> (Full Marks: {sub.full_marks}, Pass Marks: {sub.pass_marks})
                    </div>
                  ))
              ) : (
                <p>No subjects available</p> // ✅ Show message if no subjects found
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ViewSubjects;
