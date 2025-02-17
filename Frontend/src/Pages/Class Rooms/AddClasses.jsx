// import PageTitle from "../../Components/PageTitle";
// import "/src/assets/CSS/Pages/Classes.css";

// const AddClasses = () => {
//   return (
//     <>
//       <div className="add-classes">
//         <div className="formHeader">
//           <h2>Add New Class</h2>
//           <p>Fields Marked * are required.</p>
//         </div>
//         <form action="" id="addClasses">
//           <fieldset>
//             <legend>Class Name*</legend>
//             <input
//               type="text"
//               name="className"
//               id="className"
//               placeholder="Name Of Class"
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Monthly Tuition Fee*</legend>
//             <input
//               type="text"
//               name="tuitionFee"
//               id="tuitionFee"
//               placeholder="Monthly Tuition Fees"
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Class Teacher Name*</legend>
//             <input
//               type="text"
//               name="classTeacherName"
//               id="classTeacherName"
//               placeholder="Name Of Class Teacher"
//             />
//           </fieldset>
//           <div className="formButtons">
//             <button type="reset" className="reset">
//               <i className="fa-solid fa-rotate"></i> Reset
//             </button>
//             <button type="submit" className="submit">
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddClasses;





import { useState } from "react";
import "/src/assets/CSS/Pages/Classes.css";

const AddClasses = () => {
  const [className, setClassName] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [classTeacherName, setClassTeacherName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://127.0.0.1:8000/api/classes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: className,
        tuition_fee: parseFloat(tuitionFee),  // ✅ Convert string to float
        class_teacher: classTeacherName,
      }),
    });
    
  
    if (response.ok) {
      setMessage("Class added successfully!");
      setClassName("");
      setTuitionFee("");
      setClassTeacherName("");
    } else {
      setMessage("Failed to add class. Please try again.");
    }
  };
  

  return (
    <>
      <div className="add-classes">
        {/* <PageTitle title="Add New Class" /> */}
        <div className="formHeader">
          <h2>Add New Class</h2>
          <p>Fields Marked * are required.</p>
        </div>
        {message && <p className="message">{message}</p>}
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
            <legend>Class Teacher Name*</legend>
            <input
              type="text"
              value={classTeacherName}
              onChange={(e) => setClassTeacherName(e.target.value)}
              placeholder="Name Of Class Teacher"
              required
            />
          </fieldset>
          <div className="formButtons">
            <button type="reset" className="reset" onClick={() => { setClassName(""); setTuitionFee(""); setClassTeacherName(""); }}>
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
