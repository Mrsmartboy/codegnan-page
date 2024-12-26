import React, { useState, useMemo, Suspense } from "react";
import { useDashboard } from "../contexts/DashboardContext"; // Assuming the DashboardContext is used here
import "./BannerPage.css";

// Lazy load StatsChart to improve initial load time
const StatsChart = React.lazy(() => import("./StatsChart"));

const BannerPage = () => {
  const { dashboardData, loading, error } = useDashboard();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleVideoLoad = () => {
    setIsPlayerVisible(true);
  };

  const videoId = "uTBlsOoiMQs"; // Extracted YouTube video ID

  // Calculate total students placed using useMemo to optimize performance
  const totalStudentsPlaced = useMemo(() => {
    if (!dashboardData) return 0;
    return Object.values(dashboardData.yearOFPlacement || {}).reduce(
      (acc, count) => acc + count,
      0
    );
  }, [dashboardData]);

  // Conditional rendering for content
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

          {/* Conditionally show the placement card only if dashboardData exists */}
          {dashboardData && (
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
          )}
        </div>

        <div className="stats-studentplaced-container">
          {/* Conditionally render the chart only if dashboardData exists */}
          {dashboardData && (
            <Suspense fallback={<p>Loading chart...</p>}>
              <StatsChart />
            </Suspense>
          )}

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

      {/* Image container (always displayed) */}
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/banner-girl_i195ik.webp"
          alt="Banner Girl"
          className="banner-girl"
          loading="lazy"
        />
      </div>

      {/* Show a message if loading data failed */}
      {!dashboardData && !loading && (
        <p className="error-message">Placement data is currently unavailable.</p>
      )}

      {/* Show loading state */}
      {loading && <p>Loading data...</p>}

      {/* Show error if loading failed */}
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
};

export default BannerPage;
