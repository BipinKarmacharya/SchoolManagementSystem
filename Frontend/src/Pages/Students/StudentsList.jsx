import { Link } from "react-router-dom";

import SearchForm from "../../Components/SearchForm";

const StudentsList = () => {
  return (
    <>
      <div className="students-list">
        <SearchForm />

        <section className="data-table">
          <h2>Student List</h2>
          <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Student ID</th>
                <th>Student's Name</th>
                <th>Parent</th>
                <th>Class</th>
                <th>Fee Remaining</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{student.student_id}</td>
                <td>{student.first_name} {student.middle_name} {student.last_name}</td>
                <td>Father</td>
                <td>{student.class}</td>
                <td>$ 4,600</td>
                <td>{student.phone}</td>
                <td><Link to ="/character-certificate">Print TC</Link></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default StudentsList;
