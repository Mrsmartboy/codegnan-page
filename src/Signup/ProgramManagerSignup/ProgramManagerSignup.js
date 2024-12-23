import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useStudentsData } from "../../contexts/StudentsListContext";
import * as XLSX from "xlsx";
import { FaUpload, FaFileExcel, FaUser, FaEnvelope, FaPhone, FaUsers, FaCalendarAlt } from "react-icons/fa";

export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    batchNo: "",
    email: "",
    parentNumber: "",
  });
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchStudentsData } = useStudentsData();
  const [useExcel, setUseExcel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length > 1) {
          const headers = rows[0].map((header) => header.toLowerCase().trim());
          const formattedData = rows.slice(1).map((row) => ({
            studentId: row[headers.indexOf("studentid")]?.toString() || "",
            batchNo: row[headers.indexOf("batchno")]?.toString() || "",
            email: row[headers.indexOf("email")]?.toString() || "",
            parentNumber: row[headers.indexOf("parentnumber")]?.toString() || "",
          }));

          setExcelData(formattedData);
          
          Swal.fire({
            title: "Excel file processed successfully!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "The Excel file is empty or headers are missing.",
            icon: "error",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!useExcel) {
        const { studentId, batchNo, email, parentNumber } = formData;
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`,
          {
            studentId: studentId.toUpperCase(),
            batchNo: batchNo.toUpperCase(),
            email,
            parentNumber,
          }
        );
        if (response.status === 200) {
          await fetchStudentsData();
          navigate("/");
          Swal.fire({
            title: "Student Enrolled Successfully",
            icon: "success",
          });
        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudents`,
          { students: excelData }
        );
        if (response.status === 200) {
          await fetchStudentsData();
          navigate("/");
          Swal.fire({
            title: "Students Enrolled Successfully",
            icon: "success",
          });
        }
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        Swal.fire({ icon: "error", title: "User email exists" });
      } else if (status === 400) {
        Swal.fire({ icon: "error", title: "Invalid data" });
      } else {
        Swal.fire({ icon: "error", title: "An error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Student Enrollment</h1>
        
        <div className="flex justify-center gap-4 mb-6">
        <button
        className={`px-6 py-2 border rounded-md transition duration-300 ease-in-out text-lg font-medium flex items-center gap-2 ${!useExcel ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        onClick={() => setUseExcel(false)}
      >
        <FaUser /> Manual Entry
      </button>
      <button
        className={`px-6 py-2 border rounded-md transition duration-300 ease-in-out text-lg font-medium flex items-center gap-2 ${useExcel ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        onClick={() => setUseExcel(true)}
      >
        <FaFileExcel /> Excel Upload
      </button>

        </div>

        <form onSubmit={handleSubmit}>
          {!useExcel ? (
            <>
              {["studentId", "batchNo", "email", "parentNumber"].map((field, index) => (
                <div className="mb-4" key={field}>
                  <label htmlFor={field} className="block text-black font-semibold mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    {index === 0 && <FaUsers className="text-black mr-2" />}
                    {index === 1 && <FaCalendarAlt className="text-black mr-2" />}
                    {index === 2 && <FaEnvelope className="text-black mr-2" />}
                    {index === 3 && <FaPhone className="text-black mr-2" />}
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : field === "parentNumber" ? "tel" : "text"}
                      placeholder={`Enter ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
                      required
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mb-4">
              <label htmlFor="excelUpload" className="block text-gray-600 font-medium mb-2">Upload Excel</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <FaUpload className="text-black mr-2" />
                <input
                  id="excelUpload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  className="flex-1 px-2 py-1 text-gray-800 outline-none"
                />
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-md mt-4 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {excelData.length > 0 && (
        <div>
          <h2>Uploaded Excel Data</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
        </form>
      </div>
    </div>
  );
}
