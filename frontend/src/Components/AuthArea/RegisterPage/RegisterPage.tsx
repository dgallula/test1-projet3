import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";



const theme = createTheme();

export default function SignUp() {

    const [users, setUsers] = useState<UserModel[]>([]);
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigator = useNavigate();

    useEffect((async () => {
        // Get all users
        const users = await authService.getAllUsers();
        setUsers(users);
    }) as any, []);

    // Submit the form
    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You are registered");
            navigator("/home");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'rgba(255,255,255, 0.9);',
                        padding: 2,
                        borderRadius: 3
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(submit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName", {
                                        required: { value: true, message: "Missing first name" },
                                        minLength: { value: 2, message: "First name must be at least 2 characters" },
                                        maxLength: { value: 20, message: "First name can't exceed 20 characters" },
                                    })}
                                    {...formState.errors.firstName && {
                                        helperText: formState.errors.firstName?.message,
                                        error: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register("lastName", {
                                        required: { value: true, message: "Missing last name" },
                                        minLength: { value: 2, message: "Last name must be at least 2 characters" },
                                        maxLength: { value: 20, message: "Last name can't exceed 20 characters" },
                                    })}
                                    {...formState.errors.lastName && {
                                        helperText: formState.errors.lastName?.message,
                                        error: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    {...register("username", {
                                        required: { value: true, message: "Missing username" },
                                        minLength: { value: 5, message: "Username must be at least 5 characters" },
                                        maxLength: { value: 20, message: "Username can't exceed 20 characters" },
                                        validate: (value) => {
                                            if (value === users.find(u => u.username === value)?.username) {
                                                return "Username already exists";
                                            }
                                            else if (value.includes(" ")) {
                                                return "Username can't contain spaces";
                                            }
                                            return true;
                                        }
                                    })}
                                    {...formState.errors.username && {
                                        helperText: formState.errors.username?.message,
                                        error: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: { value: true, message: "Missing password" },
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        maxLength: { value: 20, message: "Password can't exceed 20 characters" },

                                    })}
                                    {...formState.errors.password && {
                                        helperText: formState.errors.password?.message,
                                        error: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit(submit)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container >
                            <Grid item>
                                <NavLink to="/login"> Already have an account? Sign in</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}