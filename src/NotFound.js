import React from 'react';
import errorGif from './images/error.gif'; // Import your error.gif file

export default function NotFound() {
  return (
    <div style={styles.container}>
      <img src={errorGif} alt="Error" style={styles.errorImage} />
      <p style={styles.message}>You are not authorized to access these. Login first</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    minHeight:'50vh'
  },
  errorImage: {
    width: '200px', // Adjust the width of the image as needed
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    marginBottom: '20px',
    color:'black'
  },
  link: {
    fontSize: '2rem', 
    fontWeight:'bold',     // Reduced font size for the link
    color: '#007bff',
    textDecoration: 'none',
  },
};

