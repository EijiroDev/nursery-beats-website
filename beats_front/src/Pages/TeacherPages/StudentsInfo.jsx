import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
} from '@mui/material';
import axiosClient from '../../Helpers/axios-client';
import DownloadIcon from '@mui/icons-material/Download';

const StudentsInfo = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [removeUserData, setRemoveUserData] = useState(null);
  const usersPerPage = 4;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userResponse = await axiosClient.get('/teacher/fetchStudents');
      if (userResponse.data) {
        setUserInfo(userResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = userInfo
    .filter((user) => user.studentInfo?.role === selectedRole)
    .filter((user) => {
      const fullName = `${user.studentInfo?.firstName} ${user.studentInfo?.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.studentInfo?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.studentInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleEditOpen = (user) => {
    setEditUserData(user);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditUserData(null);
  };

  const handleSave = async () => {
    try {
      await axiosClient.put(`/teacher/updateStudent/${editUserData.userID}`, editUserData);
      fetchUserInfo();
      handleEditClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveOpen = (user) => {
    setRemoveUserData(user);
    setRemoveModalOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveModalOpen(false);
    setRemoveUserData(null);
  };

  const handleRemoveConfirm = async () => {
    try {
      await axiosClient.delete(`/teacher/removeStudent/${removeUserData.userID}`);
      fetchUserInfo();
      handleRemoveClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to convert user data to CSV format
  const convertToCSV = (data) => {
    const header = [
      'STUDENT ID',
      'ROLE',
      'FULLNAME',
      'USERNAME',
      'EMAIL',
    ].join(',') + '\n';

    const rows = data.map((user) => {
      return [
        user.userID || 'N/A',
        user.studentInfo?.role === 'student' ? 'Student' : 'Teacher',
        `${user.studentInfo?.firstName || 'N/A'} ${user.studentInfo?.lastName || 'N/A'}`,
        user.studentInfo?.userName || '--',
        user.studentInfo?.email || 'N/A',
      ].join(',');
    }).join('\n');

    return header + rows;
  };

  // Function to download CSV
  const downloadCSV = () => {
    const csvData = convertToCSV(filteredUsers);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'students_info.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 'bold' }}>
          STUDENTS DETAILS
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1e8449',
            fontSize: '16px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#145a32',
            },
          }}
          startIcon={<DownloadIcon />}
          onClick={downloadCSV}
        >
          Download as .csv
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3,
          overflow: 'hidden',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 300 }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eaeded' }}>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>STUDENT ID</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>ROLE</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>FULLNAME</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>USERNAME</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>EMAIL</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <TableRow key={user.userID}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}><b>{user.userID}</b></TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{user.studentInfo?.role === 'student' ? 'Student' : 'Teacher'}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{user.studentInfo?.firstName} {user.studentInfo?.lastName}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{user.studentInfo?.userName ? user.studentInfo?.userName : '--'}</TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{user.studentInfo?.email}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ backgroundColor: '#27ae60', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
                          onClick={() => handleEditOpen(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ backgroundColor: '#c0392b', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
                          onClick={() => handleRemoveOpen(user)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      </Box>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent>
          {editUserData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '400px' }}>
              <TextField
                label="First Name"
                value={editUserData.studentInfo?.firstName || ''}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, studentInfo: { ...editUserData.studentInfo, firstName: e.target.value } })
                }
              />
              <TextField
                label="Last Name"
                value={editUserData.studentInfo?.lastName || ''}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, studentInfo: { ...editUserData.studentInfo, lastName: e.target.value } })
                }
              />
              <TextField
                label="Username"
                value={editUserData.studentInfo?.userName || ''}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, studentInfo: { ...editUserData.studentInfo, userName: e.target.value } })
                }
              />
              <TextField
                label="Email"
                value={editUserData.studentInfo?.email || ''}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, studentInfo: { ...editUserData.studentInfo, email: e.target.value } })
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Modal */}
      <Dialog open={removeModalOpen} onClose={handleRemoveClose}>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          {removeUserData && (
            <Typography>
              Are you sure you want to remove <b>{removeUserData.studentInfo?.firstName} {removeUserData.studentInfo?.lastName}</b>?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsInfo;
