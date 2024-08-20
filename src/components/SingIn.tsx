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
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Snackbar } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import EyeClose from '../assets/svg/customSvg/EyeClose';
import CryptoJS from 'crypto-js';
import { encryptData } from '../utils/helper';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Custom button border radius
                    backgroundColor: "#1C252E",
                    '&:hover': {
                        backgroundColor: "#454F5B", // Button color on hover
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fafafa', // Custom text field background color

                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#e0e0e0', // Custom filled input background color
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'grey', // Default label color
                    '&.Mui-focused': {
                        color: '#1C252E', // Focused label color
                    },
                    '&.Mui-error': {
                        color: 'red', // Label color when there's an error
                    },
                },
            },
        },
    },
});

interface InputFiled {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const UserAllData = useSelector((state: RootState) => state.user)
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');


    // Function to generate a random token
    const generateRandomToken = (): string => {
        return btoa(Math.random().toString(36).substring(2) + new Date().getTime().toString(36));
    };

    const { register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        clearErrors,
        reset } = useForm<InputFiled>()

    //Function to onSubmit value Store
    const onLoginSubmit: SubmitHandler<InputFiled> = (data, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        const registeredUser = UserAllData.users.find((item) => item.email === data.email)

        if (registeredUser) {
            if (registeredUser?.password !== data.password) {
                setSnackbarMessage("Please check your credentials")
                setSnackbarSeverity("error")
                setOpenSnackbar(true)
            }
            else {
                const localStore = encryptData(registeredUser.email)
                localStorage.setItem("token", localStore || '')
                const token = generateRandomToken();
                localStorage.setItem('authToken', token);
                setSnackbarMessage("Login successfull")
                setSnackbarSeverity("success")
                setOpenSnackbar(true)
                reset()
                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000);
            }

        }
        else {

            setSnackbarMessage("you are not sign up. Please first sign up")
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
            // setTimeout(() => {
            //     navigate('/signup')
            // }, 1000);
        }

    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    // Function to handle onChange and clear error if valid
    const handleOnChange = async (field: keyof InputFiled, value: string) => {
        setValue(field, value); // Update the value in the form state
        const result = await trigger(field); // Trigger validation for the specific field
        if (result) {
            clearErrors(field); // Clear the error if the validation passessignup
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
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add box shadow here
                        padding: 3, // Optional: Add padding for better appearance
                        borderRadius: 2, // Optional: Add border radius for rounded corners
                        backgroundColor: '#fff', // Optional: Ensure background color is set
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#1C252E' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onLoginSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    variant="filled"
                                    autoFocus
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
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            '&:before': {
                                                borderBottomColor: '#1C252E', // Default underline color
                                            },
                                            '&:hover:not(.Mui-disabled):before': {
                                                borderBottomColor: '#1C252E', // Hover underline color
                                            },
                                            '&:after': {
                                                borderBottomColor: '#1C252E', // Focused underline color
                                            },
                                        },
                                    }}
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
                                        // variant="filled"
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
                                        sx={{
                                            '&:before': {
                                                borderBottomColor: '#1C252E', // Default underline color
                                            },
                                            '&:hover:not(.Mui-disabled):before': {
                                                borderBottomColor: '#1C252E', // Hover underline color
                                            },
                                            '&:after': {
                                                borderBottomColor: '#1C252E', // Focused underline color
                                            },
                                        }}
                                    />
                                    {errors.password && (
                                        <FormHelperText>{errors.password.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                        </Grid>

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontSize: "16px", fontWeight: "600" }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#">
                                    <Typography variant="body2">
                                        <Link to='/forgetpassword'>
                                            Forgot password?
                                        </Link>
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    <Typography variant="body2">
                                        {"Don't have an account? Sign Up"}
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
export default SignIn