import React from "react";
import "./InfoBanner.css"; // Import the CSS file

const InfoBanner = () => {
  return (
    <div className="info-banner-container">
      <div className="info-card">
        <h2 className="info-heading">1380+ Companies</h2>
        <p className="info-subtext">Hiring Codegnan Learners</p>
      </div>
      <div className="info-card">
        <h2 className="info-heading">₹ 20 LPA</h2>
        <p className="info-subtext">Highest Package</p>
      </div>
      <div className="info-card">
        <h2 className="info-heading">258+ Colleges</h2>
        <p className="info-subtext">Students From Colleges Across AP, TS</p>
      </div>
    </div>
  );
};

export default InfoBanner;
