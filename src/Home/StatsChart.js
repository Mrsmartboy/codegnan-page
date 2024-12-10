import React, { useState, useEffect } from "react";
import "./StatsChart.css";

const StatsChart = () => {
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  const data = [350, 580, 951, 1222, 2504, 3407];

  const [barHeightMultiplier, setBarHeightMultiplier] = useState(19);

  useEffect(() => {
    const updateBarHeightMultiplier = () => {
      if (window.innerWidth < 576) {
        setBarHeightMultiplier(18);  
      } else if (window.innerWidth >= 576 && window.innerWidth < 796) {
        setBarHeightMultiplier(16);  
      } else if (window.innerWidth >= 796 && window.innerWidth < 1024) {
        setBarHeightMultiplier(21); 
      } 
      else if (window.innerWidth >= 1024 && window.innerWidth < 1500) {
        setBarHeightMultiplier(21); 
        }
       else {
        setBarHeightMultiplier(12);  
      }
    };

    updateBarHeightMultiplier();
    window.addEventListener("resize", updateBarHeightMultiplier);

    return () => window.removeEventListener("resize", updateBarHeightMultiplier);
  }, []);

  return (
    <div className="stats-chart-container">
      <div className="chart-container">
        <div className="chart">
          {data.map((value, index) => (
            <div className="bar-container" key={index}>
              <span className="bar-value">{years[index]}</span>
              <div
                className="bar"
               
                style={{
                  "--bar-height": `${value / barHeightMultiplier}px`, 
                  animationDelay: `${index * 0.2}s`,
                }}
                title={`${value}`}
              ></div>
              <span className="year-label">{data[index]}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="span-text">
        In The Span Of <span className="span-six-years"> 6 Years</span>
      </p>
    </div>
  );
};

export default StatsChart;
