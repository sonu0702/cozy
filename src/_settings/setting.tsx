// app/settings/page.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../_global/components/context/AuthContext';
import { Alert } from '@mui/material';
import { getShopDetails } from '@/_global/api/api';

const SettingsPage: React.FC = () => {
  const { activeShop, setActiveShop } = useAuth();
  console.log("activeShop",activeShop);
  const [companyName, setCompanyName] = useState(activeShop?.name || '');
  const [companyAddress, setCompanyAddress] = useState(activeShop?.address || '');
  const [gstinNumber, setGstinNumber] = useState(activeShop?.gstin || '');
  const [panNumber, setPanNumber] = useState(activeShop?.pan || '');
  const [state, setState] = useState(activeShop?.state || '');
  const [stateCode, setStateCode] = useState(activeShop?.state_code || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeShop) {
      // get shop details from db
      getShopDetails(activeShop?.id as string)
      .then((data) => {
       setCompanyName(data?.data.name|| '');
       setCompanyAddress(data?.data.address|| '');
       setGstinNumber(data?.data.gstin || '') ;
       setPanNumber(data?.data.pan || '');
       setState(data?.data.state || '');
       setStateCode(data?.data.state_code || '');
      })
      .catch((err) => {
        console.error(err);
      });
    }
    
  }, [activeShop]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedShop = {
        ...activeShop,
        name: companyName,
        address: companyAddress,
        gstin: gstinNumber,
        pan: panNumber,
        state: state,
        state_code: stateCode
      };

      // Make API call to update shop
      // const response = await fetch(`/api/shops/${activeShop?.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedShop),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update shop details');
      // }

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
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
