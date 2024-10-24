import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, ButtonGroup, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from '../../Helpers/axios-client'; // Assuming you have this setup for API requests

const AnalyticsAndReports = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedProgressType, setSelectedProgressType] = useState('shapes');

  const data = {
    shapes: [
      { name: 'Monday', progress: 10 },
      { name: 'Tuesday', progress: 20 },
      { name: 'Wednesday', progress: 15 },
      { name: 'Thursday', progress: 30 },
      { name: 'Friday', progress: 25 },
      { name: 'Saturday', progress: 40 },
      { name: 'Sunday', progress: 35 },
    ],
    letters: [
      { name: 'Monday', progress: 12 },
      { name: 'Tuesday', progress: 18 },
      { name: 'Wednesday', progress: 20 },
      { name: 'Thursday', progress: 25 },
      { name: 'Friday', progress: 15 },
      { name: 'Saturday', progress: 35 },
      { name: 'Sunday', progress: 30 },
    ],
    numbers: [
      { name: 'Monday', progress: 8 },
      { name: 'Tuesday', progress: 15 },
      { name: 'Wednesday', progress: 25 },
      { name: 'Thursday', progress: 10 },
      { name: 'Friday', progress: 30 },
      { name: 'Saturday', progress: 25 },
      { name: 'Sunday', progress: 20 },
    ],
  };

  // Fetch total users from API or Firebase
  const fetchTotalUsers = async () => {
    try {
      const response = await axiosClient.get('/admin/fetchUsers');
      if (response.data) {
        // Assuming response.data contains the list of users
        setTotalUsers(response.data.length);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers(); // Fetch data when component mounts
  }, []);

  const handleProgressTypeChange = (type) => {
    setSelectedProgressType(type);
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ display: 'flex', mb: 3 }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 40,
          }}
        >
          ANALYTICS AND REPORTS
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#ec7063', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{totalUsers}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f7dc6f', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <SportsEsportsIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>0</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Game Completers</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#58d68d', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>0</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Achievers</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Type Selector */}
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', mb: 2 }}>
          Weekly Progress (Choose Category)
        </Typography>
        <ButtonGroup sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Button
            onClick={() => handleProgressTypeChange('shapes')}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              padding: '10px 20px',
              backgroundColor: selectedProgressType === 'shapes' ? '#4caf50' : '#e0e0e0',
              color: selectedProgressType === 'shapes' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: selectedProgressType === 'shapes' ? '#43a047' : '#f5f5f5',
              },
              border: '1px solid #e0e0e0',
            }}
          >
            Shapes
          </Button>
          <Button
            onClick={() => handleProgressTypeChange('letters')}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              padding: '10px 20px',
              backgroundColor: selectedProgressType === 'letters' ? '#1976d2' : '#e0e0e0',
              color: selectedProgressType === 'letters' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: selectedProgressType === 'letters' ? '#1565c0' : '#f5f5f5',
              },
              border: '1px solid #e0e0e0',
            }}
          >
            Letters
          </Button>
          <Button
            onClick={() => handleProgressTypeChange('numbers')}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              padding: '10px 20px',
              backgroundColor: selectedProgressType === 'numbers' ? '#ff9800' : '#e0e0e0',
              color: selectedProgressType === 'numbers' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: selectedProgressType === 'numbers' ? '#fb8c00' : '#f5f5f5',
              },
              border: '1px solid #e0e0e0',
            }}
          >
            Numbers
          </Button>
        </ButtonGroup>
      </Box>

      {/* Bar Chart Section for Weekly Progress */}
      <Box sx={{ mt: 5 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data[selectedProgressType]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="progress" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AnalyticsAndReports;
