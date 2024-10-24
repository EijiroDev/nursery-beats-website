import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Avatar, Typography } from '@mui/material';
import { AccountCircle, School, People, EmojiEvents, TrendingUp, ArrowBack } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Loader from '../../Components/Loader';
import { useCookies } from 'react-cookie';
import axiosClient from '../../Helpers/axios-client';
import StudentProfile from './StudentProfile';
import MyProgress from './MyProgress';
import MyAchievements from './MyAchievements';

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(['userID']);
  const [studentDetails, setStundentDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState('Profile'); 

  const navigator = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchMyDetails();
  }, []);

  const fetchMyDetails = async () => {
    try {
      const responseData = await axiosClient.get(`/student/fetchMyDetails/${cookie['userID']}`);
      if (responseData.data) {
        setStundentDetails(responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const drawerWidth = 300;

  return (
    <div>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar type={'userDashboard'}/>
            <Box sx={{ display: 'flex' }}>
              {studentDetails.length > 0 ? (
                studentDetails.map((student) => (
                  <Drawer
                    key={student.teacherInfo?.id}
                    variant="permanent"
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#2980b9',
                        color: 'white',
                        fontFamily: 'Poppins, sans-serif',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'center', p: 2, mt: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 29,
                          mb: 4,
                          mt: 1
                        }}
                      >
                        STUDENT
                      </Typography>
                      <Avatar
                        alt="Teacher Avatar"
                        src={student.studentInfo?.defaultProfile}
                        sx={{ width: 180, height: 180, mx: 'auto', mb: 2 }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 22,
                        }}
                      >
                        {student.studentInfo?.firstName} {student.studentInfo?.lastName}
                      </Typography>
                    </Box>

                    <List sx={{ cursor: 'pointer' }}>
                      <ListItem
                        button
                        onClick={() => handleNavigation('Profile')}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'white' }}>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText
                          primary="My Profile"
                          sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                          }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleNavigation('Progress')}
                        sx={{
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            },
                        }}
                        >
                        <ListItemIcon sx={{ color: 'white' }}>
                            <TrendingUp />
                        </ListItemIcon>
                        <ListItemText
                            primary="My Progress"
                            sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            }}
                        />
                        </ListItem>

                        <ListItem
                        button
                        onClick={() => handleNavigation('Achievements')}
                        sx={{
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            },
                        }}
                        >
                        <ListItemIcon sx={{ color: 'white' }}>
                            <EmojiEvents /> 
                        </ListItemIcon>
                        <ListItemText
                            primary="My Achievements"
                            sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            }}
                        />
                        </ListItem>
                        <ListItem
                        button
                        onClick={() => {
                            navigator('/home')
                        }}
                        sx={{
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            },
                        }}
                        >
                        <ListItemIcon sx={{ color: 'white' }}>
                            <ArrowBack /> 
                        </ListItemIcon>
                        <ListItemText
                            primary="Back"
                            sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            }}
                        />
                        </ListItem>
                    </List>
                  </Drawer>
                ))
              ) : (
                <Typography>NO STUDENT DATA</Typography>
              )}

              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, fontFamily: 'Poppins, sans-serif' }}
              >
                {currentPage === 'Profile' && <StudentProfile />}  
                {currentPage === 'Progress' && <MyProgress />}  
                {currentPage === 'Achievements' && <MyAchievements />}
              </Box>
            </Box>
          </>
        )}
      </>
    </div>
  );
};

export default UserDashboard;
