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
import { setUser } from '../userData/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { Visibility } from '@mui/icons-material';
import EyeClose from '../assets/svg/customSvg/EyeClose';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


interface InputFiled {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.user)
    console.log("usersusersusersusers------->", users)
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
    } = useForm<InputFiled>()

    //Function to onSubmit value Store
    const onformsubmit: SubmitHandler<InputFiled> = (data, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        dispatch(setUser(data))
        setSnackbarMessage("sign-up successfull")
        setSnackbarSeverity("success")
        setOpenSnackbar(true)
        reset()
        setTimeout(() => {
            navigate('/signin')
        }, 1000);
    }

    //Close Error Message
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    // Function to handle onChange and clear error if valid
    const handleOnChange = async (field: keyof InputFiled, value: string) => {
        setValue(field, value); // Update the value in the form state
        const result = await trigger(field); // Trigger validation for the specific field
        if (result) {
            clearErrors(field); // Clear the error if the validation passes
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        // padding: 3,
                        // borderRadius: 2,
                        // backgroundColor: '#fff',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onformsubmit)}>
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
                                <FormControl fullWidth variant="filled" error={!!errors.password}>
                                    <InputLabel htmlFor="filled-adornment-password">
                                        Password
                                    </InputLabel>
                                    <FilledInput
                                        required
                                        fullWidth
                                        id="password"
                                        autoComplete="current-password"
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
                                        onChange={(e) => handleOnChange("password", e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <EyeClose /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.password && (
                                        <FormHelperText>{errors.password.message}</FormHelperText>
                                    )}
                                </FormControl>
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
    );
}
export default SignUp