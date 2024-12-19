import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './StudentsList.css';
import axios from 'axios'
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentsPerPage = 20;

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/allstudents`);
        setStudentsList(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  
  



  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); 
  };


      const exportToExcel =()=>{
        const wb = XLSX.utils.book_new();

            const studentsWithoutPassword = studentsList.map(student => {
              const { password, ...studentWithoutPassword } = student; // Destructure and remove 'password'
              return studentWithoutPassword;
            });
              
        const ws = XLSX.utils.json_to_sheet(studentsWithoutPassword);
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
     
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
        saveAs(blob, 'students-list.xlsx');
    
      }
      const filteredStudents = (studentsList || []).length > 0
      ? studentsList.filter(student => {
          const studentName = student?.name || ""; // Safely access 'name', fallback to empty string
          return studentName.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : [];
    

  const indexOfLastStudent = page * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalStudents = filteredStudents.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  console.log(studentsList)

  return (
    <div className='studentslist-dashboard' style={{marginBottom:"-10px"}}>
      <h2 className='success'>Students List ({studentsList.length})</h2>
      <div className='download-container'>
      <button className='download-button excel' onClick={exportToExcel}>Download Excel</button>

   
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by student name..."
        className='studentslist-search-bar'
      />
     
     
      <br/>
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : (
        <>
          {totalStudents > 0 ? (
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>College Name</th>
                    <th>Department</th>
                    <th>Graduation CGPA</th>
                    <th>Skills</th>
                    <th>Year of <br/>Passing</th>
                  </tr>
                </thead>
                <tbody>
                          {currentStudents.length > 0 ? (
            currentStudents.map(student => (
              <tr key={student.id} className='studentslist-item'>
                <td>{student.name || '__'}</td>
                <td>{student.email}</td>
                <td>{student.phone || '__'}</td>
                <td>{student.collegeName || '__'}</td>
                <td>{student.department || '__'}</td>
                <td>{student.highestGraduationCGPA || '__'}</td>
                <td>{student.studentSkills && student.studentSkills.length > 0 ? student.studentSkills.join(', ') : 'No skills listed'}</td>
                <td>{student.yearOfPassing || '__'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No students found</td>
            </tr>
          )}
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className='pagination'>
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          ) : (
            <p className='no-results'>No students found.</p>
          )}
        </>
      )}
    </div>
    </div>
  );
}
