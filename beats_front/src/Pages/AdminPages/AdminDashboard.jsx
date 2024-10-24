import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Avatar, Typography } from '@mui/material';
import { BarChart, Group, School } from '@mui/icons-material'; // Import new icons
import Navbar from '../../Components/Navbar';
import Loader from '../../Components/Loader';
import { useCookies } from 'react-cookie';
import axiosClient from '../../Helpers/axios-client';
import MyProfile from '../TeacherPages/MyProfile';
import Monitoring from '../TeacherPages/Monitoring';
import StudentsInfo from '../TeacherPages/StudentsInfo';
import AnalyticsAndReports from './AnalyticsAndReports';
import UsersManagement from './UsersManagement';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(['userID']);
  const [adminDetails, setAdminDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState('Analytics');

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
      const responseData = await axiosClient.get(`/admin/fetchAdminInfo/${cookie['userID']}`);
      if (responseData.data) {
        setAdminDetails(responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const drawerWidth = 300;

  const navOptions = [
    { name: 'Analytics & Reports', icon: <BarChart />, page: 'Analytics' },
    { name: 'Users', icon: <Group />, page: 'Users' },
    { name: 'Monitoring', icon: <School />, page: 'Monitoring' },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div >
          <Navbar />
          <Box sx={{ display: 'flex' }}>
            {adminDetails.length > 0 ? (
              adminDetails.map((admin) => (
                <Drawer
                  key={admin.adminInfo?.id}
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
                      ADMIN
                    </Typography>
                    <Avatar
                      alt="Admin Avatar"
                      src={admin.adminInfo?.defaultProfile}
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
                      {admin.adminInfo?.firstName} {admin.adminInfo?.lastName}
                    </Typography>
                  </Box>

                  <List sx={{ cursor: 'pointer' }}>
                    {navOptions.map((option) => (
                      <ListItem
                        button
                        key={option.page}
                        onClick={() => handleNavigation(option.page)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'white' }}>
                          {option.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={option.name}
                          sx={{
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              ))
            ) : (
              <Typography>NO ADMIN DATA</Typography>
            )}

            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, fontFamily: 'Poppins, sans-serif' }}
            >
              {currentPage === 'Analytics' && <AnalyticsAndReports />}
              {currentPage === 'Users' && <UsersManagement />}
              {currentPage === 'Monitoring' && <Monitoring />}
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
