import React from 'react';
import { Box } from '@mui/material';
import './Loader.css'; // External CSS for animation

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff', // Light background to enhance shape visibility
      }}
    >
      <div className="bouncing-shapes">
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape circle"></div>
      </div>
    </Box>
  );
};

export default Loader;
