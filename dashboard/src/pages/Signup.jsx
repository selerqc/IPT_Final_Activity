import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        middlename: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        await axios.post('http://localhost:1337/api/Signup', {
            firstname: formData.firstname,
            lastname: formData.lastname,
            middlename: formData.middlename,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        })
            .then((res) => {

                setSuccess('Signup successful!');
                navigate('/dashboard');
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Signup
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Middlename"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"

                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                    <a href="/" style={{ color: 'blue' }}>
                        Login
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;