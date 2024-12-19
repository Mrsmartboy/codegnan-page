import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { JobsProvider } from './contexts/JobsContext';
import { StudentsDataProvider } from './contexts/StudentsListContext';
import { StudentsApplyProvider } from './contexts/StudentsApplyContext';
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
            <App />
            </StudentsApplyProvider>
            </StudentsApplyProvider>
          </StudentsDataProvider>
        </JobsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
