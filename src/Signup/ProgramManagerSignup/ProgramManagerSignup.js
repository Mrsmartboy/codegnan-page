import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.min.js';  
import axios from "axios";
import { useStudentsData } from "../../contexts/StudentsListContext";
import { read, utils } from "xlsx"; // Optimized XLSX import
import { FaUpload, FaFileExcel, FaUser, FaEnvelope, FaPhone, FaUsers, FaCalendarAlt } from "react-icons/fa"; // Optimized icons import

export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const { fetchStudentsData } = useStudentsData();

  // State Management
  const [formData, setFormData] = useState({
    studentId: "",
    batchNo: "",
    email: "",
    parentNumber: "",
  });
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useExcel, setUseExcel] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && /\.(xlsx|xls)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length > 1) {
          const headers = rows[0].map((header) => header.toLowerCase().trim());
          const formattedData = rows.slice(1).map((row) => ({
            studentId: row[headers.indexOf("studentid")]?.toString() || "",
            batchNo: row[headers.indexOf("batchno")]?.toString() || "",
            email: row[headers.indexOf("email")]?.toString() || "",
            parentNumber: row[headers.indexOf("parentnumber")]?.toString() || "",
          }));

          setExcelData(formattedData);
        } else {
          Swal.fire({
            title: "Invalid Excel File",
            text: "The file is empty or missing headers.",
            icon: "error",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      Swal.fire({
        title: "Invalid File",
        text: "Please upload a valid Excel file.",
        icon: "error",
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`;

      if (!useExcel) {
        // Manual Entry
        const response = await axios.post(endpoint, {
          ...formData,
          studentId: formData.studentId.toUpperCase(),
          batchNo: formData.batchNo.toUpperCase(),
        });
        if (response.status === 200) {
          Swal.fire({ title: "Student Enrolled Successfully", icon: "success" });
        }
      } else {
        // Excel Upload
        const response = await axios.post(endpoint, { excelData });
        if (response.status === 200) {
          Swal.fire({ title: "Students Enrolled Successfully", icon: "success" });
        }
      }

      // Refresh Data and Navigate
      await fetchStudentsData();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.error || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-[#e1e7ff] p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Student Enrollment
        </h1>

        {/* Toggle Between Manual and Excel Entry */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 ${
              !useExcel
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUseExcel(false)}
          >
            <FaUser /> Manual Entry
          </button>
          <button
            className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 ${
              useExcel
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUseExcel(true)}
          >
            <FaFileExcel /> Excel Upload
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!useExcel ? (
            <>
              {["studentId", "batchNo", "email", "parentNumber"].map(
                (field, index) => (
                  <div className="mb-4" key={field}>
                    <label
                      htmlFor={field}
                      className="block text-black font-semibold mb-2"
                    >
                      {field
                        .charAt(0)
                        .toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md p-2">
                      {index === 0 && <FaUsers className="text-black mr-2" />}
                      {index === 1 && (
                        <FaCalendarAlt className="text-black mr-2" />
                      )}
                      {index === 2 && (
                        <FaEnvelope className="text-black mr-2" />
                      )}
                      {index === 3 && <FaPhone className="text-black mr-2" />}
                      <input
                        id={field}
                        name={field}
                        type={
                          field === "email"
                            ? "email"
                            : field === "parentNumber"
                            ? "number"
                            : "text"
                        }
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={handleChange}
                        className="flex-1 px-2 py-1 text-gray-800 outline-none font-medium"
                        required
                      />
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="excelUpload"
                className="block text-black font-semibold mb-2"
              >
                Upload Excel
              </label>
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
            className={`w-full py-3 text-white font-semibold rounded-md mt-4 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
