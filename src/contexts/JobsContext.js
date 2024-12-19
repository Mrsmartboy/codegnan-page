import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const JobsContext = createContext();

export const useJobs = () => {
    return useContext(JobsContext);
};

export const JobsProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            const jobsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/listopenings`);
            
            setJobs(jobsResponse.data.jobs);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data from the server.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <JobsContext.Provider value={{ jobs, loading, error, fetchJobs }}>
            {children}
        </JobsContext.Provider>
    );
};
