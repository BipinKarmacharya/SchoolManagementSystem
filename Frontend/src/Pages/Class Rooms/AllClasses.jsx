import React, { useEffect, useState } from "react";
import "/src/assets/CSS/Pages/Classes.css";
import { TbEdit, TbTrashX } from "react-icons/tb";
import { FaUserGraduate, FaBook } from "react-icons/fa";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/classes/");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="allClasses">
      {classes.map((cls) => (
        <div className="class" key={cls.id}>
          <div className="classTitle">
            <h3>Class {cls.name}</h3>
            <div className="classIcons">
              <TbEdit />
              <TbTrashX id="delete" />
            </div>
          </div>
          <div className="classDetails">
            <div className="totalStudents">
              <h2>{cls.total_students || 0}</h2>
              <h5>Students</h5>
              <FaUserGraduate className="stdIcon" />
            </div>
            <div className="totalSubjects">
              <h2>{cls.subject_count || 0}</h2>
              <h5>Subjects</h5>
              <FaBook className="subjectIcon" />
            </div>
          </div>
        </div>
      ))}

      <div className="class addNew" id="addNewClass">
        <div>
          <i className="bx bx-plus addNewIcon"></i>
          <p>Add New</p>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;




// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import "/src/assets/CSS/Pages/Classes.css";
// import { TbEdit, TbTrashX } from "react-icons/tb";
// import { FaUserGraduate } from "react-icons/fa";

// const AllClasses = () => {
//   const [classes, setClasses] = useState([]);  // ✅ Store classes

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/classes/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch classes");
//         }
//         const data = await response.json();
//         setClasses(data);  // ✅ Update state with fetched data
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   return (
//     <div className="allClasses">
//       {classes.map((cls) => (
//         <div className="class" key={cls.id}>
//           <div className="classTitle">
//             <h4>Class {cls.name}</h4>
//             <div className="classIcons">
//               <TbEdit />
//               <TbTrashX id="delete" />
//             </div>
//           </div>
//           <div className="classDetails">
//             <div className="totalStudents">
//               <h2>{cls.total_students || 0}</h2>
//               <p>Students</p>
//               <FaUserGraduate className="stdIcon" />
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="class addNew" id="addNewClass">
//         <div>
//           <Link to="/admin-dashboard/add-classes">
//             <p>Add New</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllClasses;
