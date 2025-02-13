import React from 'react';

const DataTable = ({ data, headers, renderActions }) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.student_id || item.employee_id}>
              <td>{index + 1}</td>
              {Object.keys(item).map((key) => {
                if (key !== 'id' && key !== 'student_id' && key !== 'employee_id') {
                  return <td key={key}>{item[key]}</td>;
                }
                return null;
              })}
              <td>{renderActions(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
