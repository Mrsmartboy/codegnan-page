import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.min.js';  
import { useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const [studentDetails, setStudentDetails] = useState(null);
  const student_id = localStorage.getItem("student_id");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getstudentdetails?student_id=${student_id}`);
        console.log("Profile component", response.data);
        setStudentDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudentDetails();
  }, [student_id]);

  const updateResume = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('student_id', student_id);

    try {
      if (!file) {
        Swal.fire({
          icon: 'error',
          title: 'No File Selected',
          text: 'Please select a file before submitting.',
        });
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/updateresume`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: 'Resume Updated Successfully',
          icon: 'success',
        });
        navigate("/jobslist");
      }
      console.log('Update Resume Response:', response);
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 100 * 1024;

    if (file) {
      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'The uploaded file must be less than 100 KB.',
        });
        e.target.value = '';
      } else {
        setFile(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl m-4">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
              {studentDetails.name ? studentDetails.name.charAt(0).toUpperCase() : '?'}
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">{studentDetails.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl  text-black font-bold">Personal Information</h2>
              <p className="text-black"><span className="font-bold">Age:</span> {studentDetails.age}</p>
              <p className="text-black"><span className="font-bold">City:</span> {studentDetails.city}</p>
              <p className="text-black"><span className="font-bold">State:</span> {studentDetails.state}</p>
              <p className="text-black"><span className="font-bold">Phone Number:</span> {studentDetails.phone}</p>
              <p className="text-black"><span className="font-bold">Github:</span> <a href={studentDetails.githubLink} className="text-blue-500 hover:underline">{studentDetails.githubLink}</a></p>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h2 className="text-xl  text-black font-bold">Academic Information</h2>
              <p className="text-black"><span className="font-bold">College Name:</span> {studentDetails.collegeName}</p>
              <p className="text-black"><span className="font-bold">USN Number:</span> {studentDetails.collegeUSNNumber}</p>
              <p className="text-black"><span className="font-bold">Department:</span> {studentDetails.department}</p>
              <p className="text-black"><span className="font-bold">Qualification:</span> {studentDetails.qualification}</p>
              <p className="text-black"><span className="font-bold">Graduation Percentage:</span> {studentDetails.highestGraduationpercentage}%</p>
              <p className="text-black"><span className="font-bold">Year of Passing:</span> {studentDetails.yearOfPassing}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl  font-bold text-black">Skills</h2>
            <p className="text-black">{studentDetails.studentSkills && studentDetails.studentSkills.join(', ')}</p>
          </div>

          <form encType="multipart/form-data" onSubmit={updateResume} className="mt-6">
            <div className="flex flex-col space-y-2">
              <label className="text-black font-bold">Upload Resume (100KB - pdf):</label>
              <input
                className="block w-52 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4  bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Update Resume
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
