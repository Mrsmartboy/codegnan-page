import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './JobsList.css';
import JobDeadline from './JobDeadline';
import Swal from 'sweetalert2'
const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedJob, setSelectedJob] = useState(null); // State for the selected job
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [studentDetails, setStudentDetails] = useState(null)
    const student_id = localStorage.getItem("student_id")

    // Fetch job details from the backend API
    const fetchJobs = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/listopenings`
            );
            const studentResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/getstudentdetails?student_id=${student_id}`
            )
            setStudentDetails(studentResponse.data)

            setJobs(response.data.jobs);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch job details');
            setLoading(false);
        }
    }, [student_id]);

    function applyJob(selectedJobId) {
        const job = jobs.find(job => job.job_id === selectedJobId);
        if (job.isActive) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/applyforjob`, { job_id: selectedJobId, student_id })
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Job Applied Successfully",
                            showConfirmButton: false,
                            timer: 3000
                        });
                        fetchJobs();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400)
                        Swal.fire({
                            icon: "error",
                            title: "Already applied for the job",
                        });
                });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "This job is not active. You cannot apply.",
            });
        }
    }
    // Fetch job details on component mount
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // Open modal and set selected job
    const openModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedJob(null);
        setIsModalOpen(false);
    };

    return (
        <div className='job-list-wrapper'>
            <h1 className='student-head'>Student Dashboard</h1>
            {loading && <p className='loading'>Loading Jobs...</p>}

            <div className="job-list-container">

                {error && <p className="error-message">{error}</p>}
                {jobs.map((job) => (
                    <div
                        key={job.job_id}
                        className={`job-card ${!job.isActive ? 'closed-job' : ''}`}
                        onClick={() => openModal(job)} // Click handler to open modal
                    >
                        <div className="job-header">

                            <h1 className="job-title">{job.jobRole}</h1>
                            <p className="company-name">
                                {job.companyName}
                            </p>
                        </div>
                        <div className="job-info">
                            <p className='sub-info'>
                                <span className='strong'>CTC:</span> {job.salary}
                            </p>
                            <p className='sub-info'>
                                <span className='strong'>Loc:</span> {job.jobLocation}
                            </p>
                            <p className="job-description">{job.description}</p>
                            <div className="tags">
                                {job.technologies.map((tech, index) => (
                                    <span key={index} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="job-footer">
                            <button className={`apply-job-list-btn ${job.isActive && !studentDetails.applied_jobs.includes(job.job_id) ? '' : ((studentDetails && studentDetails.applied_jobs && studentDetails.applied_jobs.includes(job.job_id)) ? 'applied' : 'disabled')}`} onClick={() => applyJob(job.job_id)} disabled={!job.isActive}>
                                {(job.isActive) && !studentDetails.applied_jobs.includes(job.job_id) ? 'Apply' : ((studentDetails && studentDetails.applied_jobs && studentDetails.applied_jobs.includes(job.job_id)) ? 'Applied' : 'Timeout')}
                            </button>
                            {/*    <p className="posted-date">{job.postedDate}</p> */}
                            <p onClick={() => openModal(job)} className='view-button-student'>View More...</p>

                        </div>
                    </div>
                ))}

                {/* Modal */}
                {isModalOpen && selectedJob && (

                    <div className="job-modal">
                        <div className="modal-content">
                            <button className="close-modal" onClick={closeModal}>
                                &times;
                            </button>
                            <h2 className='job-role'>{selectedJob.jobRole}</h2>
                            <p className="pop-up-item">
                                <strong className='strong'>Company:</strong> {selectedJob.companyName}
                            </p>

                            <p className="pop-up-item">
                                <strong className='strong'>Salary:</strong> {selectedJob.salary}
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Location:</strong> {selectedJob.jobLocation}
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Percentage:</strong> {selectedJob.percentage}%
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Bond:</strong>
                                {selectedJob.bond > 1 ? `${selectedJob.bond} years` : `${selectedJob.bond} year`}
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Graduate Level:</strong>{" "}
                                {selectedJob.graduates.join(', ')}
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Branch:</strong>{" "}
                                {selectedJob.department.join(', ')}
                            </p>
                            <p className="pop-up-item">
                                <strong className='strong'>Qualification:</strong>{" "}
                                {selectedJob.educationQualification}
                            </p>
                            <div className="tags">
                                {selectedJob.technologies.map((tech, index) => (
                                    <span key={index} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {selectedJob.specialNote && (
                                <div className="special-note">
                                    <h3>Special Note</h3>
                                    <p>{selectedJob.specialNote}</p>
                                </div>
                            )}
                            <div className="job-footer">
                                <button className={`apply-job-list-btn ${selectedJob.isActive && !studentDetails.applied_jobs.includes(selectedJob.job_id) ? '' : ((studentDetails && studentDetails.applied_jobs && studentDetails.applied_jobs.includes(selectedJob.job_id)) ? 'applied' : 'disabled')}`} onClick={() => applyJob(selectedJob.job_id)} disabled={!selectedJob.isActive}>
                                    {(selectedJob.isActive) && !studentDetails.applied_jobs.includes(selectedJob.job_id) ? 'Apply' : ((studentDetails && studentDetails.applied_jobs && studentDetails.applied_jobs.includes(selectedJob.job_id)) ? 'Applied' : 'Timeout')}
                                </button>
                                {selectedJob.isActive && <JobDeadline deadLine={selectedJob.deadLine} />
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsList;