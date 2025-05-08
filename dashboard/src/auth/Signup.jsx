import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const middlenameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:1337/api/Signup', {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            middlename: middlenameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        })
            .then((res) => {

                setSuccess('Signup successful!');
                setTimeout(() => navigate("/Dashboard"), 3000);
                setError('');
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.message);
                setSuccess('');
            });


    };

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Signup
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Firstname"
                        name="firstname"
                        inputRef={firstnameRef}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Middlename"
                        name="middlename"
                        inputRef={middlenameRef}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Lastname"
                        name="lastname"
                        inputRef={lastnameRef}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="your@email.com"
                        name="email"
                        type="email"
                        inputRef={emailRef}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        inputRef={passwordRef}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        inputRef={confirmPasswordRef}
                        margin="normal"

                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Signup
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }} align="center">
                    Already have an account?{' '}
                    <Link to="/" style={{ color: 'blue' }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;