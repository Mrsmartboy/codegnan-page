// data.js
export const fetchDashboardData = async () => {
    const apiUrl =`${process.env.REACT_APP_BACKEND_URL}/api/v1/refreshdashboard`;

  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const data = await response.json();
  
      // Extracting specific parts of the API response
      const companiesList = data.COMPANIES;
      const collegesList = data.COLLEGES_LIST;
  
      return { companiesList, collegesList };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { companiesList: {}, collegesList: {} }; // Fallback in case of error
    }
  };
  