import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface InvoiceItem {
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
  igstRate: number;
  igstAmount: number;
}

interface InvoiceTableProps {
  items: InvoiceItem[];
  onEdit: (item: InvoiceItem) => void;
  onDelete: (index: number) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ items, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, fontSize: '0.6rem' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '30%' }}>Description</TableCell>
            <TableCell sx={{ width: '10%' }}>HSN/SAC Code</TableCell>
            <TableCell sx={{ width: '5%' }}>Quantity</TableCell>
            <TableCell sx={{ width: '5%' }}>Unit Value</TableCell>
            <TableCell sx={{ width: '5%' }}>Discount</TableCell>
            <TableCell sx={{ width: '10%' }}>Taxable Value</TableCell>
            <TableCell sx={{ width: '5%' }}>CGST Rate</TableCell>
            <TableCell sx={{ width: '10%' }}>CGST Amount</TableCell>
            <TableCell sx={{ width: '5%' }}>SGST Rate</TableCell>
            <TableCell sx={{ width: '10%' }}>SGST Amount</TableCell>
            <TableCell sx={{ width: '5%' }}>IGST Rate</TableCell>
            <TableCell sx={{ width: '10%' }}>IGST Amount</TableCell>
            <TableCell sx={{ width: '5%' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.hsnSacCode}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitValue}</TableCell>
              <TableCell>{item.discount}</TableCell>
              <TableCell>{item.taxableValue}</TableCell>
              <TableCell>{item.cgstRate}%</TableCell>
              <TableCell>{item.cgstAmount}</TableCell>
              <TableCell>{item.sgstRate}%</TableCell>
              <TableCell>{item.sgstAmount}</TableCell>
              <TableCell>{item.igstRate}%</TableCell>
              <TableCell>{item.igstAmount}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(item)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onDelete(index)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
