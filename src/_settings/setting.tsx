// app/settings/page.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../_global/components/context/AuthContext';
import { Alert } from '@mui/material';
import { getShopDetails, updateShop } from '@/_global/api/api';
import { Shop } from '@/_global/api/types';

const SettingsPage: React.FC = () => {
  const { activeShop, setActiveShop } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [gstinNumber, setGstinNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [state, setState] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [legal_name, setLegalShopName] = useState('');
  const [digital_signature, setDigitalSignature] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        if (!activeShop?.id) {
          throw new Error('No active shop found');
        }
        const data = await getShopDetails(activeShop.id);
        setCompanyName(data?.data.name || '');
        setCompanyAddress(data?.data.address || '');
        setGstinNumber(data?.data.gstin || '');
        setPanNumber(data?.data.pan || '');
        setState(data?.data.state || '');
        setStateCode(data?.data.state_code || '');
        setLegalShopName(data?.data?.legal_name || '');
        setDigitalSignature(data?.data?.digital_signature || '');
      } catch (err) {
        console.error('Failed to fetch shop details:', err);
        setError('Failed to fetch shop details. Please try again.');
      }
    };

    fetchShopDetails();
  }, []); // Run on every render

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!activeShop?.id) {
        throw new Error('Shop ID is required');
      }

      const updatedShop: Shop = {
        id: activeShop.id,
        name: companyName,
        address: companyAddress,
        gstin: gstinNumber,
        pan: panNumber,
        state: state,
        state_code: stateCode,
        is_default: activeShop.is_default,
        legal_name: legal_name,
        digital_signature: digital_signature,
      };

      // Make API call to update shop
      const response = await updateShop(activeShop.id, updatedShop)
      if (!response.success != true) {
        setError(response.message);
      }

      // Update context
      setActiveShop(updatedShop);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating shop details');
    }
  };

  return (
    <Container>
      {error && (
            <Alert 
                severity="error" 
                onClose={() => setError('')}
            >
                {error}
            </Alert>
        )}
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
        <Typography variant="h6">Company Legal Name</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={legal_name}
            onChange={(e) => setLegalShopName(e.target.value)}
          />
        ) : (
          <Typography>{legal_name}</Typography>
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
      <Box mb={2}>
        <Typography variant="h6">PAN</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
        ) : (
          <Typography>{panNumber}</Typography>
        )}
      </Box>
      <Box mb={2}>
        <Typography variant="h6">State</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        ) : (
          <Typography>{state}</Typography>
        )}
      </Box>
      <Box mb={2}>
        <Typography variant="h6">State Code</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
        ) : (
          <Typography>{stateCode}</Typography>
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
