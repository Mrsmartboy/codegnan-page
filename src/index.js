import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { JobsProvider } from './contexts/JobsContext';
import { StudentsDataProvider } from './contexts/StudentsListContext';
import { StudentsApplyProvider } from './contexts/StudentsApplyContext';
import { DashboardProvider } from "./contexts/DashboardContext";
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <JobsProvider> 
          <StudentsDataProvider>
            <StudentsApplyProvider>
              <StudentsApplyProvider>
              <DashboardProvider>
            <App />
            </DashboardProvider>
            </StudentsApplyProvider>
            </StudentsApplyProvider>
          </StudentsDataProvider>
        </JobsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
