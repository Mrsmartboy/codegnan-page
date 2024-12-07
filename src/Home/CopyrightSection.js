import React from 'react';
import './CopyrightSection.css'; // Create a separate CSS file for styling

function CopyrightSection() {
  return (
    <div className="copyright-section">
      <p>
        © Copyright 2018-2024 | Codegnan IT Solutions PVT LTD
      </p>
      <p>
        <a href="/privacy-policy" className="copyright-link">Privacy Policy</a> | 
        <a href="/terms-and-conditions" className="copyright-link">Terms and Conditions</a> | 
        <a href="/refund-policy" className="copyright-link">Refund Policy</a> | 
        <a href="/cancellation-policy" className="copyright-link">Cancellation Policy</a>
      </p>
    </div>
  );
}

export default CopyrightSection;
