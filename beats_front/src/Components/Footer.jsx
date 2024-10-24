import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        padding: '20px 0',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        color: 'white',
      }}
    >
      <Container>
        <Typography variant="h6" gutterBottom>
          Nursery Beats
        </Typography>
        <Typography variant="body1">
          © {new Date().getFullYear()} Nursery Beats. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Follow us on social media:
          <a href="" style={{ margin: '0 10px', color: 'white' }}>Facebook</a>
          <a href="" style={{ margin: '0 10px', color: 'white' }}>Twitter</a>
          <a href="" style={{ margin: '0 10px', color: 'white' }}>Instagram</a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
