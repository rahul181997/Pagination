// Pagination.jsx
import React, { useState, useEffect, useCallback } from 'react';
import "./Pagination.css";

function Table({ emps }) {
  return (
    <table>
      <thead>
        <tr>
          <th align='left'>ID</th>
          <th align='left'>Name</th>
          <th align='left'>Email</th>
          <th align='left'>Role</th>
        </tr>
      </thead>
      <tbody>
        {emps?.map(emp => (
          <tr key={emp.id}>
            <td align='left'>{emp.id}</td>
            <td align='left'>{emp.name}</td>
            <td align='left'>{emp.email}</td>
            <td align='left'>{emp.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pagination() {
  const [user, setUser] = useState([]);
  const [emplist, setemplist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const paginateData = useCallback(() => {
    const start = (currentPage - 1) * 10;
    const end = currentPage * 10;
    setemplist(user.slice(start, end));
  }, [currentPage, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    paginateData();
  }, [paginateData]);

  const handleNext = () => {
    if (currentPage < Math.ceil(user.length / 10)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main'>
      <h1>Employee Data Table</h1>
      <Table emps={emplist} />
      <div className='pagination-container'>
        <button onClick={handlePrevious}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
