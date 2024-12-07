import React from "react";
import "./CourseQuerySection.css"; 
import studentImg from "../images/student.webp"; // Replace with your path
import call from '../images/call.webp';

const CourseQuerySection = () => {
  return (
    <div className="query-section">
      <div className="query-background">
        <div className="query-content">
          <h1>Still have questions regarding courses?</h1>
          <p>
            Talk to our team and get support in identifying the right tech
            career course for you. Our team will answer your questions regarding
            courses, fees, batch details, and more.
          </p>
          <button className="callback-button-query">
              <img src={call} alt="call" className='call' /> Request A Callback
            </button>        
            </div>
        <img src={studentImg} alt="Student" className="student-img" />
      </div>
    </div>
  );
};

export default CourseQuerySection;
