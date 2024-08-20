import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box, Button, Container, CssBaseline, Grid, Snackbar, TextField, Typography, Alert, ThemeProvider, createTheme,
} from '@mui/material';
import CountrySelect from './CountrySelect';
import StateSelect from './StateSelect';
import CitySelect from './CitySelect';
import { InputFiled } from './Create';
import { updateSubUser } from '../../userData/subUserSlice';

const defaultTheme = createTheme();

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL params
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subUser = useAppSelector((state) => state.subuser.subusers.find((user) => user.id === id));

  const { register, handleSubmit, setValue, trigger, formState: { errors }, clearErrors, watch } = useForm<InputFiled>({
    defaultValues: {
      fullName: '',
      emailAdress: '',
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      company: '',
    },
  });

  useEffect(() => {
    if (subUser) {
      // Pre-fill form with subuser data
      setValue('fullName', subUser.fullName);
      setValue('emailAdress', subUser.emailAdress);
      setValue('phoneNumber', subUser.phoneNumber);
      setValue('country', subUser.country);
      setValue('state', subUser.state);
      setValue('city', subUser.city);
      setValue('zipCode', subUser.zipCode);
      setValue('company', subUser.company);
    }
  }, [subUser, setValue]);

  const updateRecord: SubmitHandler<InputFiled> = (data) => {

    console.log("data------->", data, subUser, id);

    dispatch(updateSubUser({ ...data, id: id as string }));
    navigate('/user/list'); // Redirect to the list page
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6">Edit User</Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(updateRecord)}>
            <Grid container spacing={2}>
              {/* Full Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  variant="filled"
                  {...register('fullName', { required: 'Full Name is required' })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  onChange={(e) => trigger('fullName')}
                />
              </Grid>

              {/* Email Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="emailAdress"
                  label="Email Address"
                  variant="filled"
                  {...register('emailAdress', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Email format"
                    },
                  })}
                  error={!!errors.emailAdress}
                  helperText={errors.emailAdress?.message}
                  onChange={(e) => trigger('emailAdress')}
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  variant="filled"
                  {...register('phoneNumber', {
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Phone Number must be between 10-12 digits',
                    },
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  onChange={(e) => trigger('phoneNumber')}
                />
              </Grid>

              {/* Country */}
              <Grid item xs={12} sm={6}>
                <CountrySelect
                  value={watch('country')} // Get the current country value from form state
                  onChange={(event, newValue) => setValue('country', newValue || '')} // Convert null to an empty string
                  error={!!errors.country} // Pass error state
                  helperText={errors.country?.message} // Pass error message
                />
              </Grid>

              {/* State */}
              <Grid item xs={12} sm={6}>
                <StateSelect
                  value={watch('state')}
                  onChange={(event, newValue) => setValue('state', newValue || '')}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  country={watch('country')} // Pass the selected country to filter states
                />
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={6}>
                <CitySelect
                  value={watch('city')}
                  onChange={(event, newValue) => setValue('city', newValue || '')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  state={watch('state')} // Pass the selected state to filter cities
                />
              </Grid>

              {/* Zip Code */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  variant="filled"
                  {...register('zipCode', { required: 'Zip Code is required' })}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                  onChange={(e) => trigger('zipCode')}
                />
              </Grid>

              {/* Company */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="company"
                  label="Company"
                  variant="filled"
                  {...register('company', { required: 'Company is required' })}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  onChange={(e) => trigger('company')}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Edit;
