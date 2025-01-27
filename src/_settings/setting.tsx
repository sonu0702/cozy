// app/settings/page.tsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('Your Company Name');
  const [companyAddress, setCompanyAddress] = useState('Your Company Address');
  const [gstinNumber, setGstinNumber] = useState('Your GSTIN Number');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add logic to save the data
  };

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h6">Company Name</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        ) : (
          <Typography>{companyName}</Typography>
        )}
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Company Address</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        ) : (
          <Typography>{companyAddress}</Typography>
        )}
      </Box>
      <Box mb={2}>
        <Typography variant="h6">GSTIN Number</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={gstinNumber}
            onChange={(e) => setGstinNumber(e.target.value)}
          />
        ) : (
          <Typography>{gstinNumber}</Typography>
        )}
      </Box>
      <Box mt={2}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
    </Container>
  );
};

export default SettingsPage;
