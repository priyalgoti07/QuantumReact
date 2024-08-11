import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../userData/userSlice';
import { Link } from 'react-router-dom';
import { alpha, FormControl, FormHelperText, InputBase, InputLabel, styled } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


interface InputFiled {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const users = useSelector((state: RootState) => state.user)
    console.log("users", users);

    const { register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        clearErrors,
        reset,
        getValues
    } = useForm<InputFiled>()

    //Function to onSubmit value Store
    const onformsubmit: SubmitHandler<InputFiled> = (data, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log("data", data);
        dispatch(setUser(data))
        reset()
        console.log("you have to succefull ");

    }

    // Function to handle onChange and clear error if valid
    const handleOnChange = async (field: keyof InputFiled, value: string) => {
        setValue(field, value); // Update the value in the form state
        const result = await trigger(field); // Trigger validation for the specific field
        if (result) {
            clearErrors(field); // Clear the error if the validation passes
        }
    };
    // Save data to local storage when form values change
    const onFormChange = () => {
        // const formValues = getValues();
        console.log("users", users);

        localStorage.setItem('formData', JSON.stringify(users));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add box shadow here
                        padding: 3, // Optional: Add padding for better appearance
                        borderRadius: 2, // Optional: Add border radius for rounded corners
                        backgroundColor: '#fff', // Optional: Ensure background color is set
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onformsubmit)} onChange={onFormChange}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoComplete="firstName"
                                    variant='filled'
                                    autoFocus
                                    {...register("firstName",
                                        { required: "First Name is required" }
                                    )}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    onChange={(e) => handleOnChange("firstName", e.target.value)}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="lastName"
                                    variant='filled'
                                    {...register("lastName",
                                        { required: "Last Name is required" }
                                    )}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    onChange={(e) => handleOnChange("lastName", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    variant="filled"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format"
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    onChange={(e) => handleOnChange("email", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    {...register("password", {
                                        required: "Password is requrired",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        pattern: {
                                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                            message: "Password must include at least one uppercase letter, one lowercase letter, and one number"

                                        }

                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    onChange={(e) => handleOnChange("password", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin">
                                    <Typography variant="body2">
                                        Already have an account? Sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default SignUp