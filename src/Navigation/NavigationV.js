import React, { useState } from 'react';
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import './NavigationV.css';
// import codegnanLogo from '../images/codegnan-logo.webp';

const NavigationV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavLinks, setShowNavLinks] = useState(false);
  const userType = localStorage.getItem("userType");

  const handleClick = (path) => {
    navigate(path);
    setShowNavLinks(false);
  };

  const handleToggle = () => setShowNavLinks(!showNavLinks);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isDirectApply = location.pathname.includes('/directapply');

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`navigation-container`}>
      <AppBar position="static" className="navbar" elevation={0} sx={{ height: 60, flexGrow: 1,backgroundColor: 'transparent', boxShadow: 'none', textTransform: 'none' }}>
        <Toolbar className="tool">
          <img
            src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/codegnan-logo_qxnxrq.webp"
            alt="Codegnan Logo"
            className="logo"
            width="150"
            height="150"
            onClick={() => handleClick("/")}
          />
          {!isDirectApply && (
            <div className={`nav-links ${showNavLinks ? 'show' : ''}`}>
              {userType === "student" && (
                <>
                  <button
                    id="nav-link"
                    className={isActive("/jobslist") ? 'active' : ''}
                    onClick={() => handleClick("/jobslist")}
                  >
                    Jobs List
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/student-profile") ? 'active' : ''}
                    onClick={() => handleClick("/student-profile")}
                  >
                    Profile
                  </button>
                  <button id="nav-link" onClick={handleLogout}>Logout</button>
                </>
              )}
              {userType === "company" && (
                <>
                  <button
                    id="nav-link"
                    className={isActive("/addjob") ? 'active' : ''}
                    onClick={() => handleClick("/addjob")}
                  >
                    Add Jobs
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/myjobs") ? 'active' : ''}
                    onClick={() => handleClick("/myjobs")}
                  >
                    My Jobs
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/profile") ? 'active' : ''}
                    onClick={() => handleClick("/profile")}
                  >
                    Profile
                  </button>
                  <button id="nav-link" onClick={handleLogout}>Logout</button>
                </>
              )}
              {userType === "bde" && (
                <>
                  <button
                    id="nav-link"
                    className={isActive("/addjob") ? 'active' : ''}
                    onClick={() => handleClick("/addjob")}
                  >
                    Add Job
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/studentslist") ? 'active' : ''}
                    onClick={() => handleClick("/studentslist")}
                  >
                    Students List
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/bdedashboard") ? 'active' : ''}
                    onClick={() => handleClick("/bdedashboard")}
                  >
                    Dashboard
                  </button>
                  <button id="nav-link" onClick={handleLogout}>Logout</button>
                </>
              )}
              {userType === "admin" && (
                <>
                  <button
                    id="nav-link"
                    className={isActive("/addjob") ? 'active' : ''}
                    onClick={() => handleClick("/addjob")}
                  >
                    Add Job
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/bdedashboard") ? 'active' : ''}
                    onClick={() => handleClick("/bdedashboard")}
                  >
                    Jobs List
                  </button>
                  <button
                    id="nav-link"
                    className={isActive("/studentslist") ? 'active' : ''}
                    onClick={() => handleClick("/studentslist")}
                  >
                    Students List
                  </button>
                  <button id="nav-link" onClick={handleLogout}>Logout</button>
                </>
              )}
              {!userType && (
                <>
                  <button
                    id="nav-link"
                    className={isActive("/signup") ? 'active' : ''}
                    onClick={() => handleClick("/signup/student")}
                  >
                    Signup
                  </button>
                  <button
                    id="nav-link-login"
                    className={isActive("/login") ? 'active' : ''}
                    onClick={() => handleClick("/login")}
                  >
                    Login
                  </button>
                </>
              )}
              <button className="close-btn" aria-label="Close navigation menu" onClick={handleToggle}>X</button>
            </div>
          )}
          {!isDirectApply && (
            <button className={`toggler ${showNavLinks ? 'show' : ''}`} aria-label="Toggle navigation" onClick={handleToggle}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </Toolbar>
      </AppBar>
      {showNavLinks && !isDirectApply && <div className="blur-bg" onClick={handleToggle}></div>}
    </div>
  );
};

export default NavigationV;
