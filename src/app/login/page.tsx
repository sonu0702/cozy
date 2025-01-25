"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../_global/components/context/AuthContext';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    useEffect(() => {
        console.log("login page");
    }, []);
    const handleLogin = () => {
        // Perform login logic here
        login();
        router.push('/');
    };

    return (
        <Container style={{ height: '600px' }}>
            <Typography variant="h4">Login</Typography>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default Login;