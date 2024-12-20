import React, { useState } from "react";
import axios from "axios";

const StudentSearch = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
 const [appliedJobs, setAppliedJobs] = useState([]);
   const [eligibleJobs, setEligibleJobs] = useState([]);


  const handleSearch = async () => {
    const id= studentId.toUpperCase()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/searchstudent`, { studentId:id });
  
      const data = response.data;
      const studentDetails = data.student_data[0];
   console.log(data)
   setStudentData({
    id: studentDetails.studentId,
    name: studentDetails.name,
    email: studentDetails.email,
    program: studentDetails.qualification,
    parentNumber: studentDetails.parentNumber,
    batchNo: studentDetails.std_BatchNo,
    skills: studentDetails.studentSkills.join(', '), 
    cgpa: studentDetails.highestGraduationCGPA,
    yearOfPassing: studentDetails.yearOfPassing,
  });
  setAppliedJobs(data.applied_jobs_details || []);      
   setEligibleJobs(data.eligible_jobs_details|| []);
    } catch (err) {
      console.error('Error fetching data:', err.message);
      setStudentData(null);
       setAppliedJobs([]);
       setEligibleJobs([]);
    }
  };
  
  



  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full md:max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Student Search
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none shadow-md transition-all"
        >
          Search
        </button>
      </div>

      {studentData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6 ">
         <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h3 className="text-xl font-bold text-black mb-6 text-center">
                      Student Details
                    </h3>
                    <div className="overflow-y-auto max-h-60"> 
                      <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                          {Object.entries(studentData).map(([key, value]) => (
                            <tr key={key} >
                              <th className="border border-gray-300 px-4 py-2 text-left capitalize font-semibold text-black">
                                {key.replace(/([A-Z])/g, " $1")}
                              </th>
                              <td className="border border-gray-300 px-4 py-2 text-black font-medium">
                                {Array.isArray(value) ? value.join(", ") : value || "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>


                  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h3 className="text-xl font-bold text-black mb-6 text-center">
                      Applied Jobs
                    </h3>
                    {appliedJobs && appliedJobs.length > 0 ? (
                      <div className="overflow-y-auto max-h-60">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                Company Name
                              </th>
                              <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                Job Role
                              </th>
                              <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                Salary
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {appliedJobs.map((job, index) => (
                              <tr key={index} >
                                <td className="border border-gray-300 px-4 py-2 text-black">{job.companyName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{job.jobRole}</td>
                                <td className="border border-gray-300 px-4 py-2 text-black">
                                  {job.salary.includes('LPA') ? job.salary : `${job.salary} LPA`}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">No jobs applied yet.</p>
                    )}
                  </div>


                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-black mb-6 text-center">
                      Eligible Jobs
                    </h3>
                    <div className="overflow-x-auto">
                      {eligibleJobs.length === 0 ? (
                        <p className="text-center text-gray-600">No eligible jobs available.</p>
                      ) : (
                        <div className="overflow-y-auto max-h-60"> 
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                  Company Name
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                  Job Role
                                </th>
                               
                                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                                  Salary
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {eligibleJobs.map((job, index) => (
                                <tr key={index} className=" transition-all">
                                  <td className="border border-gray-300 px-4 py-2 text-black">
                                    {job.companyName}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-black">
                                    {job.jobRole}
                                  </td>
                                 
                                  <td className="border border-gray-300 px-4 py-2 text-black">
                                    {job.salary.includes('LPA') ? job.salary : `${job.salary} LPA`}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>


        </div>
      )}
    </div>
  );
};

export default StudentSearch;
