import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Star, Person, Settings, Language, Timeline } from '@mui/icons-material';
import NavbarGeneral from '../../Components/NavbarGeneral';
import Loader from '../../Components/Loader';
import featureImage from '../../assets/bg.jpg'; // Replace with the actual image

const Features = () => {
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
          {/* Navbar */}
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
                    Discover Exciting Features
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    color="black"
                    gutterBottom
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Explore how our platform can make learning enjoyable, personalized, and fun.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src={featureImage} alt="Feature overview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Features Section */}
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Typography variant="h4" component="h2" color="#2471a3" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Key Features
            </Typography>
            <Typography variant="body1" component="p" align="center" color="textSecondary" sx={{ mb: 4, fontFamily: 'Poppins, sans-serif' }}>
              We are committed to making education accessible, enjoyable, and effective for children everywhere.
            </Typography>
            <Grid container spacing={4}>
              {/* Feature 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Star sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Interactive Learning</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Engage with hands-on activities, games, and content designed to make learning fun and engaging.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Person sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Personalized Content</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Tailor the experience to each child's needs with custom lessons and progress tracking.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Settings sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Playful Interface</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Our fun, colorful interface keeps children engaged and makes learning easy to navigate.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 4 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Timeline sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Progress Tracking</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      Track your child's progress and celebrate their learning milestones easily.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 5 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Language sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Global Language</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      English as the main language to provide support to help children around the school access learning.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 6 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: '100%' }}>
                  <CardMedia sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Star sx={{ fontSize: 50, color: '#2471a3' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>More Coming Soon!</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      We're constantly adding new features to keep learning fun and exciting!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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

export default Features;
