import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
// import CartoonLogo from '../images/login-cartoon.webp';
import  './StudentLogin.css'
import Swal from 'sweetalert2/dist/sweetalert2.min.js';  



export default function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  const id = username.toUpperCase()
  console.log(id)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/studentlogin`,
        { username:id, password }
      );
      console.log('Response from student login:', response.data);
      if (response.status === 200) {
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('email',response.data.student_email)
        localStorage.setItem('student_id', response.data.student_id);
        navigate('/');
         Swal.fire({
                        title: "Login Successfull ",
                        icon: "success"
                    });
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response?.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login failed. User not found',
        });
      } else if (error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'An unexpected error occurred',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex row items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 student-login-container" >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex  justify-center items-center w-full md:w-1/2">
          <img src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849448/login-cartoon_znh33j.webp" alt="Cartoon logo" className="w-full max-w-lg" />
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">Student Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="studentId" className="block text-sm  font-medium text-black mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="studentId"
                  className="block w-full p-1 text-lg border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter Your StudentId"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="block w-full p-1 text-lg border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link to="/forgotPassword" className="text-sm text-[#0737EE] font-semibold  hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1 px-4 mt-0 text-2xl font-medium text-white bg-[#0737EE] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 space-y-1">
                Don&apos;t Have an Account?{' '}
                <Link to="/signup" className="font-semibold text-[#0737EE] ">
                  Signup Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


