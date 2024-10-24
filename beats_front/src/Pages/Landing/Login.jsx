import React, { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { Typography, TextField, Button, Grid, Paper, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../Components/Navbar';
import backgroundImage from '../../assets/bg.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Footer from '../../Components/Footer';
import axiosClient from '../../Helpers/axios-client';
import Swal from 'sweetalert2'
import { useStateContext } from '../../Helpers/ContextAPI';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../../Components/Modals/ForgotPassword';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [isLogginIn, setIsLoggingIn] = useState(false);
  const [sessionLogin, setSessionLogin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [forgotDialog, setForgotDialog] = useState(false)

  const { setToken, setUser, setUserID, setRole } = useStateContext();
  const [cookie, setCookie] = useCookies(['sessionID', 'role', 'userID', 'firstName']);

  const navigator = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    //check if may last logged in user session
    cookie['sessionID'] ? setIsUser(true) : setIsUser(false)

  }, [])

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {

      setSessionLogin(false)
      setIsLoggingIn(true)
      await axiosClient.post('/auth/loginAccount', { email: values.email, password: values.password })
        .then(({ data }) => {
          if (data.userInfo) {

            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000); // 1day

            setUser(data.userInfo);
            setToken(data.userToken);
            setUserID(data.userID);
            setRole(data.userRole);

            setCookie("sessionID", data.userToken, {
              path: "/",
              expires: expirationDate,
            });

            setCookie("userID", data.userID, { path: "/", expires: expirationDate });
            setCookie("role", data.userRole, { path: "/", expires: expirationDate });
            setCookie("firstName", data.userInfo.firstName, { path: "/", expires: expirationDate });

          } else {
            Swal.fire({
              title: "OOPS!",
              text: `${data.errMessage}`,
              icon: "error",
              confirmButtonColor: 'blue',
              confirmButtonText: "Okay!",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                setIsLoggingIn(false)
              }
            });
          }
        });

    } catch (error) {
      console.log(error);
    }
  }

  const handleLoginIfSession = () => {

    setSessionLogin(true)

    setTimeout(() => {

      if (!cookie['sessionID']) {
        Swal.fire({
          title: "OOPS!",
          text: 'Something wrong with the server',
          icon: "error",
          confirmButtonColor: 'blue',
          confirmButtonText: "Okay!",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            setIsLoggingIn(false)
            setSessionLogin(false)
            window.location.reload();
          }
        });
      } else {
        setToken(cookie['sessionID']);
        setUserID(cookie['userID']);
        setRole(cookie['role']);

        navigator('/home')
        setSessionLogin(false)
      }

    }, 1000)
  }

  const handleOpenForgotDialog = () => setForgotDialog(true)
  const handleCloseForgotDialog = () => setForgotDialog(false)

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Grid container sx={{ minHeight: '100vh', overflow: 'hidden' }}>
            <Grid item xs={12} md={6} component={Paper} elevation={6} square sx={{ backgroundColor: '#f4f6f7' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '16px' }}>
                <Typography gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontSize: { xs: 32, md: 48 }, fontWeight: 'bold' }}>
                  LOGIN
                </Typography>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginValidationSchema}
                  onSubmit={handleLogin}
                >
                  {({ errors, touched, isValid, isSubmitting, values }) => {
                    const [showPassword, setShowPassword] = useState(false);

                    return (
                      <Form >
                        <Field name="email">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Email"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              InputProps={{ style: { fontSize: 18, fontFamily: 'Poppins, sans-serif' } }}
                              sx={{ '& .MuiOutlinedInput-root': { height: '56px' } }}
                            />
                          )}
                        </Field>
                        <Field name="password">
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Password"
                              type={showPassword ? 'text' : 'password'}
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              error={touched.password && Boolean(errors.password)}
                              helperText={touched.password && errors.password}
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
                        {/* if may user show natin yung button para sa quick login */}
                        {isUser ? (
                          <>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={!isValid || isSubmitting || values.email.length === 0 || values.password.length === 0}
                              sx={{
                                marginTop: 2,
                                padding: '16px',
                                background: 'linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,204,255,1) 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,123,255,1) 100%)',
                                },
                                fontSize: 18,
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                opacity: !isValid || isSubmitting || values.email.length === 0 || values.password.length === 0 ? 0.7 : 1,
                                cursor: !isValid || isSubmitting || values.email.length === 0 || values.password.length === 0 ? 'not-allowed' : 'pointer',
                                marginBottom: 1
                              }}
                              fullWidth
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 'bold',
                                  fontSize: { xs: 15, md: 18 },
                                  padding: 0.5,
                                  visibility: isLogginIn ? "hidden" : "visible",
                                }}
                              >
                                LOGIN
                              </Typography>
                              {isLogginIn && (
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
                            <Button
                              variant="contained"
                              disabled={!isValid || isSubmitting}
                              onClick={() => handleLoginIfSession()}
                              sx={{
                                marginTop: 2,
                                padding: '16px',
                                background: 'linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,204,255,1) 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,123,255,1) 100%)',
                                },
                                fontSize: 18,
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                opacity: !isValid || isSubmitting ? 0.7 : 1,
                                cursor: !isValid || isSubmitting ? 'not-allowed' : 'pointer',
                                marginBottom: 1
                              }}
                              fullWidth
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 'bold',
                                  fontSize: { xs: 15, md: 18 },
                                  padding: 0.5,
                                  visibility: sessionLogin ? "hidden" : "visible",
                                }}
                              >
                                CONTINUE AS {cookie['firstName']}
                              </Typography>
                              {sessionLogin && (
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
                          </>
                        ) : (
                          <>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={!isValid || isSubmitting || values.email.length === 0 || values.password.length === 0}
                              sx={{
                                marginTop: 2,
                                padding: '16px',
                                background: 'linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,204,255,1) 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,123,255,1) 100%)',
                                },
                                fontSize: 18,
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                opacity: !isValid || isSubmitting || values.email.length === 0 || values.password.length === 0 ? 0.7 : 1,
                                cursor: !isValid || isSubmitting || values.email.length === 0 || values.password.length === 0 ? 'not-allowed' : 'pointer',
                                marginBottom: 1,
                                minWidth: 200
                              }}
                              fullWidth
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 'bold',
                                  fontSize: { xs: 15, md: 18 },
                                  padding: 0.5,
                                  visibility: isLogginIn ? "hidden" : "visible",
                                }}
                              >
                                LOGIN
                              </Typography>
                              {isLogginIn && (
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
                          </>
                        )}
                      </Form>
                    );
                  }}
                </Formik>
                <Typography sx={{ marginTop: 2, textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                  Don't have an account? <a href="/signup" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sign up now</a>
                </Typography>
                <Typography
                  sx={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', mt: 2, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => handleOpenForgotDialog()}
                >
                  Forgot password?
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
          <ForgotPassword open={forgotDialog} onClose={handleCloseForgotDialog} zIndex={1000} />
        </>
      )}
    </div>
  );
};

export default Login;
