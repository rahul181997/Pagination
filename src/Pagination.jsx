import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    setIsLoading(true); // Set loading state to true
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
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleNext = () => {
    const nextPage = page + 1;
    if (nextPage <= Math.ceil(employees.length / 10)) {
      setPage(nextPage);
    }
  };

  const handlePrevious = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>
        <button>{page}</button>
        <button onClick={handleNext}>Next</button>
      </div>
      {isLoading && <div>Loading...</div>} {/* Add loading indicator */}
    </div>
  );
}

export default Pagination;
