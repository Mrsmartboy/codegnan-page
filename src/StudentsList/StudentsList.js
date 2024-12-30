import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './StudentsList.css';
import { write, utils } from 'xlsx';
import { useStudentsData } from '../contexts/StudentsListContext';
import { saveAs } from 'file-saver';

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const { studentsList, loading, error } = useStudentsData();
  const { book_new, book_append_sheet, json_to_sheet } = utils;
   console.log(studentsList)
  

  const studentsPerPage = 20;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); 
  };

  const exportToExcel = () => {
    const wb = book_new(); 
    const studentsWithoutPassword = studentsList.map(({ password, ...rest }) => rest);
    const ws = json_to_sheet(studentsWithoutPassword); 
    book_append_sheet(wb, ws, 'Students'); 
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' }); 
    saveAs(blob, 'students-list.xlsx'); 
  };
  

  const filteredStudents = (studentsList || []).length > 0
  ? studentsList.filter(student => {
      const studentName = student?.name || ""; 
      const studentId = student?.studentId || "";
      return studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             studentId.toLowerCase().includes(searchQuery.toLowerCase());
    })
  : [];



  const indexOfLastStudent = page * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalStudents = filteredStudents.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <div className='studentslist-dashboard' style={{ marginBottom: "-10px" }}>
     
      <h2 className='success'>Students List ({studentsList.length})</h2>
      <div className='download-container'>
        <button className='download-button excel' onClick={exportToExcel}>Download Excel</button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by studentId or name"
          className='studentslist-search-bar'
        />
      </div>
      <br />
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : error ? (
        <p className='error-message'>Error loading students. Please try again.</p>
      ) : (
        totalStudents > 0 ? (
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>StudentId</th>
                  <th>BatchNO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>College Name</th>
                  <th>Department</th>
                  <th>Graduation Percentage</th>
                  <th>Skills</th>
                  <th>Year of <br /> Passing</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map(student => (
                    <tr key={student.id} className='studentslist-item'>
                      <td>{student.studentId || '__'}</td>
                      <td>{student.BatchNo || '__'}</td>
                      <td>{student.name || '__'}</td>
                      <td>{student.email || '__'}</td>
                      <td>{student.phone || '__'}</td>
                      <td>{student.collegeName || '__'}</td>
                      <td>{student.department || '__'}</td>
                      <td>{student.highestGraduationpercentage 
                      ? `${student.highestGraduationpercentage}%` 
                      : '__'}</td>
                      <td>{student.studentSkills?.length > 0 ? student.studentSkills.join(', ') : 'No skills listed'}</td>
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
        )
      )}
    </div>
  );
}
