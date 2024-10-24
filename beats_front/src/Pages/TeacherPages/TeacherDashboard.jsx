import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Avatar, Typography } from '@mui/material';
import { AccountCircle, School, People } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Loader from '../../Components/Loader';
import { useCookies } from 'react-cookie';
import axiosClient from '../../Helpers/axios-client';
import MyProfile from './MyProfile';
import Monitoring from './Monitoring';
import StudentsInfo from './StudentsInfo';

const TeacherDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(['userID']);
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState('Monitoring'); 

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
      const responseData = await axiosClient.get(`/teacher/fetchTeacherAccountDetails/${cookie['userID']}`);
      if (responseData.data) {
        setTeacherDetails(responseData.data);
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
            <Navbar />
            <Box sx={{ display: 'flex' }}>
              {teacherDetails.length > 0 ? (
                teacherDetails.map((teacher) => (
                  <Drawer
                    key={teacher.teacherInfo?.id}
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
                        TEACHER
                      </Typography>
                      <Avatar
                        alt="Teacher Avatar"
                        src={teacher.teacherInfo?.defaultProfile}
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
                        {teacher.teacherInfo?.firstName} {teacher.teacherInfo?.lastName}
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
                        onClick={() => handleNavigation('Monitoring')}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'white' }}>
                          <School />
                        </ListItemIcon>
                        <ListItemText
                          primary="Monitoring"
                          sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                          }}
                        />
                      </ListItem>

                      <ListItem
                        button
                        onClick={() => handleNavigation('Students')}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'white' }}>
                          <People />
                        </ListItemIcon>
                        <ListItemText
                          primary="Students"
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
                <Typography>NO TEACHER DATA</Typography>
              )}

              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, fontFamily: 'Poppins, sans-serif' }}
              >
                {currentPage === 'Profile' && <MyProfile />}  
                {currentPage === 'Monitoring' && <Monitoring />}  
                {currentPage === 'Students' && <StudentsInfo />}
              </Box>
            </Box>
          </>
        )}
      </>
    </div>
  );
};

export default TeacherDashboard;
