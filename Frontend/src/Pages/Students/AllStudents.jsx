import React, { useState, useEffect } from "react";
import "/src/assets/CSS/Pages/Students.css";
import SearchForm from "/src/Components/SearchForm";
import Profile from "/src/Components/Profile";
import axios from "axios";
import useDebounce from "/src/assets/hooks/useDebounce";

const groupByClass = (students) => {
  return students.reduce((acc, student) => {
    (acc[student.enroll_class] = acc[student.enroll_class] || []).push(student);
    return acc;
  }, {});
};

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    let isMounted = true;

    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/class/");
        if (isMounted) {
          setClasses(response.data);
        }
      } catch (error) {
        if (isMounted) setError(error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/student/");
        if (Array.isArray(response.data) && isMounted) {
          setStudents(response.data);
        } else {
          setStudents([]); // Fallback to empty array
          setError("Invalid data format");
        }
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClasses();
    fetchStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getClassName = (classId) => {
    const classData = classes.find((cls) => cls.id.toString() === classId.toString());
    return classData ? classData.name : "Unknown Class";
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.middle_name ? student.middle_name + " " : ""}${student.last_name}`.toLowerCase();
    const studentId = student.student_id.toLowerCase();

    const matchesSearch =
      debouncedSearchTerm === "" ||
      fullName.includes(debouncedSearchTerm.toLowerCase()) ||
      studentId.includes(debouncedSearchTerm.toLowerCase());

    const matchesClass = selectedClass === "" || student.enroll_class.toString() === selectedClass;

    return matchesSearch && matchesClass;
  });

  const studentsByClass = groupByClass(filteredStudents);

  const classOptions = [...new Set(students.map((s) => s.enroll_class))].sort((a, b) => a - b);

  return (
    <div className="all-students">
      <SearchForm
        searchPlaceholder="Search Student (Name or ID)"
        options={classOptions.map((c) => ({ value: c.toString(), label: `Class ${getClassName(c)}` }))}
        optionLabel="View Students By Class"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSelectChange={(e) => setSelectedClass(e.target.value)}
      />
      <div className="all-students-container">
        {Object.keys(studentsByClass).sort((a, b) => a - b).map((enroll_class) => (
          <div key={enroll_class} className="class-section">
            <div className="classInfo">
              <h2>Class {getClassName(enroll_class)}</h2>
            </div>
            <div className="allStudentsData">
              {studentsByClass[enroll_class].map((student) => (
                <Profile key={student.student_id} person={student} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;





// import React, { useState, useEffect } from "react";
// import "/src/assets/CSS/Pages/Students.css";
// import SearchForm from "/src/Components/SearchForm";
// import Profile from "/src/Components/Profile";
// import axios from "axios";
// import useDebounce from "/src/assets/hooks/useDebounce"; // Import debounce hook

// // Function to group students by class
// const groupByClass = (students) => {
//   return students.reduce((acc, student) => {
//     (acc[student.enroll_class] = acc[student.enroll_class] || []).push(student);
//     return acc;
//   }, {});
// };

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]); // Store classes with their names
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); // Search state
//   const [selectedClass, setSelectedClass] = useState(""); // Class filter
//   const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounced search

//   // Fetch students and classes from API
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/class/");
//         console.log('Fetched Classes:', response.data); // Debugging line
//         setClasses(response.data); // Assuming the response contains an array of classes
//       } catch (error) {
//         setError(error);
//       }
//     };

//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/student/");
//         setStudents(response.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//     fetchStudents();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Map class ID to class name
//   const getClassName = (classId) => {
//     const classData = classes.find((cls) => cls.id.toString() === classId.toString()); // Convert both IDs to strings for comparison
//     console.log("getClassName Debug:", classId, classData); // Debugging line
//     return classData ? classData.name : "Unknown Class"; // If class found, return name, otherwise "Unknown Class"
//   };

//   // Filter students based on search (name & student ID) and class selection
//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.first_name} ${student.middle_name ? student.middle_name + " " : ""}${student.last_name}`.toLowerCase();
//     const studentId = student.student_id.toLowerCase();

//     const matchesSearch =
//       debouncedSearchTerm === "" ||
//       fullName.includes(debouncedSearchTerm.toLowerCase()) ||
//       studentId.includes(debouncedSearchTerm.toLowerCase()); // ✅ Search by student ID

//     const matchesClass = selectedClass === "" || student.enroll_class.toString() === selectedClass;

//     return matchesSearch && matchesClass;
//   });

//   // Group filtered students by class
//   const studentsByClass = groupByClass(filteredStudents);

//   // Get unique class options for the dropdown
//   const classOptions = [...new Set(students.map((s) => s.enroll_class))].sort((a, b) => a - b);

//   return (
//     <div className="all-students">
//       <SearchForm
//         searchPlaceholder="Search Student (Name or ID)"
//         options={classOptions.map((c) => ({ value: c.toString(), label: `Class ${getClassName(c)}` }))}
//         optionLabel="View Students By Class"
//         onSearchChange={(e) => setSearchTerm(e.target.value)}
//         onSelectChange={(e) => setSelectedClass(e.target.value)}
//       />
//       <div className="all-students-container">
//         {Object.keys(studentsByClass).sort((a, b) => a - b).map((enroll_class) => (
//           <div key={enroll_class} className="class-section">
//             <div className="classInfo">
//               <h2>Class {getClassName(enroll_class)}</h2> {/* Show class name */}
//             </div>
//             <div className="allStudentsData">
//               {studentsByClass[enroll_class].map((student) => (
//                 <Profile key={student.student_id} person={student} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllStudents;
