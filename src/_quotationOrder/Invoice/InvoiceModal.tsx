import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Box, Autocomplete, CircularProgress } from '@mui/material';
import { useAuth } from '@/_global/components/context/AuthContext';
import { productListSearchDescription, createProduct } from '@/_global/api/api';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';

interface InvoiceItem {
  id?: string;
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
  const [itemId, setItemId]= useState<string|undefined>(undefined);
  const [description, setDescription] = useState('');
  const [hsnSacCode, setHsnSacCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
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
      setItemId(item.id);
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
    let calculatedTaxableValueWithDiscount = calculatedTaxableValue - ((calculatedTaxableValue * discount) / 100);
    setTaxableValue(calculatedTaxableValueWithDiscount);
    setCgstAmount(Number(((calculatedTaxableValueWithDiscount * cgstRate) / 100).toFixed(2)));
    setSgstAmount(Number(((calculatedTaxableValueWithDiscount * sgstRate) / 100).toFixed(2)));
    setIgstAmount(Number(((calculatedTaxableValueWithDiscount * igstRate) / 100).toFixed(2)));
    setDiscount(discount)
  }, [quantity, unitValue, discount, cgstRate, sgstRate, igstRate]);

  const handleSave = () => {
    const newItem: InvoiceItem = {
      id: itemId,
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
    setTimeout(() => {
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton instanceof HTMLElement) {
        submitButton.focus();
      }
    }, 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Don't trigger save if Autocomplete dropdown is open
    const isAutocompleteOpen = document.querySelector('.MuiAutocomplete-popper') !== null;
    if (event.key === 'Enter' && !event.shiftKey && !isAutocompleteOpen) {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '0.7rem' }}>{item ? 'Edit Item' : 'Add Item'}</DialogTitle>
      <DialogContent sx={{ fontSize: '0.6rem' }} onKeyDown={handleKeyDown}>
        <Stack spacing={1}>
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            value={description}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
              setDescription(newInputValue);
              debouncedSearch(newInputValue);
              // Check if the entered value matches any existing product
              const productExists = options.some(option => 
                typeof option === 'string' 
                  ? option === newInputValue 
                  : option.name === newInputValue
              );
              setIsNewProduct(!productExists && newInputValue.length > 0);
            }}
            onChange={(event, newValue) => {
              console.log(`newValue: ${newValue}`)
              if (typeof newValue === 'string') {
                setDescription(newValue);
                setIsNewProduct(true);
              } else if (newValue && typeof newValue === 'object') {
                setDescription(newValue.name);
                setHsnSacCode(newValue.hsn || '');
                setUnitValue(newValue.price || 0);
                setQuantity(1);
                setCgstRate(newValue.cgstRate || 9);
                setSgstRate(newValue.sgstRate || 9);
                setIgstRate(newValue.igstRate || 0);
                setDiscount(newValue.discount || 0);
                setIsNewProduct(false);
              } else {
                // When newValue is null (user cleared the input)
                setDescription('');
                setHsnSacCode('');
                setUnitValue(0);
                setQuantity(1);
                setDiscount(0);
                setCgstRate(9);
                setSgstRate(9);
                setIgstRate(0);
                setIsNewProduct(false);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Description"
                fullWidth
                autoFocus={true}
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
        {isNewProduct && (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              if (!activeShop?.id) return;
              try {
                await createProduct(activeShop.id, {
                  name: description,
                  hsn: hsnSacCode,
                  price: unitValue,
                  category: '',
                  cgst: cgstRate,
                  sgst: sgstRate,
                  igst: igstRate,
                  discount_percent: discount
                });
                toast.success('Product created successfully');
                setIsNewProduct(false);
              } catch (error) {
                console.error('Error creating product:', error);
                toast.error('Failed to create product');
              }
            }}
            sx={{ fontSize: '0.6rem', mr: 1 }}
          >
            Create Product
          </Button>
        )}
        <Button onClick={handleSave} variant="contained" color="primary" sx={{ fontSize: '0.6rem', mr: 1 }}>Save(Enter)</Button>
        <Button onClick={onClose} variant="outlined" sx={{ fontSize: '0.6rem' }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
