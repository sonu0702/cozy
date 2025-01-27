import React from 'react';
import { Box, Stack, IconButton, Typography, Divider, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface InvoiceItemProps {
  item: {
    description: string;
    hsnSacCode: string;
    quantity: number;
    unitValue: number;
    discount: number;
    taxableValue: number;
    cgstRate: number;
    cgstAmount: number;
    sgstRate: number;
    sgstAmount: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{item.description}</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Box display="flex" justifyContent="space-between">
          <Typography>HSN/SAC Code: {item.hsnSacCode}</Typography>
          <Typography>Quantity: {item.quantity}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Unit Value: {item.unitValue}</Typography>
          <Typography>Discount: {item.discount}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Taxable Value: {item.taxableValue}</Typography>
          <Typography>CGST Rate: {item.cgstRate}%</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>CGST Amount: {item.cgstAmount}</Typography>
          <Typography>SGST Rate: {item.sgstRate}%</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>SGST Amount: {item.sgstAmount}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
      </CardContent>
    </Card>
  );
};

export default InvoiceItem;
