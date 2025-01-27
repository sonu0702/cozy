"use client";
import { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            setMessage('Password reset instructions have been sent to your email.');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            console.error('Password reset failed:', error);
            setMessage('Failed to send reset instructions. Please try again.');
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
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 3
                }}>
                    <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                        <Image
                            src="/images/Logo.png"
                            alt="Application Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        Enter your email address and we'll send you instructions to reset your password.
                    </Typography>
                    <TextField 
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {message && (
                        <Typography 
                            variant="body2" 
                            color={message.includes('Failed') ? 'error' : 'success.main'}
                            textAlign="center"
                        >
                            {message}
                        </Typography>
                    )}
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isLoading || !email}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Send Reset Instructions'
                        )}
                    </Button>
                    <Button 
                        variant="text" 
                        onClick={() => router.push('/login')}
                        sx={{ mt: 2 }}
                    >
                        Back to Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;