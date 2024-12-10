import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./SignupPage.css";  

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    mobileNumber: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    collegeUSNNumber: "",
    qualification: "",
    department: "",
    yearOfPassing: "",
    tenthStandard: "",
    twelfthStandard: "",
    graduationCGPA: "",
    githubLink: "",
    linkedinLink: "",
    resume: null,
    profilePic: null,
    arrears: "",
    skills: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dob: "",
    mobileNumber: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    collegeUSNNumber: "",
    qualification: "",
    department: "",
    yearOfPassing: "",
    tenthStandard: "",
    twelfthStandard: "",
    graduationCGPA: "",
    githubLink: "",
    linkedinLink: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const validateStep1 = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required.";
      isValid = false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
      isValid = false;
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required.";
      isValid = false;
    }
    if (!formData.state) {
      newErrors.state = "State is required.";
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.collegeName) {
      newErrors.collegeName = "College Name is required.";
      isValid = false;
    }
    if (!formData.collegeUSNNumber) {
      newErrors.collegeUSNNumber = "College USN Number is required.";
      isValid = false;
    }
    if (!formData.qualification) {
      newErrors.qualification = "Qualification is required.";
      isValid = false;
    }
    if (!formData.department) {
      newErrors.department = "Department is required.";
      isValid = false;
    }
    if (!formData.yearOfPassing) {
      newErrors.yearOfPassing = "Year of Passing is required.";
      isValid = false;
    }
    if (!formData.tenthStandard) {
      newErrors.tenthStandard = "10th Standard Percentage is required.";
      isValid = false;
    }
    if (!formData.twelfthStandard) {
      newErrors.twelfthStandard = "12th Standard Percentage is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.graduationCGPA) {
      newErrors.graduationCGPA = "Graduation CGPA is required.";
      isValid = false;
    }
    if (!formData.githubLink) {
      newErrors.githubLink = "GitHub Link is required.";
      isValid = false;
    }
    if (!formData.linkedinLink) {
      newErrors.linkedinLink = "LinkedIn Link is required.";
      isValid = false;
    }
    if (!formData.resume) {
      newErrors.resume = "Resume is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const graduationRegex = /^\d*\.?\d*$/;

    if (!passwordRegex.test(formData.password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 6 characters long');
      return;
    }

    if (formData.skills.length === 0) {
      alert("Select at least one skill.");
      return;
    }

    Swal.fire({
      title: "Submitting Form...",
      text: "Please wait while we process your data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log("Response from API:", response.data);
        Swal.fire({
          title: "Signup Successful",
          icon: "success"
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unable to signup. Please try again later.",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="multi-step-form">
      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="form-step">
          <h3>Step 1: Personal Details</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name: <span className="required">*</span></label>
            <input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your full name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address: <span className="required">*</span></label>
            <input 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email address"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth: <span className="required">*</span></label>
            <input 
              id="dob" 
              name="dob" 
              type="date" 
              value={formData.dob} 
              onChange={handleChange} 
              placeholder="Select your date of birth"
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number: <span className="required">*</span></label>
            <input 
              id="mobileNumber" 
              name="mobileNumber" 
              value={formData.mobileNumber} 
              onChange={handleChange} 
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="state">State: <span className="required">*</span></label>
            <input 
              id="state" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              placeholder="Enter your state"
            />
            {errors.state && <p className="error-message">{errors.state}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City: <span className="required">*</span></label>
            <input 
              id="city" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              placeholder="Enter your city"
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: <span className="required">*</span></label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Create a password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password: <span className="required">*</span></label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      )}
      
      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="form-step">
          <h3>Step 2: Education Details</h3>
          <div className="form-group">
            <label htmlFor="collegeName">College Name: <span className="required">*</span></label>
            <input 
              id="collegeName" 
              name="collegeName" 
              value={formData.collegeName} 
              onChange={handleChange} 
              placeholder="Enter your college name"
            />
            {errors.collegeName && <p className="error-message">{errors.collegeName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="collegeUSNNumber">College USN Number: <span className="required">*</span></label>
            <input 
              id="collegeUSNNumber" 
              name="collegeUSNNumber" 
              value={formData.collegeUSNNumber} 
              onChange={handleChange} 
              placeholder="Enter your college USN number"
            />
            {errors.collegeUSNNumber && <p className="error-message">{errors.collegeUSNNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification: <span className="required">*</span></label>
            <input 
              id="qualification" 
              name="qualification" 
              value={formData.qualification} 
              onChange={handleChange} 
              placeholder="Enter your qualification"
            />
            {errors.qualification && <p className="error-message">{errors.qualification}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="department">Department: <span className="required">*</span></label>
            <input 
              id="department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              placeholder="Enter your department"
            />
            {errors.department && <p className="error-message">{errors.department}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="yearOfPassing">Year of Passing: <span className="required">*</span></label>
            <input 
              id="yearOfPassing" 
              name="yearOfPassing" 
              value={formData.yearOfPassing} 
              onChange={handleChange} 
              placeholder="Enter your year of passing"
            />
            {errors.yearOfPassing && <p className="error-message">{errors.yearOfPassing}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="tenthStandard">10th Standard Percentage: <span className="required">*</span></label>
            <input 
              id="tenthStandard" 
              name="tenthStandard" 
              value={formData.tenthStandard} 
              onChange={handleChange} 
              placeholder="Enter your 10th standard percentage"
            />
            {errors.tenthStandard && <p className="error-message">{errors.tenthStandard}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="twelfthStandard">12th Standard Percentage: <span className="required">*</span></label>
            <input 
              id="twelfthStandard" 
              name="twelfthStandard" 
              value={formData.twelfthStandard} 
              onChange={handleChange} 
              placeholder="Enter your 12th standard percentage"
            />
            {errors.twelfthStandard && <p className="error-message">{errors.twelfthStandard}</p>}
          </div>
          <button type="button" onClick={handleBack}>Back</button>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      )}
      
      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="form-step">
          <h3>Step 3: Additional Information</h3>
          <div className="form-group">
            <label htmlFor="graduationCGPA">Graduation CGPA: <span className="required">*</span></label>
            <input 
              id="graduationCGPA" 
              name="graduationCGPA" 
              value={formData.graduationCGPA} 
              onChange={handleChange} 
              placeholder="Enter your graduation CGPA"
            />
            {errors.graduationCGPA && <p className="error-message">{errors.graduationCGPA}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link: <span className="required">*</span></label>
            <input 
              id="githubLink" 
              name="githubLink" 
              value={formData.githubLink} 
              onChange={handleChange} 
              placeholder="Enter your GitHub profile link"
            />
            {errors.githubLink && <p className="error-message">{errors.githubLink}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="linkedinLink">LinkedIn Link: <span className="required">*</span></label>
            <input 
              id="linkedinLink" 
              name="linkedinLink" 
              value={formData.linkedinLink} 
              onChange={handleChange} 
              placeholder="Enter your LinkedIn profile link"
            />
            {errors.linkedinLink && <p className="error-message">{errors.linkedinLink}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="resume">Resume: <span className="required">*</span></label>
            <input 
              id="resume" 
              name="resume" 
              type="file" 
              onChange={handleFileChange} 
              placeholder="Upload your resume"
            />
            {errors.resume && <p className="error-message">{errors.resume}</p>}
          </div>
          <button type="button" onClick={handleBack}>Back</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
};

export default SignupPage;
