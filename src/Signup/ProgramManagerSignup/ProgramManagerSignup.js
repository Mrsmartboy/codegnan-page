import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './ProgramManagerSignup.css';
import axios from 'axios';
import {useStudentsData} from '../../contexts/StudentsListContext'

export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [email, setEmail] = useState('');
  const [parentNumber, setParentNumber] = useState('');

  const {fetchStudentsData} = useStudentsData()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   const id = studentId.toUpperCase()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`, {studentId:id,batchNo, email,parentNumber });
      console.log("response from studentlogin", response.data);
      if (response.status === 200) {
        await fetchStudentsData()
        
        navigate('/');
        Swal.fire({
                title: "Student Enrolled Successfull",
                icon: "success"
            });
      }
    } catch (error) {
      console.error("Login failed:", error);
      if(error.response.status===404){
        Swal.fire({
          icon: "error",
          title: "User email exists",
        });
        return 
      }
      else if(error.response.status===400){
        Swal.fire({
          icon: "error",
          title: "Invalid data",
        });
        return 
      }
    }
  };
  return (
    <div className="programmanager-container">
      <h1 style={{ color: "black" }} className='font-semibold text-lg lg:text-2xl'>Student Enrollment</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>StudentId</label>
          <input
            type="text" required
            placeholder="StudentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

        </div>
        <div>
          <label>Batch Number</label>
          <input
            type="text" required
            placeholder="Batch Number"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
          />

        </div>
        <div>
          <label>Email address</label>
          <input
            type="email" required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div>
          <label>Parent Mobile Number</label>
          <input
            type="number" required
            placeholder="Parents Number"
            value={parentNumber}
            onChange={(e) => setParentNumber(e.target.value)}
          />
        </div>
        <div className='forgot'>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  )
}
