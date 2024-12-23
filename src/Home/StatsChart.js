import React, { useState, useEffect } from "react";
import { fetchDashboardData } from "./Data"; // Import the fetch function
import "./StatsChart.css";

const StatsChart = () => {
  const [yearOFPlacement, setYearOFPlacement] = useState([]); // Initialize with an empty array
  const [barHeightMultiplier, setBarHeightMultiplier] = useState(19);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { yearOFPlacement: yearData } = await fetchDashboardData();
        console.log("year", yearData);
  
        if (yearData && typeof yearData === "object") {
          const formattedData = Object.entries(yearData).map(([year, value]) => ({
            year: parseInt(year, 10),
            value,
          }));
  
          // Sort the data by year in ascending order
          formattedData.sort((a, b) => a.year - b.year);
  
          setYearOFPlacement(formattedData);
        } else {
          console.error("Invalid data structure:", yearData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    const updateBarHeightMultiplier = () => {
      if (window.innerWidth < 576) {
        setBarHeightMultiplier(4);
      } else if (window.innerWidth >= 576 && window.innerWidth < 796) {
        setBarHeightMultiplier(4);
      } else if (window.innerWidth >= 796 && window.innerWidth < 1024) {
        setBarHeightMultiplier(4);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1500) {
        setBarHeightMultiplier(4);
      } else {
        setBarHeightMultiplier(3);

      }
    };
  
    updateBarHeightMultiplier();
    window.addEventListener("resize", updateBarHeightMultiplier);
  
    return () => window.removeEventListener("resize", updateBarHeightMultiplier);
  }, []);
  

  return (
    <div className="stats-chart-container">
      {yearOFPlacement.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="chart-container">
          <div className="chart">
            {yearOFPlacement.map((item, index) => (
              <div className="bar-container" key={index}>
                <span className="bar-value">{item.year}</span>
                <div
                  className="bar"
                  style={{
                    "--bar-height": `${item.value / barHeightMultiplier}px`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                  title={`${item.value}`}
                ></div>
                <span className="year-label">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="span-text">
        In The Span Of <span className="span-six-years">{yearOFPlacement.length} Years</span>
      </p>
    </div>
  );
};

export default StatsChart;
