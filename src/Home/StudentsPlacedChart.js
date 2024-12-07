import React from "react";
import "./StudentsPlacedChart.css";

const StudentsPlacedChart = () => {
  const monthsData = [
    { month: "Jan", count: 15 },
    { month: "Feb", count: 24 },
    { month: "Mar", count: 11 },
    { month: "Apr", count: 9 },
    { month: "May", count: 60 },
    { month: "Jun", count: 12 },
    { month: "Jul", count: 52 },
    { month: "Aug", count: 70 },
    { month: "Sep", count: 50 },
    { month: "Oct", count: 24 },
    { month: "Nov", count: 15 },
    { month: "Dec", count: 34 },
  ];

  // Split the months into three rows for the calendar layout
  const rows = [
    monthsData.slice(0, 4), // Row 1: Jan - Apr
    monthsData.slice(4, 8), // Row 2: May - Aug
    monthsData.slice(8, 12), // Row 3: Sep - Dec
  ];

  return (
    <div className="students-placed-calendar">
      <table className="calendar-table">
       
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((monthData, colIndex) => (
                <td key={colIndex} className="calendar-cell">
                  <div className="cell-content">
                  <span className="month-count">{monthData.count}</span>

                    <span className="month-name">{monthData.month}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="placed-text">Students Placed In <span className="home-year">2024</span></p>

    </div>
  );
};


export default StudentsPlacedChart;
