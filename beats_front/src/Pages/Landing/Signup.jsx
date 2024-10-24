import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, InputAdornment, IconButton, CircularProgress, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Grid2 } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; 
import Navbar from '../../Components/Navbar';
import backgroundImage from '../../assets/bg.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Footer from '../../Components/Footer';
import axiosClient from '../../Helpers/axios-client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigator = useNavigate();

  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    gender: Yup.string().required('Gender is required'),
    terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  });

  const handleSignUp = async (values) => {
    try {

      setSignUpLoading(true)

      const signUpData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        gender: values.gender,
        userName: values.username
      }

     await axiosClient.post('/auth/registerAccount', signUpData)
     .then(( {data} ) => {
        if(data.succMessage) {
          Swal.fire({
            title: "SUCCESS!",
            text: `${data.succMessage}`,
            icon: "success",
            confirmButtonColor: 'blue',
            confirmButtonText: "Okay!",
          }).then((result) => {
            if(result.isConfirmed || result.isDismissed) {
              setSignUpLoading(false)
              navigator('/login');
            }
          });
        }
     })      

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container sx={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Grid item xs={12} md={6} component={Paper} elevation={6} square sx={{ backgroundColor: '#f4f6f7' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '16px' }}>
            <Typography gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontSize: { xs: 32, md: 48 }, fontWeight: 'bold' }}>
              SIGN-UP
            </Typography>
            <Formik
              initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '', gender: '', terms: false }}
              validationSchema={signUpValidationSchema}
              onSubmit={handleSignUp}
            >
              {({ errors, touched, isValid, isSubmitting, values }) => {
                const [showPassword, setShowPassword] = useState(false);

                return (
                  <Form>
                    <Grid2 container justifyContent= 'center'>
                      <Grid container spacing={3} sx={{ padding: '16px', width: '100%'}}>
                        {/* FNAME */}
                        <Grid item xs={12} md={6}>
                          <Field name="firstName">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                InputLabelProps={{ style: {fontFamily: 'Poppins, sans-serif', fontWeight: 600} }}
                                InputProps={{ style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' } }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* LNAME */}
                        <Grid item xs={12} md={6}>
                          <Field name="lastName">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                InputProps={{ style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' } }}
                                InputLabelProps={{ style: {fontFamily: 'Poppins, sans-serif', fontWeight: 600} }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* USERNAME */}
                        <Grid item xs={12} md={6}>
                          <Field name="username">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Username"
                                variant="outlined"
                                fullWidth
                                error={touched.username && Boolean(errors.username)}
                                InputLabelProps={{ style: {fontFamily: 'Poppins, sans-serif', fontWeight: 600} }}
                                helperText={touched.username && errors.username}
                                InputProps={{ style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' } }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* EMAIL */}
                        <Grid item xs={12} md={6}>
                          <Field name="email">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                InputLabelProps={{ style: {fontFamily: 'Poppins, sans-serif', fontWeight: 600} }}
                                InputProps={{ style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' } }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* PASSWORD */}
                        <Grid item xs={12} md={6}>
                          <Field name="password">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                InputLabelProps={{ style: { fontFamily: 'Poppins, sans-serif', fontWeight: 600 } }}
                                InputProps={{
                                  style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' },
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* CONFIRM PASSWORD */}
                        <Grid item xs={12} md={6}>
                          <Field name="confirmPassword">
                            {({ field }) => (
                              <TextField
                                {...field}
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                InputLabelProps={{ style: { fontFamily: 'Poppins, sans-serif', fontWeight: 600 } }}
                                InputProps={{
                                  style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' },
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                              />
                            )}
                          </Field>
                        </Grid>
                        {/* GENDAH */}
                        <Grid item xs={12} sx={{ marginTop: -2 }}>
                          <Field name="gender">
                            {({ field }) => (
                              <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Gender</InputLabel>
                                <Select
                                  {...field}
                                  label="Gender"
                                  error={touched.gender && Boolean(errors.gender)}
                                >
                                  <MenuItem value="male" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Male</MenuItem>
                                  <MenuItem value="female" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Female</MenuItem>
                                </Select>
                                {touched.gender && errors.gender && (
                                  <Typography color="error">{errors.gender}</Typography>
                                )}
                              </FormControl>
                            )}
                          </Field>
                        </Grid>
                        {/* TERMS CHECKBOX */}
                        <Grid item xs={12}>
                          <Field name="terms">
                            {({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={
                                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    I accept the <a href="/terms" style={{ color: 'blue', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Terms and Conditions</a>
                                  </span>
                                }
                                error={touched.terms && Boolean(errors.terms)}
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid || isSubmitting || !values.terms || signUpLoading}
                        sx={{
                          marginTop: 2,
                          padding: '16px',
                          background: 'linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,204,255,1) 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,123,255,1) 100%)',
                          },
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 'bold',
                          opacity: !isValid || isSubmitting || !values.terms || signUpLoading ? 0.7 : 1,
                          cursor: !isValid || isSubmitting || !values.terms  || signUpLoading? 'not-allowed' : 'pointer',
                          marginBottom: 1,
                          maxWidth: 780
                        }}
                        fullWidth
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 'bold',
                            fontSize: { xs: 15, md: 18 },
                            padding: 0.5,
                            visibility: signUpLoading ? "hidden" : "visible",
                          }}
                        >
                          SIGN UP
                        </Typography>
                        {signUpLoading && (
                          <CircularProgress
                            size={24}
                            color="inherit"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-12px",
                            }}
                          />
                        )}
                      </Button>
                    </Grid2>
                  </Form>
                );
              }}
            </Formik>
            <Typography sx={{ marginTop: 2, textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
              Already have an account? <a href="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Login now</a>
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      <Footer />
    </div>
  );
};

export default Signup;
