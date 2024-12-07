import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentProfile.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const [studentDetails, setStudentDetails] = useState(null);
  const student_id = localStorage.getItem("student_id");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getstudentdetails?student_id=${student_id}`);
        console.log("profile component", response.data);
        setStudentDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudentDetails();
  }, [student_id]);

  const updateResume = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('student_id', student_id);
    console.log(formData)
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/updateresume`,
        {resume:file,student_id},
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
          }
        }
      );
      if(response.status===200){
        Swal.fire({
          title: "Resume Updated Successfully",
          icon: "success"
      });
        navigate("/jobslist")
      } 
      console.log('Update Resume Response:', response);
      // Optionally, update UI or state after successful update

    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 100 * 1024; // 100 KB

    if (file) {
        if (file.size > maxSize) {
            Swal.fire({
                icon: 'error',
                title: 'File Too Large',
                text: 'The uploaded file must be less than 100 KB.',
            });
            e.target.value = ''; // Clear the input
        } else {
            setFile(file);
        }
    }
};

  return (
    <div className='studentprofile-container'>
      {/* Display student details here */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=''>
          <p><span className="student-profile-key">Name:</span>{studentDetails.name}</p>
          <p><span className="student-profile-key">Email:</span>{studentDetails.email}</p>
          <p><span className="student-profile-key">College Name:</span>{studentDetails.collegeName}</p>
          <p><span className="student-profile-key">Phone Number:</span>{studentDetails.phone}</p>
          
          <form encType="multipart/form-data" onSubmit={updateResume}>
            <div className="file-upload-container">
              <input className='file-upload' type="file" onChange={handleFileChange} />
              <span style={{ color: 'red' }}>*</span>
              <p>
              <button className='btn-update' type="submit">Update resume</button>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}