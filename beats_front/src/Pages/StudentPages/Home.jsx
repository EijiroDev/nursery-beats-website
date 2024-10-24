import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Box, Typography, Button } from '@mui/material';
import { School, ColorLens, Functions, Games } from '@mui/icons-material'; // Importing icons
import Navbar from '../../Components/Navbar';
import Loader from '../../Components/Loader';
import bgImage from '../../assets/bg.jpg';
import NavbarGeneral from '../../Components/NavbarGeneral';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Keep your existing Navbar */}
          <NavbarGeneral />

          {/* Hero Section */}
          <Box sx={{ backgroundColor: '#f0f8ff', py: 8 }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h3"
                    component="h1"
                    color="#2471a3"
                    gutterBottom
                    sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                  >
                    Learning Just Got Fun
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    color="black"
                    gutterBottom
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Interactive games and activities for your little ones.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#2471a3', color: 'white' }}
                    size="large"
                    component={Link}
                    to="/about"
                  >
                    Learn more
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src={bgImage} alt="Children playing" style={{ width: '100%', height: 'auto' }} />
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* About Section */}
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography variant="h4" component="h2" color="#2471a3" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              About Us
            </Typography>
            <Typography variant="body1" component="p" align="center" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              At Nursery Beats, we believe in nurturing young minds through playful learning. Our activities are
              designed to spark imagination and build essential early learning skills.
            </Typography>
          </Container>

          {/* Games Section with Icons */}
          <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h4" component="h2" color="#2471a3" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Our Supported Teaching By The App
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                  <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <School fontSize="large" sx={{ color: '#2471a3' }} /> {/* Letters Icon */}
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>Letters</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Boost your child's knowledge in terms of letters.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <ColorLens fontSize="large" sx={{ color: '#2471a3' }} /> {/* Shapes Icon */}
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>Shapes</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Teach your child shapes and colors with interactive play.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Functions fontSize="large" sx={{ color: '#2471a3' }} /> {/* Numbers Icon */}
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>Numbers</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      A colorful way to introduce numbers.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Games fontSize="large" sx={{ color: '#2471a3' }} /> {/* More Coming Soon Icon */}
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>More Coming Soon!</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Make learning fun and interactive for kids.
                    </Typography>
                  </Paper>
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
        </>
      )}
    </div>
  );
};

export default Home;
