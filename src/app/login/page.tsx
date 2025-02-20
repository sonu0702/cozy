"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../_global/components/context/AuthContext';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress, Divider } from '@mui/material';
import Alert from '@/_common/components/Alert/Alert';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setError('');
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        if (username.length < 4) {
            setError('Username must be at least 6 characters long');
            return;
        }
        setIsLoading(true);
        try {
            await login(username, password);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password. Please try again.');
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
            <Paper elevation={3} sx={{ p: 3, width: '100%', position: 'relative' }}>
                {error && (
                    <Alert 
                        severity="error" 
                        onClose={() => setError('')}
                    >
                        {error}
                    </Alert>
                )}
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
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        size="small"
                        margin="dense"
                        error={!!error}
                        autoFocus
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
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                        Don't have an account? This is an invite-only application.
                        Please contact <Box component="span" sx={{ fontWeight: 'medium' }}>support@whizcozy.com</Box> for access.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;