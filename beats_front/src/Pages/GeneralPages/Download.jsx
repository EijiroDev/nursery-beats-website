import React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import NavbarGeneral from '../../Components/NavbarGeneral';
import Loader from '../../Components/Loader';

const Download = () => {

  const handleDownload = () => {
    // Replace with your actual APK file path
    const fileUrl = '/Download/NursrBeats_.apk';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'NursrBeats_.apk'); // Use the desired file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <NavbarGeneral />

      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#f0f8ff', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            color="#2471a3"
            gutterBottom
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
          >
            Download Nursery Beats App
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="black"
            sx={{ fontFamily: 'Poppins, sans-serif', maxWidth: '700px', margin: 'auto', mb: 4 }}
          >
            Get the latest version of the Nursery Beats app and start exploring our engaging and fun educational platform on your mobile device!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: 'none', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', px: 4, py: 1.5 }}
            onClick={handleDownload} // Trigger the download function
          >
            Download APK
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          color="#2471a3"
          gutterBottom
          align="center"
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
        >
          Why Nursery Beats?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography
                variant="h6"
                component="p"
                color="#2471a3"
                sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Playful Learning
              </Typography>
              <Typography
                variant="body2"
                color="black"
                sx={{ fontFamily: 'Poppins, sans-serif', mt: 1, lineHeight: 1.6 }}
              >
                Learn through engaging and interactive games and activities tailored for children.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography
                variant="h6"
                component="p"
                color="#2471a3"
                sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Parent Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="black"
                sx={{ fontFamily: 'Poppins, sans-serif', mt: 1, lineHeight: 1.6 }}
              >
                Track your child’s progress and get personalized recommendations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography
                variant="h6"
                component="p"
                color="#2471a3"
                sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Different Game Modes
              </Typography>
              <Typography
                variant="body2"
                color="black"
                sx={{ fontFamily: 'Poppins, sans-serif', mt: 1, lineHeight: 1.6 }}
              >
                Use the app to target and maximize their skills base on Alphabets, Numbers, and Shapes, ensuring continuous learning for your child.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* App Preview Section */}
      <Box sx={{ backgroundColor: '#eef7fa', py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            color="#2471a3"
            gutterBottom
            align="center"
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
          >
            Take a Sneak Peek
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="src/assets/bg.jpg" // Replace with actual image path
                  alt="App Preview 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="src/assets/bg.jpg" // Replace with actual image path
                  alt="App Preview 2"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#333', py: 4 }}>
        <Container maxWidth="lg" sx={{ color: 'white', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Contact Us: info@nurserybeats.com
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Follow Us on Social Media
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Download;
