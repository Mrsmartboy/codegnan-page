import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CartoonLogo from '../images/login-cartoon.png';
import '../Login/StudentLogin';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/bdeforgotpwd`,
        { email }
      );
      if (response.status === 200 ) {
        Swal.fire('Email Sent!', 'Please check your email for the OTP.', 'success');
        setStep(2); 
      } else {
        Swal.fire('Error', 'Email not found. Please enter a registered email.', 'error');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }finally {
      setLoading(false); 
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const OTP = parseInt(otp)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/verifybdeotp`, {
        email,
        otp:OTP,
      });
   
      if (response.status === 200) {
        Swal.fire('Success!', 'OTP verified successfully. You can now reset your password.', 'success');
        setStep(3); 
      } else {
        Swal.fire('Error', 'Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }
    finally {
      setLoading(false); 
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bdeupdatepwd`, {
        email,
        password:newPassword,
      });
      if (response.status === 200) {
        Swal.fire('Success', 'Your password has been reset. Please log in with your new password.', 'success');
        navigate('/bdelogin');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Swal.fire('Error', 'Failed to reset password. Please try again later.', 'error');
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <div className="student-login-container">
      <div className="cartoon-image-container">
        <img src={CartoonLogo} alt="Cartoon logo" className="cartoon-image" />
      </div>
      <div className="student-login-container-1">
        <div className="student-login-form">
          <h2 className="student-login-form-title">
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Enter OTP'}
            {step === 3 && 'Reset Password'}
          </h2>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="student-login-form-input-group">
                <label htmlFor="email" className="student-login-form-label">
                  Enter Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="student-login-form-input"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="student-login-form-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="student-login-form-input-group">
                <label htmlFor="otp" className="student-login-form-label">
                  Enter OTP
                </label>
                <input
                  type='number'
                  id="otp"
                  className="student-login-form-input"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="student-login-form-submit" disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="student-login-form-input-group">
                <label htmlFor="newPassword" className="student-login-form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="student-login-form-input"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="student-login-form-input-group">
                <label htmlFor="confirmPassword" className="student-login-form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="student-login-form-input"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="student-login-form-submit" disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
