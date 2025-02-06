import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Box, Autocomplete, CircularProgress } from '@mui/material';
import { useAuth } from '@/_global/components/context/AuthContext';
import { productListSearchDescription } from '@/_global/api/api';
import debounce from 'lodash/debounce';

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

interface InvoiceModalProps {
  item: InvoiceItem | null;
  onSave: (item: InvoiceItem) => void;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ item, onSave, onClose }) => {
  const { activeShop } = useAuth();
  const [description, setDescription] = useState('');
  const [hsnSacCode, setHsnSacCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // Set default quantity to 1
  const [unitValue, setUnitValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxableValue, setTaxableValue] = useState(0);
  const [cgstRate, setCgstRate] = useState(9);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [sgstRate, setSgstRate] = useState(9);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [igstRate, setIgstRate] = useState(0);
  const [igstAmount, setIgstAmount] = useState(0);

  const debouncedSearch = debounce(async (query: string) => {
    if (query.length >= 2 && activeShop?.id) {
      setLoading(true);
      try {
        const results = await productListSearchDescription(activeShop.id, query);
        setOptions(results);
      } catch (error) {
        console.error('Error searching products:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions([]);
    }
  }, 300);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setHsnSacCode(item.hsnSacCode);
      setQuantity(item.quantity);
      setUnitValue(item.unitValue);
      setDiscount(item.discount);
      setTaxableValue(item.taxableValue);
      setCgstRate(item.cgstRate);
      setCgstAmount(item.cgstAmount);
      setSgstRate(item.sgstRate);
      setSgstAmount(item.sgstAmount);
      setIgstRate(item.igstRate);
      setIgstAmount(item.igstAmount);
    }
  }, [item]);

  useEffect(() => {
    const calculatedTaxableValue = (quantity * unitValue) - discount;
    setTaxableValue(calculatedTaxableValue);
    setCgstAmount((calculatedTaxableValue * cgstRate) / 100);
    setSgstAmount((calculatedTaxableValue * sgstRate) / 100);
    setIgstAmount((calculatedTaxableValue * igstRate) / 100);
  }, [quantity, unitValue, discount, cgstRate, sgstRate, igstRate]);

  const handleSave = () => {
    const newItem: InvoiceItem = {
      description,
      hsnSacCode,
      quantity,
      unitValue,
      discount,
      taxableValue,
      cgstRate,
      cgstAmount,
      sgstRate,
      sgstAmount,
      igstRate,
      igstAmount,
    };
    onSave(newItem);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '0.7rem' }}>{item ? 'Edit Item' : 'Add Item'}</DialogTitle>
      <DialogContent sx={{ fontSize: '0.6rem' }}>
        <Stack spacing={1}>
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            value={description}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
              debouncedSearch(newInputValue);
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setDescription(newValue);
              } else if (newValue) {
                setDescription(newValue.name);
                setHsnSacCode(newValue.hsn || ''); // Update to use hsn field
                setUnitValue(newValue.price || 0);
                setQuantity(1); // Set quantity to 1 when product is selected
                setCgstRate(newValue.cgstRate || 9);
                setSgstRate(newValue.sgstRate || 9);
                setIgstRate(newValue.igstRate || 0);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Description"
                fullWidth
                sx={{ fontSize: '0.6rem' }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <TextField fullWidth label="HSN/SAC Code" value={hsnSacCode} onChange={(e) => setHsnSacCode(e.target.value)} sx={{ fontSize: '0.6rem' }} />
          <Box display="flex" justifyContent="space-between">
            <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
            <TextField label="Unit Value" type="number" value={unitValue} onChange={(e) => setUnitValue(Number(e.target.value))} sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField label="Discount" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
            <TextField label="Taxable Value" type="number" value={taxableValue} disabled sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField label="CGST Rate" type="number" value={cgstRate} onChange={(e) => setCgstRate(Number(e.target.value))} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
            <TextField label="CGST Amount" type="number" value={cgstAmount} disabled sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField label="SGST Rate" type="number" value={sgstRate} onChange={(e) => setSgstRate(Number(e.target.value))} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
            <TextField label="SGST Amount" type="number" value={sgstAmount} disabled sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField label="IGST Rate" type="number" value={igstRate} onChange={(e) => setIgstRate(Number(e.target.value))} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
            <TextField label="IGST Amount" type="number" value={igstAmount} disabled sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} sx={{ fontSize: '0.6rem' }}>Save</Button>
        <Button onClick={onClose} sx={{ fontSize: '0.6rem' }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
