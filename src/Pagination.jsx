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
        {emps?.map(emp => {
          return (
            <tr key={emp.id}>
              <td align='left'>{emp.id}</td>
              <td align='left'>{emp.name}</td>
              <td align='left'>{emp.email}</td>
              <td align='left'>{emp.role}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Pagination() {
  const [user, setUser] = useState([]);
  const [emplist, setemplist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

  const getApiData = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("failed to fetch data"));
  }

  const filterData = useCallback((min, max) => {
    setemplist(user.filter(val => Number(val.id) >= min && Number(val.id) <= max));
  }, [user]);

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    filterData(1, 10);
  }, [user, filterData]);

  const handleNext = () => {
    if (currentPage < Math.floor(user.length % 10) - 1) {
      setCurrentPage(pre => pre + 1);
      let start = 10 * currentPage + 1;
      let end = 10 * (currentPage + 1);
      filterData(start, end);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(pre => pre - 1);
      let start = (10 * (currentPage - 2)) + 1;
      let end = 10 * (currentPage - 1);
      filterData(start, end);
    }
  }

  return (
    <div className='main'>
      <h1>Employee Data Table</h1>
      <Table emps={emplist} />
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
