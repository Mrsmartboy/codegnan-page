import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './ProgramManagerSignup.css';
import axios from 'axios';
export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [parentNumber, setParentNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/`, { username, password, parentNumber });
      console.log("response from studentlogin", response.data);
      if (response.status === 200) {
        navigate('/');
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
      <h1 style={{ color: "black" }}>Student Enrollment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email address</label>
          <input
            type="email" required
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>
        <div>
          <label>Password</label>
          <input
            type="password" required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Parent Mobile Number</label>
          <input
            type="text" required
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
