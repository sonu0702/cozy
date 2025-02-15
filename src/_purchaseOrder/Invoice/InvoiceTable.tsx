import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography , TableFooter} from '@mui/material';
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
            <TableCell sx={{ width: '35%' }}>Description of Service</TableCell>
            <TableCell sx={{ width: '10%' }}>HSN/SAC Code</TableCell>
            <TableCell sx={{ width: '5%' }}>Unit</TableCell>
            <TableCell sx={{ width: '10%', textAlign: 'right' }}>Unit Value</TableCell>
            {items.some(item => item.discount > 0) && (
              <TableCell sx={{ width: '5%', textAlign: 'right' }}>Discount</TableCell>
            )}
            <TableCell sx={{ width: '15%', textAlign: 'right' }}>Taxable Value</TableCell>
            <TableCell colSpan={2} sx={{ width: '15%', textAlign: 'center' }}>CGST</TableCell>
            <TableCell colSpan={2} sx={{ width: '15%', textAlign: 'center' }}>SGST</TableCell>
            <TableCell colSpan={2} sx={{ width: '15%', textAlign: 'center' }}>IGST</TableCell>
            <TableCell sx={{ width: '5%' }}>Actions</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            {items.some(item => item.discount > 0) && <TableCell></TableCell>}
            <TableCell></TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'center' }}>Rate</TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'right' }}>Amt</TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'center' }}>Rate</TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'right' }}>Amt</TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'center' }}>Rate</TableCell>
            <TableCell sx={{ width: '7.5%', textAlign: 'right' }}>Amt</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.hsnSacCode}</TableCell>
              <TableCell>1</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{Number(item.unitValue).toFixed(2)}</TableCell>
              {items.some(item => item.discount > 0) && (
                <TableCell sx={{ textAlign: 'right' }}>{Number(item.discount).toFixed(2)}</TableCell>
              )}
              <TableCell sx={{ textAlign: 'right' }}>{Number(item.taxableValue).toFixed(2)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.cgstRate}%</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{Number(item.cgstAmount).toFixed(2)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.sgstRate}%</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{Number(item.sgstAmount).toFixed(2)}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{item.igstRate}%</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{Number(item.igstAmount).toFixed(2)}</TableCell>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>TOTAL</TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{Number(items.reduce((sum, item) => sum + item.unitValue, 0)).toFixed(2)}</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{Number(items.reduce((sum, item) => sum + item.taxableValue, 0)).toFixed(2)}</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{Number(items.reduce((sum, item) => sum + item.cgstAmount, 0)).toFixed(2)}</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{Number(items.reduce((sum, item) => sum + item.sgstAmount, 0)).toFixed(2)}</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{Number(items.reduce((sum, item) => sum + item.igstAmount, 0)).toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
