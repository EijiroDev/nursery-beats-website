import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, LinearProgress, Icon } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HevcIcon from '@mui/icons-material/Hevc';
import { useCookies } from 'react-cookie';
import axiosClient from '../../Helpers/axios-client';

const MyProgress = () => {

 const [cookie] = useCookies(['?userID']);
 const [shapesProgress, setShapesProgress] = useState(0)
 const [lettersProgress, setLettersProgress] = useState(0)
 const [numbersProgress, setNumbersProgress] = useState(0)

 useEffect(() => {
    fetchMyProgress();
 }, [])

 const fetchMyProgress = async () => {
    try {
    
        const progressResponse = await axiosClient.get(`/student/fetchMyDetails/${cookie['userID']}`);
        if (progressResponse.data) {
            progressResponse.data.forEach((progress) => {
                setShapesProgress(progress?.studentInfo?.shapesProgress);
                setLettersProgress(progress?.studentInfo?.lettersProgress);
                setNumbersProgress(progress?.studentInfo?.numbersProgress);
            });
        }

    } catch (error) {
        console.log(error);
    }
 }

  const progressData = [
    { label: 'Shapes', icon: <CategoryIcon fontSize="large" />, progress: shapesProgress },
    { label: 'Letters', icon: <FormatListNumberedIcon fontSize="large" />, progress: lettersProgress },
    { label: 'Numbers', icon: <HevcIcon fontSize="large" />, progress: numbersProgress },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        align="left"
        sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mb: 4, fontSize: 45 }}
      >
        My Progress
      </Typography>

      <Grid container spacing={3} justifyContent="space-around">
        {progressData.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                padding: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 2,
              }}
            >
              <Box>{item.icon}</Box>
              <Typography sx={{ fontFamily: 'Poppins, sans-serif', mt: 2, fontWeight: 'bold', fontSize: 30 }}>
                {item.label}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{ height: 20, borderRadius: 1}}
                />
              </Box>
              <Typography sx={{ mt: 1, fontFamily: 'Poppins' }}>
                {item.progress}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProgress;
