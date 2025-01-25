"use client";
import { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    // Perform signup logic here
    router.push('/login');
  };

  return (
    <Container>
      <Typography variant="h4">Signup</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSignup}>Signup</Button>
    </Container>
  );
};

export default Signup;