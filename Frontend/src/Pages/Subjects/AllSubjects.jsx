// import { useState, useEffect } from "react";

// const ViewSubjects = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/classes/")
//       .then((res) => res.json())
//       .then((data) => setClasses(data));
//     fetchSubjects();
//   }, []);

//   const fetchSubjects = () => {
//     fetch("http://127.0.0.1:8000/api/subjects/")
//       .then((res) => res.json())
//       .then((data) => setSubjects(data));
//   };

//   return (
//     <div style={{ padding: "16px" }}>
//       <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>View Subjects</h1>
//       <div style={{ marginBottom: "16px" }}>
//         <label>Filter by Class: </label>
//         <select onChange={(e) => setSelectedClass(e.target.value)}>
//           <option value="">All Classes</option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.id}>{cls.name}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         {classes.map((cls) => (
//           (!selectedClass || selectedClass === cls.id) && (
//             <div key={cls.id} style={{ marginBottom: "8px", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}>
//               <h2 style={{ fontWeight: "bold" }}>{cls.name}</h2>
//               {subjects
//                 .filter((sub) => sub.class === cls.id)
//                 .map((sub) => (
//                   <div key={sub.id} style={{ padding: "4px" }}>
//                     <span>{sub.name}</span>
//                   </div>
//                 ))}
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewSubjects;

import { useState, useEffect } from "react";

const ViewSubjects = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/subjects/")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  return (
    <div>
      <h2>All Classes with Subjects</h2>
      {classes.map((cls) => (
        <div key={cls.id} className="class-container">
          <h3>{cls.name}</h3>
          <ul>
            {cls.subjects.map((sub) => (
              <li key={sub.id}>{sub.name} ({sub.code})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewSubjects;
