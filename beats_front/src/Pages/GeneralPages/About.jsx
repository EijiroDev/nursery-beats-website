import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import NavbarGeneral from '../../Components/NavbarGeneral';
import Loader from '../../Components/Loader';

const About = () => {
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
          <NavbarGeneral />

          {/* Hero Section */}
          <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
            <Container maxWidth="lg">
              <Typography
                variant="h3"
                component="h1"
                color="#2471a3"
                align="center"
                gutterBottom
                sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
                About Nursery Beats
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="black"
                align="center"
                gutterBottom
                sx={{ fontFamily: 'Poppins, sans-serif', maxWidth: '700px', margin: 'auto' }}
              >
                Nursery Beats is dedicated to revolutionizing early childhood education through playful, interactive, and creative learning experiences for kids, parents, and teachers.
              </Typography>
            </Container>
          </Box>

          {/* Mission Section */}
          <Container sx={{ py: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              color="#2471a3"
              gutterBottom
              align="center"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
            >
              Our Mission
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  component="p"
                  color="black"
                  sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.7 }}
                >
                  At Nursery Beats, our mission is to foster a love for learning in children by providing them with engaging and interactive educational tools.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  component="p"
                  color="black"
                  sx={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.7 }}
                >
                  Our platform is designed to help children thrive in a safe and supportive environment, while also offering resources for parents and educators.
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {/* Values Section */}
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
                Our Values
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
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
                      sx={{ fontFamily: 'Poppins, sans-serif', mt: 1 }}
                    >
                      We integrate play into education to create engaging and fun learning experiences.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography
                      variant="h6"
                      component="p"
                      color="#2471a3"
                      sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Inclusivity
                    </Typography>
                    <Typography
                      variant="body2"
                      color="black"
                      sx={{ fontFamily: 'Poppins, sans-serif', mt: 1 }}
                    >
                      We aim to make our platform accessible to children of all backgrounds and abilities.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography
                      variant="h6"
                      component="p"
                      color="#2471a3"
                      sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Collaboration
                    </Typography>
                    <Typography
                      variant="body2"
                      color="black"
                      sx={{ fontFamily: 'Poppins, sans-serif', mt: 1 }}
                    >
                      We work closely with educators, parents, and children to continually improve and evolve.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography
                      variant="h6"
                      component="p"
                      color="#2471a3"
                      sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Innovation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="black"
                      sx={{ fontFamily: 'Poppins, sans-serif', mt: 1 }}
                    >
                      We are always looking for new ways to make learning exciting and effective for children.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Join Us Section */}
          <Container sx={{ py: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              color="#2471a3"
              gutterBottom
              align="center"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
            >
              Join Our Journey
            </Typography>
            <Typography
              variant="body1"
              color="black"
              align="center"
              sx={{ fontFamily: 'Poppins, sans-serif', maxWidth: '700px', margin: 'auto', lineHeight: 1.7 }}
            >
              Whether you’re a parent, teacher, or passionate about education, we invite you to be part of our journey.
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
            </Box>
          </Container>

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

export default About;
