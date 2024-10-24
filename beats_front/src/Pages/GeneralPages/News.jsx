import React from 'react';
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import NavbarGeneral from '../../Components/NavbarGeneral';
import Loader from '../../Components/Loader';

const News = () => {
  const sampleArticles = [
    {
      title: 'More Update Coming Soon',
      description: 'Check out the latest updates on our platform, including personalized content and multilingual support.',
      image: 'src/assets/bg.jpg', // Replace with your image path
      link: '/news/article1'
    },
    {
      title: 'More Update Coming Soon',
      description: 'Discover how our playful interfaces are helping kids engage and learn more effectively.',
      image: 'src/assets/bg.jpg', // Replace with your image path
      link: '/news/article2'
    },
    // Add more articles here
  ];

  return (
    <div>
      <NavbarGeneral />

      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#f0f8ff', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" color="#2471a3" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Latest News & Updates
          </Typography>
          <Typography variant="h6" component="p" color="black" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay up to date with the latest news, features, and updates from Nursery Beats.
          </Typography>
        </Container>
      </Box>

      {/* News Articles Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" color="#2471a3" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Featured Articles
        </Typography>

        <Grid container spacing={4}>
          {sampleArticles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={4} sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    {article.description}
                  </Typography>
                </CardContent>
                <Button component={''} to={article.link} sx={{ ml: 2, mb: 2 }} size="small" color="primary">
                  Coming Soon
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" color="#2471a3" gutterBottom align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          Categories
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>Updates</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>Features</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>Tips & Tricks</Button>
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
    </div>
  );
};

export default News;
