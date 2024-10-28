import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { getProducts } from '@/_inventory/AddProductForm/product_api';
import { debounce } from 'lodash';

interface Item {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
}

interface FormData {
  customerNumber: string;
  paymentMethod: string;
  selectedItem: Item | null;
  items: Item[];
}

interface SalesOrderFormProps {
  open: boolean;
  onClose: () => void;
}

const SalesOrderForm: React.FC<SalesOrderFormProps> = ({ open, onClose }) => {
  const { control, handleSubmit, reset, getValues, setValue } = useForm<FormData>({
    defaultValues: {
      customerNumber: '',
      paymentMethod: '',
      selectedItem: null,
      items: [],
    },
  });
  const { fields, append, remove } = useFieldArray<FormData, 'items', 'id'>({
    control,
    name: 'items',
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Fetch product types
  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ['productTypes', searchTerm],
    queryFn: () => getProducts(searchTerm),
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Debounce the search input to prevent too many API calls
  const handleSearchChange = debounce((searchQuery: string) => {
    setSearchTerm(searchQuery);
  }, 300);
  
  // Fetch initial 4 products
  useEffect(() => {
    getProducts('')
      .then((data) => {
        setValue('selectedItem', data[0] || null);
      })
      .catch((error) => {
        console.error('Error fetching initial products:', error);
      });
  }, [setValue]);

  const filteredItems = searchTerm
    ? inventory?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inventory?.slice(0, 4);

  const handleAddItem = () => {
    const selectedItem = getValues('selectedItem');
    if (selectedItem) {
      append({
        id: `${selectedItem.code}-${fields.length + 1}`,
        name: selectedItem.name,
        code: selectedItem.code,
        price: selectedItem.price,
        quantity: 1,
      });
      setValue('selectedItem', null);
      setSearchTerm('');
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    setValue(`items.${index}.quantity`, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const form = e.currentTarget;
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableControls = Array.from(
        form.querySelectorAll(focusableElements)
      ) as HTMLElement[];
      const index = focusableControls.indexOf(e.target as HTMLElement);

      if (e.shiftKey) {
        // Shift + Tab
        focusableControls[index - 1]?.focus();
      } else {
        // Tab
        focusableControls[index + 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      if (e.target instanceof HTMLInputElement && e.target.name === 'searchTerm') {
        setSearchTerm(e.target.value);
      } else {
        handleSubmit(onSubmit)(e);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    // await saveOrder({
    //   customerNumber: data.customerNumber,
    //   paymentMethod: data.paymentMethod,
    //   items: data.items,
    // });
    onClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '80%',
          maxWidth: '800px',
          height: '80vh',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'scroll',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <Stack spacing={2}>
            <Typography variant="h5">Sales Order</Typography>

            <Stack direction="row" spacing={2}>
              <Controller
                name="customerNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Customer Number" />
                )}
              />
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select {...field}>
                      <MenuItem value="phonepe">PhonePe</MenuItem>
                      <MenuItem value="creditCard">Credit Card</MenuItem>
                      <MenuItem value="atmCard">ATM Card</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Stack>

            <Divider />
            <Controller
              name="selectedItem"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={inventory}
                  getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.name
                  }
                  isOptionEqualToValue={(option, value) =>
                    typeof value === 'string'
                      ? option.name === value
                      : option.id === value.id
                  }
                  loading={isInventoryLoading}
                  onInputChange={(_, newValue) => {
                    handleSearchChange(newValue);
                  }}
                  onChange={(_, newValue) => {
                    // onChange(newValue ? newValue.name : '');
                    const selectedItem = newValue;
                    onChange(selectedItem);
                    handleAddItem();
                    // field.onChange(selectedItem || null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product"
                      // error={!!errors.type}
                      // helperText={errors.type?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isInventoryLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  fullWidth
                />
              )}
            />
            <Box sx={{ height: '60vh', overflowY: 'scroll' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          defaultValue={item.price}
                          onBlur={(e) =>
                            setValue(`items.${index}.price`, parseFloat(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          defaultValue={item.quantity}
                          onBlur={(e) =>
                            handleQuantityChange(index, parseInt(e.target.value))
                          }
                        />
                      </TableCell>
                      <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Subtotal</TableCell>
                    <TableCell>${fields.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ).toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell>${fields.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ).toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>

            <Divider />

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Draft
              </Button>
              <Button type="submit" variant="contained" color="success">
                Finalize Invoice
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default SalesOrderForm;