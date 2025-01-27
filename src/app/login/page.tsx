"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../_global/components/context/AuthContext';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress,Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Call login with user data
            console.log(email)
            login({
                name: email.split('@')[0], // Simple name from email
                email: email
            });
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ 
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                        <Image
                            src="/images/Logo.png"
                            alt="Application Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <TextField 
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        size="small"
                        margin="dense"
                    />
                    <TextField 
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        size="small"
                        margin="dense"
                    />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            variant="text" 
                            onClick={() => router.push('/forgot-password')}
                            sx={{ mb: 1 }}
                            size="small"
                        >
                            Forgot Password?
                        </Button>
                    </Box>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={isLoading}
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'Login'
                        )}
                    </Button>
                    <Divider sx={{ width: '100%', mt: 2, mb: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Don't have an account?
                    </Typography>
                    <Button 
                        variant="outlined" 
                        onClick={() => router.push('/signup')}
                        fullWidth
                        size="medium"
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;