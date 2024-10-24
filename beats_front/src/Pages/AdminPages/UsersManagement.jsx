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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosClient from '../../Helpers/axios-client';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

const UsersManagement = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false); // Modal for editing
  const [editUser, setEditUser] = useState(null); // User being edited

  // New states for adding teacher modal
  const [openAddModal, setOpenAddModal] = useState(false); // Modal for adding teacher
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'male',
  });

  const [openRemoveModal, setOpenRemoveModal] = useState(false); // Modal for removing user
  const [removeUser, setRemoveUser] = useState(null); // User being removed

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const usersPerPage = 4;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userResponse = await axiosClient.get('/admin/fetchUsers');
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

  // For editing user
  const handleEditUser = (user) => {
    setEditUser(user);
    setOpenEditModal(true);
  };

  const handleEditSave = async () => {
    if (!editUser) return;

    try {
      const payload = {
        firstName: editUser.userInfo?.firstName.trim() || '',
        lastName: editUser.userInfo?.lastName.trim() || '',
        email: editUser.userInfo?.email.trim() || '',
      };

      const response = await axiosClient.put(`/admin/updateUser/${editUser.userID}`, payload);

      if (response.status === 200) {
        fetchUserInfo(); // Refresh user list
        setSnackbarMessage('User updated successfully');
        setSnackbarSeverity('success');
        setOpenEditModal(false); // Close modal on success
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbarMessage('Failed to update user');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  // For adding a new teacher
  const handleAddTeacherOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddTeacherClose = () => {
    setOpenAddModal(false);
    setNewTeacher({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: 'male',
    });
  };

  const handleAddTeacherChange = (event) => {
    const { name, value } = event.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleAddTeacherSave = async () => {
    try {
      const response = await axiosClient.post('/admin/addTeacherAccount', newTeacher);
      if (response.data) {
        fetchUserInfo();
        setSnackbarMessage(response.data.message || 'Teacher added successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
      setSnackbarMessage('Failed to add teacher');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    handleAddTeacherClose();
  };

  // For removing a user
  const handleRemoveUser = (user) => {
    setRemoveUser(user);
    setOpenRemoveModal(true);
  };

  const handleRemoveUserConfirm = async () => {
    try {
      // Ensure that userID exists
      if (!removeUser?.userID) {
        throw new Error('Invalid user ID');
      }

      // Log the user ID to check if it's correctly passed
      console.log('Removing user with ID:', removeUser.userID);

      const response = await axiosClient.delete(`/admin/removeUser/${removeUser.userID}`);

      if (response.status === 200) {
        fetchUserInfo();
        setSnackbarMessage('User removed successfully');
        setSnackbarSeverity('success');
      } else {
        throw new Error('Failed to remove user. Please try again.');
      }
    } catch (error) {
      console.error('Error removing user:', error);
      setSnackbarMessage(error.response?.data?.message || 'Failed to remove user');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setOpenRemoveModal(false);
    }
  };


  const handleRemoveModalClose = () => {
    setOpenRemoveModal(false);
    setRemoveUser(null);
  };

  const filteredUsers = userInfo
    .filter((user) => user.userInfo?.role === selectedRole)
    .filter((user) => {
      const fullName = `${user.userInfo?.firstName} ${user.userInfo?.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.userInfo?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <Box sx={{ p: 3 }}>
      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 'bold' }}>
          USER MANAGEMENT
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
        >
          Download as .csv
        </Button>
      </Box>

      {/* Add Teacher Modal */}
      <Dialog open={openAddModal} onClose={handleAddTeacherClose}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
            value={newTeacher.firstName}
            onChange={handleAddTeacherChange}
            required
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={newTeacher.lastName}
            onChange={handleAddTeacherChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newTeacher.email}
            onChange={handleAddTeacherChange}
            required
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newTeacher.password}
            onChange={handleAddTeacherChange}
            required
          />
          <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              name="gender"
              value={newTeacher.gender}
              onChange={handleAddTeacherChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTeacherClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTeacherSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                fullWidth
                variant="outlined"
                value={editUser.userInfo.firstName}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    userInfo: { ...editUser.userInfo, firstName: e.target.value },
                  })
                }
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                variant="outlined"
                value={editUser.userInfo.lastName}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    userInfo: { ...editUser.userInfo, lastName: e.target.value },
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                value={editUser.userInfo.email}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    userInfo: { ...editUser.userInfo, email: e.target.value },
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove User Modal */}
      <Dialog open={openRemoveModal} onClose={handleRemoveModalClose}>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove{' '}
            <strong>
              {removeUser?.userInfo?.firstName} {removeUser?.userInfo?.lastName}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRemoveUserConfirm} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: 300 }}
            />

            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRole}
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {selectedRole === 'teacher' && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2874a6',
                fontSize: '16px',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#2e86c1',
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleAddTeacherOpen}
            >
              ADD TEACHER
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eaeded' }}>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  USER ID
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  ROLE
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  FULL NAME
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  USERNAME
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  EMAIL
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <TableRow key={user.userID}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <b>{user.userID}</b>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user.userInfo?.role}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user.userInfo?.firstName} {user.userInfo?.lastName}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user.userInfo?.userName || '--'}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user.userInfo?.email}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{
                            backgroundColor: '#c0392b',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#e74c3c',
                            },
                          }}
                          onClick={() => handleRemoveUser(user)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    NO USER DATA FOUND...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersManagement;
