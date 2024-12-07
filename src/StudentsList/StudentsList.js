import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './StudentsList.css';
import axios from 'axios'
import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';

import { saveAs } from 'file-saver';

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
 // const [resumeLoading,setResumeLoading] = useState(false)

  const studentsPerPage = 20;

  // api/v1/downloadresumes

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/allstudents`);
        // console.log(response.data)
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
    setPage(1); // Reset page to 1 when search query changes
  };

      // function to export data to Excel

      const exportToExcel =()=>{
        const wb = XLSX.utils.book_new();

          // Remove the 'password' field from each student in the studentsList
            const studentsWithoutPassword = studentsList.map(student => {
              const { password, ...studentWithoutPassword } = student; // Destructure and remove 'password'
              return studentWithoutPassword;
            });
              
        // convert data students to worksheet 
        const ws = XLSX.utils.json_to_sheet(studentsWithoutPassword);
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
     
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
        //  download
        saveAs(blob, 'students-list.xlsx');
    
      }

      // function and fetching to download all resumes 

      // const downloadAllResumes = async () => {
      //   try {
      //     setResumeLoading(true);
          
      //     const loadingSwal = Swal.fire({
      //       title: 'Downloading All Resumes',
      //       text: 'Please wait...',
      //       allowOutsideClick: false,
      //       didOpen: () => {
      //         Swal.showLoading();
      //       }
      //     });
      
      //     // Make a request to the backend to download all resumes as a .zip file
      //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/allresumes`, {
      //       responseType: 'blob', 
      //     });
      
      //     loadingSwal.close();
      
      //     // Log the response data to inspect
      //     console.log(response);  // This shows the Blob size and type
      
      //     if (response.data instanceof Blob && response.data.size > 0) {
      //       const blob = new Blob([response.data]);
      
      //       const url = window.URL.createObjectURL(blob);
      
      //       const link = document.createElement('a');
      //       link.href = url;
      //       link.setAttribute('download', 'all_resumes.zip');  // Set the filename
      
      //       document.body.appendChild(link);
      //       link.click();
            
      //       window.URL.revokeObjectURL(url);
      //       document.body.removeChild(link);
      
      //     } else {
      //       throw new Error('Received invalid file data or an empty response.');
      //     }
      //   } catch (error) {
      //     console.error('Download error:', error);
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Error',
      //       text: error.response ? error.response.data : 'Failed to download all resumes. Please try again later.',
      //     });
      //   } finally {
      //     setResumeLoading(false);
      //   }
      // };
      
     
  // Filter students by name based on search query
  const filteredStudents = studentsList.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const indexOfLastStudent = page * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalStudents = filteredStudents.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <div className='studentslist-dashboard' style={{marginBottom:"-10px"}}>
      <h2 className='success'>Students List ({studentsList.length})</h2>
      <div className='download-container'>
      <button className='download-button excel' onClick={exportToExcel}>Download Excel</button>

     {/* <button className='download-button resume' onClick={downloadAllResumes}  
      disabled={resumeLoading}>
      {resumeLoading ? 'Downloading...' : 'Get the Resumes'}
      </button>  */}
      </div>
      {/* Search bar */}
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by student name..."
        className='studentslist-search-bar'
      />
     
     
      <br/>
      {/* Loading message */}
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : (
        <>
          {/* Student list */}
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
                  {currentStudents.map(student => (
                    <tr key={student.id} className='studentslist-item'>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.collegeName}</td>
                      <td>{student.department}</td>
                      <td>{student.highestGraduationCGPA}</td>
                      <td>{student.studentSkills.join(', ')}</td>
                      <td>{student.yearOfPassing}</td>
                    </tr>
                  ))}
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
  );
}
