import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface InputFiled {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, trigger, setValue, clearErrors } = useForm<InputFiled>()

    //Function to onSubmit value Store
    const onformsubmit: SubmitHandler<InputFiled> = (data, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log("data", data);
    }

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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onformsubmit)}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default SignIn