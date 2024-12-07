import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import CartoonLogo from '../images/login-cartoon.webp';
import '../Login/StudentLogin.css'; 

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/adminlogin`,
        { username, password }
      );
      console.log('Response from admin login:', response.data);
      if (response.status === 200) {
        localStorage.setItem('userType', response.data.userType);
        navigate('/studentslist'); // Navigate to students list
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
    <div className="student-login-container">
      <div className="cartoon-image-container">
        <img src={CartoonLogo} alt="Admin Cartoon Logo" className="cartoon-image" />
      </div>
      <div className="student-login-container-1">
        <div className="student-login-form">
          <h2 className="student-login-form-title">Admin Login</h2>
          <form onSubmit={handleSubmit} className="student-login-form-form">
            <div className="student-login-form-input-group">
              <label htmlFor="email" className="student-login-form-label">
                Username/Email ID
              </label>
              <input
                type="email"
                id="email"
                className="student-login-form-input"
                placeholder="Enter Your Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="student-login-form-input-group">
              <label htmlFor="password" className="student-login-form-label">
                Password
              </label>
              <div className="student-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="student-login-form-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="student-login-form-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} className="student-eye-icon" /> : <EyeOff size={20} className="student-eye-off-icon" />}
                </button>
              </div>
              <div className="student-login-form-remember-forgot">
                <Link to="/forgotPassword" className="student-login-form-forgot-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button type="submit" className="student-login-form-submit">
              Login
            </button>

            <p className="student-login-form-register">
              Don't Have an Account?{' '}
              <Link to="/signup" className="student-login-form-register-link">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
