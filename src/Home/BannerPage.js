import React, { useState } from "react";
import { useDashboard } from "../contexts/DashboardContext"; // Assuming the DashboardContext is used here
import "./BannerPage.css";
import StatsChart from "./StatsChart";

const BannerPage = () => {
  const { dashboardData, loading, error } = useDashboard();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleVideoLoad = () => {
    setIsPlayerVisible(true);
  };

  const videoId = "uTBlsOoiMQs"; // Extracted YouTube video ID

  // Extract total count of placements from yearOFPlacement
  const totalStudentsPlaced = dashboardData
    ? Object.values(dashboardData.yearOFPlacement || {}).reduce(
        (acc, count) => acc + count,
        0
      )
    : 0;

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div className="coverpage-container">
      <div className="home-cover-text-container">
        <div className="home-text-container">
          <div className="home-titles">
            <p className="home-title">
              It's <span className="span-home-title">Not Just</span> A Numbers
            </p>
            <p className="tag-line">
              See Successful Students{" "}
              <span className="span-home-title">Placements</span> Journey
            </p>
          </div>

          <div className="placement-card">
            <h1 className="student-count">
              {totalStudentsPlaced}
              <span className="plus-sign">+</span>
            </h1>
            <p className="students-placed">Students Placed</p>
            <p className="counting">
              <span className="blinking">&gt;&gt;&gt; Still Counting...!</span>
            </p>
          </div>
        </div>
        <div className="stats-studentplaced-container">
          <StatsChart />

          {/* Lazy-loaded YouTube video */}
          <div className="video-wrapper" style={{ width: "400px", height: "225px" }}>
            {!isPlayerVisible ? (
              <img
                src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734944177/youtube-video_afamyz.jpg"
                alt="YouTube Thumbnail"
                className="youtube-thumbnail"
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
                onClick={handleVideoLoad}
              />
            ) : (
              <iframe
                width="400"
                height="225"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>

      <div className="image-container">
        <img
          src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/banner-girl_i195ik.webp"
          alt="Banner Girl"
          className="banner-girl"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BannerPage;
