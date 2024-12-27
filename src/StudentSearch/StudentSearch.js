import React, { useState } from "react";
import axios from "axios";

const StudentSearch = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [eligibleJobs, setEligibleJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const id = studentId.toUpperCase();
    try {
      setLoading(true); // Start loading
      setErrorMessage("");
      setStudentData(null);
      setAppliedJobs([]);
      setEligibleJobs([]);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/searchstudent`,
        { studentId: id }
      );

      const data = response.data;

      if (!data.student_data || data.student_data.length === 0) {
        setErrorMessage(data.message);
        return;
      }

      const studentDetails = data.student_data[0];
      setStudentData({
        studentId: studentDetails.studentId,
        name: studentDetails.name,
        email: studentDetails.email,
        qualification: studentDetails.qualification,
        parentNumber: studentDetails.parentNumber,
        batchNo: studentDetails.std_BatchNo,
        skills: studentDetails.studentSkills.join(", "),
        percentage: studentDetails.highestGraduationpercentage,
        yearOfPassing: studentDetails.yearOfPassing,
      });
      setAppliedJobs(data.applied_jobs_details || []);
      setEligibleJobs(data.eligible_jobs_details || []);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const handleRowClick = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-white p-4 min-h-[70vh]">
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
          disabled={loading} 
          className={`w-full text-white py-2 px-4 rounded-md shadow-md transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:outline-none"
          }`}
        >
          {loading ? "Searching..." : "Search"} 
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>

      {studentData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h3 className="text-xl font-bold text-black mb-6 text-center">
              Student Details
            </h3>
            <div className="overflow-y-auto max-h-60">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {Object.entries(studentData).map(([key, value]) => (
                    <tr key={key}>
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
            {appliedJobs.length > 0 ? (
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
                      <tr
                        key={index}
                        className="transition-all cursor-pointer"
                        onClick={() => handleRowClick(job)}
                      >
                        <td className="border border-gray-300 px-4 py-2">{job.companyName}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.jobRole}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {job.salary.includes("LPA") ? job.salary : `${job.salary} LPA`}
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

          {/* Eligible Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black mb-6 text-center">
              Eligible Jobs
            </h3>
            {eligibleJobs.length > 0 ? (
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
                      <tr
                        key={index}
                        className="transition-all cursor-pointer"
                        onClick={() => handleRowClick(job)}
                      >
                        <td className="border border-gray-300 px-4 py-2">{job.companyName}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.jobRole}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {job.salary.includes("LPA") ? job.salary : `${job.salary} LPA`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600">No eligible jobs available.</p>
            )}
          </div>
        </div>
      )}

{selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 px-2 text-black font-bold hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: "rgb(204, 51, 102)" }}>{selectedJob.jobRole}</h2>
            <p className="text-sm mb-2">
              <span className="font-bold">Company Name:</span> {selectedJob.companyName}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Salary:</span>   {selectedJob.salary.includes('LPA') ? selectedJob.salary : `${selectedJob.salary} LPA`}

            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Location:</span> {selectedJob.jobLocation || "N/A"}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Percentage:</span> {selectedJob.percentage || "N/A"}%
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Bond:</span> {selectedJob.bond || "N/A"} year
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Branch:</span> {selectedJob.department?.join(", ") || "N/A"}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Qualification:</span> {selectedJob.educationQualification}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Graduate Level:</span>{" "}
              {selectedJob.graduates?.join(", ") || "N/A"}
            </p>
            <div className="flex gap-2 mt-4">
              {selectedJob.jobSkills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 border border-gray-300 text-sm text-[#00796b] font-semibold bg-[#e6f4f1] rounded-[5px]"
                >
                  {skill}
                </span>
              ))}
            </div>
            {selectedJob.specialNote && (
              <div className="mt-4 p-2  border-l-4 border-yellow-500">
                <p className="text-sm font-bold">Special Note:</p>
                <p className="text-sm">{selectedJob.specialNote}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSearch;
