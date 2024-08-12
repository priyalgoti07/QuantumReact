import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { useAppDispatch } from '../utils/hooks';
import { updatePassword } from '../userData/userSlice';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface InputFiled {
    email: string;
    newpassword: string;
}

const ForgetPassword: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const UserAllData = useSelector((state: RootState) => state.user)
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [generatedOtp, setGeneratedOtp] = React.useState<string>();
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const [step, setStep] = React.useState<string>("request")
    const [otp, setOtp] = React.useState<String>("");


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
        console.log("registeredUser----->", registeredUser);

        if (registeredUser) {
            generateOTP()

        }
        else {
            setSnackbarMessage("This email is incorrect Please Register email enter.")
            setSnackbarSeverity('error')
            setOpenSnackbar(true)

        }

    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        setGeneratedOtp(otp)
        alert(`Your OTP is: ${otp}`)
        setStep('reset')
        console.log("otp", otp);

    }
    // Function to handle onChange and clear error if valid
    const handleOnChange = async (field: keyof InputFiled, value: string) => {
        setValue(field, value); // Update the value in the form state
        const result = await trigger(field); // Trigger validation for the specific field
        if (result) {
            clearErrors(field); // Clear the error if the validation passessignup

        }
    };
    const handleResetPassword: SubmitHandler<InputFiled> = (data: InputFiled, event?: React.BaseSyntheticEvent) => {
        console.log("data", data);

        event?.preventDefault()
        if (otp === generatedOtp) {
            const registeredUser = UserAllData.users.find((item) => item.email === data.email)
            console.log("registeredUser----->", registeredUser);

            if (registeredUser) {
                dispatch(updatePassword({ email: data.email, newpassword: data.newpassword }))
                console.log("i am dispatch password");
                setSnackbarMessage("Passwor is succssfull update.")
                setSnackbarSeverity('success')
                setOpenSnackbar(true)
                reset()
                setTimeout(() => {
                    navigate('/signin')
                }, 2000);
            }
            else {
                setSnackbarMessage("This email is incorrect Please Register email enter.")
                setSnackbarSeverity('error')
                setOpenSnackbar(true)

            }
            console.log("Password Change");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    }
    console.log("generatedOtp", generatedOtp);

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    {(step === "request") ?

                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onLoginSubmit)}>
                            <Typography component="h1" variant="h5">
                                Forgot your password?
                            </Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Typography variant="body2">
                                        Please enter the email address associated with your account and we'll email you a link to reset your password.
                                    </Typography>
                                </Grid>
                            </Grid>
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
                            />


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {"Send request || Send OTP"}
                            </Button>
                            <Grid container>
                                <Link to="/signin">
                                    <Typography variant="body2">
                                        Return to sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Box>
                        :
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleResetPassword)}>
                            <Typography variant="h5">Reset Password</Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                variant="filled"
                                // autoFocus
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

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="OTP"
                                // autoComplete="email"
                                variant="filled"
                                value={otp}
                                autoFocus
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled" error={!!errors.newpassword}>
                                    <InputLabel htmlFor="filled-adornment-password">
                                        New Password
                                    </InputLabel>
                                    <FilledInput
                                        required
                                        fullWidth
                                        id="newpassword"
                                        autoComplete="current-newpassword"
                                        // variant="filled"
                                        {...register("newpassword", {
                                            required: "newpassword is requrired",
                                            minLength: {
                                                value: 8,
                                                message: "newpassword must be at least 8 characters long"
                                            },
                                            pattern: {
                                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                                message: "newpassword must include at least one uppercase letter, one lowercase letter, and one number"

                                            }

                                        })}
                                        error={!!errors.newpassword}
                                        onChange={(e) => handleOnChange("newpassword", e.target.value)}
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
                                    {errors.newpassword && (
                                        <FormHelperText>{errors.newpassword.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {"Reset Password"}
                            </Button>
                            <Grid container>
                                <Link to="/signin">
                                    <Typography variant="body2">
                                        Return to sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Box>}
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
export default ForgetPassword