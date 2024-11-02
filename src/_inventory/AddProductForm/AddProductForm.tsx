'use client';

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  Autocomplete,
  CircularProgress
} from "@mui/material";
import { ProductFormData, productSchema } from "./type";
import { addProduct, getProductTypes } from "./product_api";
import debounce from 'lodash/debounce';

interface AddProductFormProps {
  open: boolean;
  onClose: () => void;
}

export default function AddProductForm({ open, onClose }: AddProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [typeSearchQuery, setTypeSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Fetch product types
  const { data: productTypes = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ['productTypes', typeSearchQuery],
    queryFn: () => getProductTypes(typeSearchQuery),
    // Only start searching when user types
    enabled: open,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      code: "#",
      type: {},
      price: 0,
      quantity: 0,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      onClose();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  // Debounce the search input to prevent too many API calls
  const handleSearchChange = debounce((searchQuery: string) => {
    setTypeSearchQuery(searchQuery);
  }, 300);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setError(null);
      await mutateAsync(data);
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Code"
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={productTypes}
                  getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.name
                  }
                  isOptionEqualToValue={(option, value) =>{
                    if (!option || !value) return false;
                    return option.id === value.id || option.name === value.name;
                  }}
                  loading={isLoadingTypes}
                  onInputChange={(_, newValue) => {
                    handleSearchChange(newValue);
                  }}
                  onChange={(_, newValue) => {
                    onChange(newValue || null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Type"
                      error={!!errors.type}
                      helperText={errors.type?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingTypes ? (
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

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  onChange={(e) => onChange(Number(e.target.value))}
                  label="Price"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="quantity"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <TextField
                  {...field}
                  onChange={(e) => onChange(Number(e.target.value))}
                  label="Quantity"
                  type="number"
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Add Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}