import React, { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import './BDEStudentsAppliedJobsList.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import MultipleSelect from './MultipleSelect'; 
import SkillsSelect from './SkillsSelect'; 
const BDEStudentsAppliedJobsList = () => {
  const { jobId } = useParams();
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeName, setResumeName] = useState('');
  const [excelName, setExcelName] = useState('');
  const [jobSkills, setJobSkills] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCGPA, setSelectedCGPA] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const fetchAppliedStudents = useCallback( async () => {
    try {
      const resumeNameResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getjobdetails?job_id=${jobId}`);
      const { companyName, jobRole } = resumeNameResponse.data;
      setExcelName(`${companyName}_${jobRole}`);
      setResumeName(`resumes_${companyName}_${jobRole}`);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getappliedstudentslist?job_id=${jobId}`);
      setAppliedStudents(response.data.students_applied);
      setJobSkills(response.data.jobSkills);
      setSelectedStudents(response.data.selected_students_ids);
      setRejectedStudents(response.data.rejected_students_ids);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  },[jobId]);
  useEffect(() => {
    fetchAppliedStudents();
  }, [fetchAppliedStudents]);
  const handleDepartmentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDepartments(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSkillChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const filteredStudents = appliedStudents.filter(student => {
    let departmentMatch = true;
    let cgpaMatch = true;
    let skillMatch = true;

    if (selectedDepartments.length > 0 && !selectedDepartments.includes(student.department)) {
      departmentMatch = false;
    }

    if (selectedCGPA && parseFloat(student.highestGraduationCGPA) < parseFloat(selectedCGPA)) {
      cgpaMatch = false;
    }

    if (selectedSkills.length > 0 && !selectedSkills.some(skill => student.studentSkills?.includes(skill))) {
      skillMatch = false;
    }

    return departmentMatch && cgpaMatch && skillMatch;
  });
  const downloadResume = async () => {
    try {
      const selectedStudentIds = filteredStudents.map(student => student.student_id);
      const loadingSwal = Swal.fire({
        title: 'Downloading Resumes',
        html: 'Please wait...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/downloadresume`, {
        student_ids: selectedStudentIds
      }, {
        responseType: 'blob'
      });
      loadingSwal.close();
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resumeName}.zip`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to download resumes. Please check the selected list',
      });
    }
  };
  const downloadExcel = () => {
    // Map over filteredStudents to convert the studentSkills array into a string
    const formattedStudents = filteredStudents.map(student => ({
      ...student,
      studentSkills: student.studentSkills.join(', '), // Join skills array into a comma-separated string
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedStudents);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, `${excelName}.xlsx`);
  };
  const acceptSelectedStudents = async () => {
    const result = await Swal.fire({
      title: 'Confirm Acceptance',
      text: 'Are you sure you want to reject the remaining students?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
    });
    if (result.isConfirmed) {
      try {
        const selectedStudentIds = filteredStudents.map(student => student.student_id);
        if (selectedStudentIds.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No students selected. Please check the selected list',
          });
          return;
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/updatejobapplicants`, {
          selected_student_ids: selectedStudentIds, job_id: jobId
        });
        if (response.status === 200) {
          Swal.fire({
            title: "Accepted these selected students",
            icon: "success"
          });
          fetchAppliedStudents();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to accept selected students',
        });
      }
    }
  };
  return (
    <div className='students-jobs-list'>
      <h2 style={{ textAlign: 'center' }}>
        Students Applied for Job
        <div className='btn-parent'>
          <button className='btn-excel' onClick={downloadExcel}>Download Excel</button>
          <button className='resume-download' onClick={downloadResume}>Get the Resumes</button>
          <button onClick={acceptSelectedStudents} className='btn-accept-job-students'>Accept the selected students</button>
        </div>
      </h2>
      <div className='filter-list'>
        <MultipleSelect
          selectedDepartments={selectedDepartments}
          handleChange={handleDepartmentChange}
        />
        <div>
          <select
            className='cgpa'
            value={selectedCGPA}
            onChange={(e) => setSelectedCGPA(e.target.value)}
          >
            <option value="">Minimum CGPA</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <SkillsSelect
          jobSkills={jobSkills}
          selectedSkills={selectedSkills}
          handleChange={handleSkillChange}
        />
      </div>
      <table>
        {console.log("filtered students", filteredStudents)}
        <thead>
          <tr>
            <th style={{ color: "white" }}>Applied Students  ({filteredStudents.length})</th>
            <th style={{ color: "white" }}>Selected Students
              ({filteredStudents.length > 0 ? selectedStudents.length : null})</th>
            <th style={{ color: "white" }}>Rejected Students
              ({filteredStudents.length > 0 ? rejectedStudents.length : null})</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ?
              (<tr><td colSpan="3">Loading...</td></tr>) :
              (
                filteredStudents.length > 0 ?
                  (
                    filteredStudents.map(student => (
                      <tr key={student.student_id}>
                        <td>
                          {student.name}<br />
                          {student.email}
                        </td>
                        <td>{selectedStudents.includes(student.student_id) ? 'Selected' : ''}</td>
                        <td>{rejectedStudents.includes(student.student_id) ? 'Rejected' : ''}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No students have applied for this job.</td>
                    </tr>
                  )
              )
          }
        </tbody>
      </table>
    </div>
  );
};
export default BDEStudentsAppliedJobsList;