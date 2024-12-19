import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const StudentsListContext = createContext();

export const useStudentsData = () => {
  return useContext(StudentsListContext);
};

export const StudentsDataProvider = ({ children }) => {
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/allstudents`);
      setStudentsList(response.data);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  return (
    <StudentsListContext.Provider value={{ studentsList, loading, error, fetchStudentsData }}>
      {children}
    </StudentsListContext.Provider>
  );
};
