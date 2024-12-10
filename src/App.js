import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentSignup from './Signup/StudentSignup';
import CompanySignup from './Signup/CompanySignup';
import NotFound from './NotFound';
import NavigationV from './Navigation/NavigationV';
import Home from './Home/Home';
import Signup from './Signup/Signup';
// import Login from './Login/Login';
import StudentLogin from './Login/StudentLogin';
//  import CompanyLogin from './Login/CompanyLogin';
 import Footer from './Footer/Footer';
import BDELogin from './BDE/BDELogin';
import BDESignup from './BDE/BDESignup';
import AddJob from './AddJob/AddJob';
import BDEDashboard from './BDEDashboard/BDEDashboard';
import JobsList from './JobsList/JobsList';
import StudentsApplied from './StudentsApplied/StudentsApplied';
import BDEStudentsAppliedJobsList from './BDEStudentsAppliedJobsList/BDEStudentsAppliedJobsList';
import StudentsList from './StudentsList/StudentsList';
import StudentProfile from './StudentProfile/StudentProfile';
import EmailApplyJob from './EmailApplyJob/EmailApplyJob';
import AdminLogin from './Login/AdminLogin';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import BdeForgotPassword from './ForgotPassword/BdeForgotPassword'
import RequestForm from './RequestForm/Requestform'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem('userType');

  if (!userType) {
    return <Navigate to="/not-found" replace />;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default function App() {
  return (
    <div>
      <NavigationV />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}>
            <Route path="student" element={<StudentSignup />} />
            <Route path="company" element={<CompanySignup />} />
          </Route>
            <Route path="/login" element={<StudentLogin />} />
          <Route path="/bdelogin" element={<BDELogin />} />
          <Route path="/bdesignup" element={<BDESignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          {/* <Route path="/companylogin" element={<CompanyLogin />} /> */}
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/bdeforgotPassword' element={<BdeForgotPassword/>}/>
          <Route path='/talk-to-career-expert' element={<RequestForm/>}/>
          <Route 
            path="/addjob" 
            element={
              <ProtectedRoute allowedRoles={['bde','company','admin']}>
                <AddJob />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/bdedashboard" 
            element={
              <ProtectedRoute allowedRoles={['bde','company','admin']}>
                <BDEDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobslist" 
            element={
              <ProtectedRoute allowedRoles={['student','admin']}>
                <JobsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/studentsapplied" 
            element={
              <ProtectedRoute allowedRoles={['company', 'bde','admin']}>
                <StudentsApplied />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bdestudentsappliedjoblist/:jobId" 
            element={
              <ProtectedRoute allowedRoles={['bde','admin']}>
                <BDEStudentsAppliedJobsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student-profile" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/studentslist" 
            element={
              <ProtectedRoute allowedRoles={['bde','admin']}>
                <StudentsList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/directapply/:student_id/:job_id" 
            element={
              <ProtectedRoute allowedRoles={['student', 'company', 'bde','admin']}>
                <EmailApplyJob />
              </ProtectedRoute>
            } 
          />

          
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


