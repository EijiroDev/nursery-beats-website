import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../../Helpers/axios-client';
import Swal from 'sweetalert2';

const ForgotPassword = ({ open, onClose, zIndex }) => {
  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    try {

      axiosClient.post('/auth/forgotPassword', {email: values.email})
      .then(({data}) => {
        Swal.fire({
          title: "Nice!",
          text: `${data.message}`,
          icon: "success",
          confirmButtonColor: 'blue',
          confirmButtonText: "Okay!",
        }).then((result) => {
          if(result.isConfirmed || result.isDismissed) {
            setIsLoggingIn(false)
            onClose()
          }
        });
      });
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ zIndex: zIndex }}>
      <DialogTitle sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>FORGOT PASSWORD</DialogTitle>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Typography sx={{ mb: 2, fontFamily: 'Poppins' }}>
                Please enter your email address to receive a password reset link.
              </Typography>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" sx={{ fontFamily: 'Poppins' }}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ForgotPassword;
