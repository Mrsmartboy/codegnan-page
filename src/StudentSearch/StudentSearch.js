import React, { useState } from 'react';

const StudentSearch = () => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!studentId) {
      setError('Please enter a valid Student ID');
      return;
    }
    setError('');
    try {
      const response = await fetch(`/api/students/${studentId}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const data = await response.json();
      setStudentData(data);
    } catch (err) {
      setError(err.message);
      setStudentData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}

        {studentData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Student Details</h3>
            <p className="text-gray-600">
              <strong>ID:</strong> {studentData.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSearch;
