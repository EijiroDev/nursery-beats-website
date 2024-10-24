import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useCookies } from 'react-cookie';
import axiosClient from '../../Helpers/axios-client';

const MyAchievements = () => {
  const [cookie] = useCookies(['?userID']);
  const [isLittleEinstein, setIsLittleEinstein] = useState(false);

//   useEffect(() => {
//     fetchMyAchievements();
//   }, []);

//   const fetchMyAchievements = async () => {
//     try {
//       const response = await axiosClient.get(`/student/fetchMyAchievements/${cookie['userID']}`);
//       if (response.data) {
//         setIsLittleEinstein(response.data.isLittleEinstein);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        align="left"
        sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mb: 4, fontSize: 45 }}
      >
        My Achievements
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: 3,
              border: '2px solid #ccc',
              borderRadius: 2,
              textAlign: 'center',
              boxShadow: 2,
            }}
          >
            <EmojiEventsIcon fontSize="large" />
            <Typography sx={{ fontFamily: 'Poppins', mt: 2, fontWeight: 'bold', fontSize: 30 }}>
              {isLittleEinstein ? 'Little Einstein Achievement Unlocked' : 'No Achievement Yet'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyAchievements;
