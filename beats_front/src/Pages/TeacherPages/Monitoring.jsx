import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  TextField,
  Pagination,
  Button,
} from '@mui/material';
import axiosClient from '../../Helpers/axios-client';

const AllStudentsProgress = () => {
  const [studentsProgress, setStudentsProgress] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchAllStudentsProgress();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, studentsProgress]);

  const fetchAllStudentsProgress = async () => {
    try {
      const response = await axiosClient.get('/teacher/fetchAllStudentsProgress');
      setStudentsProgress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterStudents = () => {
    const filtered = studentsProgress.filter((student) => {
      const fullName = `${student.studentInfo.firstName} ${student.studentInfo.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        student.studentInfo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentInfo.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStudents(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const currentStudents = filteredStudents.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        align="left"
        sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mb: 4, fontSize: 45 }}
      >
        All Students' Progress
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search by Name, Username, or Email"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="students progress table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eaeded' }}>
              <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>STUDENT ID</TableCell>
              <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>USERNAME</TableCell>
              <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>STUDENT NAME</TableCell>
              <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>EMAIL</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>SHAPES PROGRESS</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>LETTERS PROGRESS</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>NUMBERS PROGRESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{student.userID}</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{student.studentInfo.userName || 'N/A'}</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }} component="th" scope="row">
                  {student.studentInfo.firstName} {student.studentInfo.lastName}
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{student.studentInfo.email || 'N/A'}</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  <LinearProgress
                    variant="determinate"
                    value={student.studentInfo.shapesProgress}
                    sx={{ height: 10, borderRadius: 1 }}
                  />
                  <Typography>{student.studentInfo.shapesProgress}%</Typography>
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  <LinearProgress
                    variant="determinate"
                    value={student.studentInfo.lettersProgress}
                    sx={{ height: 10, borderRadius: 1 }}
                  />
                  <Typography>{student.studentInfo.lettersProgress}%</Typography>
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  <LinearProgress
                    variant="determinate"
                    value={student.studentInfo.numbersProgress}
                    sx={{ height: 10, borderRadius: 1 }}
                  />
                  <Typography>{student.studentInfo.numbersProgress}%</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            variant="outlined"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default AllStudentsProgress;
