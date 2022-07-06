import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import CredentialModel from "../../../Models/CredentialModel";
import authService from "../../../Services/AuthService";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import { useEffect, useState } from 'react';
import UserModel from '../../../Models/UserModel';


const theme = createTheme();

export default function SignIn() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const navigator = useNavigate();
    const { register, handleSubmit, formState } = useForm<CredentialModel>();

    useEffect((async () => {
        // Get all users
        const users = await authService.getAllUsers();
        setUsers(users);
    }) as any, []);

    // Submit the form
    async function submit(credentials: CredentialModel) {
        try {
            await authService.login(credentials);
            notifyService.success("You are logged in");
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            {...register("username", {
                                required: "Login is required",
                                minLength: { value: 3, message: "Login must be at least 3 characters" },
                                maxLength: { value: 20, message: "Login must be at most 20 characters" },
                                validate: (value) => {
                                    // Check if username valid
                                    if (value === users.find(user => user.username === value)?.username) {
                                        return true;
                                    }
                                    return "Login is not valid";
                                }
                            })}
                            {...formState.errors.username && {
                                helperText: formState.errors.username?.message,
                                error: true,
                            }}
                        />
                        <TextField
                            
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 5, message: "Password must be at least 5 characters" },
                                maxLength: { value: 20, message: "Password must be at most 20 characters" },
                                validate: (value) => {
                                    // Check if password valid
                                    if (value === users.find(user => user.password === value)?.password) {
                                        return true;
                                    }
                                    return "Password is not valid";
                                }
                            })}
                            {...formState.errors.password && {
                                helperText: formState.errors.password?.message,
                                error: true,
                            }}
                        />
                        <Button
                            onClick={handleSubmit(submit)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to="/register">{"Don't have an account? Sign Up"}</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}