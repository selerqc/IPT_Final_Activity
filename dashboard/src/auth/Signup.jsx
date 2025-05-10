import React, { useState, useRef } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Alert,
    Paper,
    InputAdornment,
    CircularProgress,
    Fade,
    Grid
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const middlenameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:1337/api/Signup', {
                firstname: firstnameRef.current.value,
                lastname: lastnameRef.current.value,
                middlename: middlenameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value
            });

            setSuccess('Signup successful!');
            setTimeout(() => navigate("/Dashboard"), 2000);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}>
            <Fade in={true} timeout={800}>
                <Paper
                    elevation={8}
                    sx={{
                        width: '100%',
                        padding: 4,
                        borderRadius: 3,
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3
                        }}
                    >
                        <HowToRegIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                            Create Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Please fill in your information
                        </Typography>
                    </Box>

                    {error && (
                        <Fade in={true}>
                            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                        </Fade>
                    )}
                    {success && (
                        <Fade in={true}>
                            <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
                        </Fade>
                    )}

                    <Box component="form" onSubmit={handleSubmit} method="POST">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountBoxIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstname"
                                        inputRef={firstnameRef}
                                        variant="standard"
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountBoxIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastname"
                                        inputRef={lastnameRef}
                                        variant="standard"
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountBoxIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="Middle Name"
                                        name="middlename"
                                        inputRef={middlenameRef}
                                        variant="standard"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        inputRef={emailRef}
                                        variant="standard"
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        inputRef={passwordRef}
                                        variant="standard"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Box
                                                        component="span"
                                                        onClick={handleClickShowPassword}
                                                        sx={{ cursor: 'pointer', display: 'flex' }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        inputRef={confirmPasswordRef}
                                        variant="standard"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Box
                                                        component="span"
                                                        onClick={handleClickShowPassword}
                                                        sx={{ cursor: 'pointer', display: 'flex' }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: 2,
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link
                            to="/"
                            style={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontWeight: 500
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Fade>
        </Container>
    );
};

export default Signup;