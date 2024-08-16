import { Alert, Box, Button, Container, CssBaseline, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from './CountrySelect';
const defaultTheme = createTheme();

interface InputFiled {
  fullName: string;
  emailAdress: string;
  phoneNumber: number;
  country: string
  // password: string;
}

const Create: React.FC = () => {

  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.user)
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
    reset,
    watch,
  } = useForm<InputFiled>()

  //Function to onSubmit value Store
  const onformsubmit: SubmitHandler<InputFiled> = (data, event?: React.BaseSyntheticEvent) => {
    console.log("data", data);

    event?.preventDefault();
    // dispatch(setUser(data))
    setSnackbarMessage("sign-up successfull")
    setSnackbarSeverity("success")
    setOpenSnackbar(true)
    reset()
  }

  //Close Error Message
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Function to handle onChange and clear error if valid
  const handleOnChange = async (field: keyof InputFiled, value: string) => {
    console.log("value-------->", value, field);

    setValue(field, value); // Update the value in the form state
    const result = await trigger(field); // Trigger validation for the specific field
    if (result) {
      clearErrors(field); // Clear the error if the validation passes
    }
  };
  return (

    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ px: 1, py: 1 }}>
        <Typography variant="h6" component="h6">
          Create a new user
        </Typography>
        {/* You can add more content here as needed */}
      </Box>
      <Container component="main" maxWidth="sm">

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onformsubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoComplete="fullName"
                  variant='filled'
                  autoFocus
                  {...register("fullName",
                    { required: "full Name is required" }
                  )}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  onChange={(e) => handleOnChange("fullName", e.target.value)}
                />

              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="emailAdress"
                  label="Email Address"
                  autoComplete="emailAdress"
                  variant="filled"
                  {...register("emailAdress", {
                    required: "EmailAdress is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid EmailAdress format"
                    },
                  })}
                  error={!!errors.emailAdress}
                  helperText={errors.emailAdress?.message}
                  onChange={(e) => handleOnChange("emailAdress", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number "
                  autoComplete="phoneNumber"
                  variant="filled"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phoneNumber format"
                    },
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  onChange={(e) => handleOnChange("phoneNumber", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelect
                  value={watch("country")} // useForm's watch to track the country field
                  {...register("country", { required: "Country is required" })}
                  onChange={(e) => handleOnChange("country", e.target.value as string)}
                />
                {errors.country && (
                  <FormHelperText error>{errors.country.message}</FormHelperText>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>

          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>

        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}

export default Create