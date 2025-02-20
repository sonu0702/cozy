"use client";
import { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Paper, CircularProgress, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../_global/components/context/AuthContext';
import Alert from '@/_common/components/Alert/Alert';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = async () => {
    setError('');
    if (!username || !password || !name) {
      setError('All fields are required');
      return;
    }
    if (username.length < 6) {
      setError('Username must be at least 6 characters long');
      return;
    }
    setIsLoading(true);
    try {
      await signup(username, password, name);
      router.push('/login');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Signup failed:', error);
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
            Sign Up
          </Typography>
          <TextField 
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            autoFocus
          />
          <TextField 
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            error={!!error}
            helperText={error}
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
            onClick={handleSignup}
            disabled={isLoading}
            fullWidth
            sx={{ mt: 1 }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Sign Up'
            )}
          </Button>
          <Divider sx={{ width: '100%', mt: 2, mb: 1.5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Already have an account?
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => router.push('/login')}
            fullWidth
            size="medium"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;