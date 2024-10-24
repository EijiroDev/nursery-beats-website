import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Grid, MenuItem, Typography, CircularProgress } from '@mui/material';
import * as Yup from 'yup';
import axiosClient from '../../Helpers/axios-client';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
});

const MyProfile = () => {

    const [cookie] = useCookies(['userID']);
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false)
    const [myDetails, setMyDetails] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        fetchMyDetails();
    }, [])

    const fetchMyDetails = async () => {
        try {
            const responseData = await axiosClient.get(`/teacher/fetchTeacherAccountDetails/${cookie['userID']}`);
            if (responseData.data) {
                setMyDetails(responseData.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateProfile = async (values) => {
        try {

            const newData = {
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                uid: cookie['userID']
            };

            setUpdateProfileLoading(true)
            await axiosClient.post('/teacher/updateMyProfile', newData)
                .then(({ data }) => {
                    Swal.fire({
                        title: "Success!",
                        text: `${data.message} Please refresh the page.`,
                        icon: "success",
                        confirmButtonColor: 'blue',
                        confirmButtonText: "Okay!",
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            setUpdateProfileLoading(false);
                            navigator('/user-dashboard');
                        }
                    });
                });

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            {myDetails.length > 0 ? (
                myDetails.map((data) => (
                    <>
                        <Formik
                            initialValues={{
                                firstName: data.teacherInfo?.firstName || '',
                                lastName: data.teacherInfo?.lastName || '',
                                gender: data.teacherInfo?.gender.toLowerCase() || '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleUpdateProfile(values)
                            }}
                        >
                            {({ errors, touched, handleChange, handleSubmit, isValid, isSubmitting, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Poppins, sans-serif',
                                                    fontWeight: 'bold',
                                                    textAlign: 'left',
                                                    fontSize: 45,
                                                    mb: 2
                                                }}
                                            >
                                                MY INFORMATION
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                variant="outlined"
                                                error={touched.firstName && Boolean(errors.firstName)}
                                                helperText={touched.firstName && errors.firstName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                variant="outlined"
                                                error={touched.lastName && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                onChange={(event) => {
                                                    handleChange(event);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                select
                                                label="Gender"
                                                name="gender"
                                                variant="outlined"
                                                error={touched.gender && Boolean(errors.gender)}
                                                helperText={touched.gender && errors.gender}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="" selected >Select Gender</MenuItem>
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                sx={{
                                                    background: 'linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(0,204,255,1) 100%)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: 'linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(0,123,255,1) 100%)',
                                                    },
                                                    fontFamily: 'Poppins, sans-serif',
                                                    fontWeight: 'bold',
                                                    padding: '14px'
                                                }}
                                                disabled={isSubmitting || !isValid}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Poppins, sans-serif",
                                                        fontWeight: 'bold',
                                                        fontSize: { xs: 15, md: 18 },
                                                        padding: 0.5,
                                                        visibility: updateProfileLoading ? "hidden" : "visible",
                                                    }}
                                                >
                                                    UPDATE MY PROFILE
                                                </Typography>
                                                {updateProfileLoading && (
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
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </>
                ))

            ) : (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                    fontSize: 45,
                                    mb: 2
                                }}
                            >
                                MY INFORMATION
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            Loading...
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
};

export default MyProfile;
