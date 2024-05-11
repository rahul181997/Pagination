import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      alert('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(employees.length / 10)) {
      setPage(page + 1);
    }
  };

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const currentPageEmployees = employees.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentPageEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <p>name</p>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNext} disabled={page === Math.ceil(employees.length / 10)}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
