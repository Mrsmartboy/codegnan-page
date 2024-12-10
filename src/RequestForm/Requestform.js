import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import "./RequestForm.css";

const RequestForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const mobileNumber = watch("mobileNumber"); // Watch mobile number field for changes

  // Qualification options
  const qualifications = [
    { value: "graduation_completed", label: "Graduation (Completed)" },
    { value: "graduation_ongoing", label: "Graduation (Ongoing)" },
    { value: "post_graduation_completed", label: "Post Graduation (Completed)" },
    { value: "post_graduation_ongoing", label: "Post Graduation (Ongoing)" },
    { value: "12th", label: "12th / Intermediate" },
    { value: "diploma", label: "Diploma" },
  ];

  // State options
  const states = [
    { value: "andhra_pradesh", label: "Andhra Pradesh" },
    { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal_pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya_pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil_nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar_pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west_bengal", label: "West Bengal" },
  ];

  const onSubmit = async (data) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  const sendOtp = async () => {
    if (!mobileNumber) {
      alert("Please enter a valid mobile number");
      return;
    }
    setIsSubmitting(true);

    try {
      // Replace with your backend OTP sending API
      const response = await axios.post("/api/send-otp", { mobile: mobileNumber });
      setOtpSent(true);
      setOtpTimer(60); // Set timer to 60 seconds (1 minute)
      alert("OTP sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  // Countdown Timer Effect
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpSent && otpTimer === 0) {
      setOtpSent(false); // Expire OTP after 1 minute
      setOtp(""); // Clear OTP input
      alert("OTP expired. Please request a new OTP.");
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpSent]);

  return (
    <div className="form-container">
      <h2 className="form-title">Talk to Our Career Expert</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="form-input"
            placeholder="Enter your name"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Mobile Number</label>
          <div className="form-inline">
            <input
              type="number"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className="form-input"
              placeholder="Mobile number"
            />
            <button
              type="button"
              onClick={sendOtp}
              className="form-button"
              disabled={!mobileNumber || mobileNumber.length < 10 || isSubmitting}
            >
              {otpSent ? "Resend OTP" : "Get OTP"}
            </button>
          </div>
          {errors.mobileNumber && <p className="error-text">{errors.mobileNumber.message}</p>}
        </div>

        {otpSent && (
          <div className="form-group">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-input"
              placeholder="Enter OTP"
            />
            <button type="button" onClick={verifyOtp} className="form-button">
              Verify OTP
            </button>
            <p className="timer-text">OTP expires in: {otpTimer}s</p>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Highest Qualification</label>
          <Select
            options={qualifications}
            onChange={(selectedOption) => setValue("qualification", selectedOption.value, { shouldValidate: true })}
            placeholder="Select your qualification"
            className="form-select"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Native State</label>
          <Select
            options={states}
            onChange={(selectedOption) => setValue("nativeState", selectedOption.value, { shouldValidate: true })}
            placeholder="Select your state"
            className="form-select"
          />
        </div>

        

        <div className="form-group">
          <button type="submit" className="form-submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
