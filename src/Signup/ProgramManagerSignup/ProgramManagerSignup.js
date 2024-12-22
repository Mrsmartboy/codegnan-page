import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ProgramManagerSignup.css';
import axios from 'axios';
import { useStudentsData } from '../../contexts/StudentsListContext';
import * as XLSX from 'xlsx';

export default function ProgramManagerSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    batchNo: '',
    email: '',
    parentNumber: '',
  });
  const [excelData, setExcelData] = useState([]); // State to store Excel data
  const [loading, setLoading] = useState(false);
  const { fetchStudentsData } = useStudentsData();

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
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
        if (rows.length > 1) {
          const headers = rows[0].map((header) => header.toLowerCase().trim()); // Normalize headers
          const formattedData = rows.slice(1).map((row) => {
            return {
              studentId: row[headers.indexOf('studentid')]?.toString() || '',
              batchNo: row[headers.indexOf('batchno')]?.toString() || '',
              email: row[headers.indexOf('email')]?.toString() || '',
              parentNumber: row[headers.indexOf('parentnumber')]?.toString() || '',
            };
          });
  
          setExcelData(formattedData); // Store the Excel data in state
          Swal.fire({
            title: 'Excel file processed successfully!',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'The Excel file is empty or headers are missing.',
            icon: 'error',
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
      const { studentId, batchNo, email, parentNumber } = formData;

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`,
        {
          studentId: studentId.toUpperCase(),
          batchNo,
          email,
          parentNumber,
        }
      );

      if (response.status === 200) {
        await fetchStudentsData();
        navigate('/');
        Swal.fire({
          title: 'Student Enrolled Successfully',
          icon: 'success',
        });
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 404) {
        Swal.fire({ icon: 'error', title: 'User email exists' });
      } else if (status === 400) {
        Swal.fire({ icon: 'error', title: 'Invalid data' });
      } else {
        Swal.fire({ icon: 'error', title: 'An error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="programmanager-container">
      <h1 className="font-semibold text-lg lg:text-2xl" style={{ color: 'black' }}>
        Student Enrollment
      </h1>
      <form onSubmit={handleSubmit}>
        {['studentId', 'batchNo', 'email', 'parentNumber'].map((field) => (
          <div key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : field === 'parentNumber' ? 'tel' : 'text'}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div>
          <label htmlFor="excelUpload">Upload Excel</label>
          <input
            id="excelUpload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </div>
        <div className="forgot">
          <button className="btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {excelData.length > 0 && (
        <div>
          <h2>Uploaded Excel Data</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'
// import './ProgramManagerSignup.css';
// import axios from 'axios';
// import {useStudentsData} from '../../contexts/StudentsListContext'

// export default function ProgramManagerSignup() {
//   const navigate = useNavigate();
//   const [studentId, setStudentId] = useState('');
//   const [batchNo, setBatchNo] = useState('');
//   const [email, setEmail] = useState('');
//   const [parentNumber, setParentNumber] = useState('');

//   const {fetchStudentsData} = useStudentsData()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//    const id = studentId.toUpperCase()
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/addstudent`, {studentId:id,batchNo, email,parentNumber });
//       console.log("response from studentlogin", response.data);
//       if (response.status === 200) {
//         await fetchStudentsData()
        
//         navigate('/');
//         Swal.fire({
//                 title: "Student Enrolled Successfull",
//                 icon: "success"
//             });
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       if(error.response.status===404){
//         Swal.fire({
//           icon: "error",
//           title: "User email exists",
//         });
//         return 
//       }
//       else if(error.response.status===400){
//         Swal.fire({
//           icon: "error",
//           title: "Invalid data",
//         });
//         return 
//       }
//     }
//   };
//   return (
//     <div className="programmanager-container">
//       <h1 style={{ color: "black" }} className='font-semibold text-lg lg:text-2xl'>Student Enrollment</h1>
//       <form onSubmit={handleSubmit}>
//       <div>
//           <label>StudentId</label>
//           <input
//             type="text" required
//             placeholder="StudentId"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />

//         </div>
//         <div>
//           <label>Batch Number</label>
//           <input
//             type="text" required
//             placeholder="Batch Number"
//             value={batchNo}
//             onChange={(e) => setBatchNo(e.target.value)}
//           />

//         </div>
//         <div>
//           <label>Email address</label>
//           <input
//             type="email" required
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//         </div>
//         <div>
//           <label>Parent Mobile Number</label>
//           <input
//             type="number" required
//             placeholder="Parents Number"
//             value={parentNumber}
//             onChange={(e) => setParentNumber(e.target.value)}
//           />
//         </div>
//         <div className='forgot'>
//           <button className="btn">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }
