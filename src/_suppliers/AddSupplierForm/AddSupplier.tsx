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
    CircularProgress,

} from "@mui/material";
import { SupplierFormData, supplierSchema } from "./type";
import { addSupplier } from "./supplier_api";

interface AddSupplierFormProps {
    open: boolean;
    onClose: () => void;
}

export default function AddSupplierForm({ open, onClose }: AddSupplierFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [typeSearchQuery, setTypeSearchQuery] = useState("");
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            name: "",
            address: "",
            contact: "",
            email: ""
        },
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: addSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["supplier"] });
            reset();
            onClose();
        },
        onError: (error: Error) => {
            setError(error.message);
        },
    });

    const onSubmit = async (data: SupplierFormData) => {
        try {
            setError(null);
            await mutateAsync(data);
        } catch (err) {
            console.error('Failed to submit:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Supplier</DialogTitle>
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
                                    label="Supplier Name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="contact"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Contact"
                                    error={!!errors.contact}
                                    helperText={errors.contact?.message}
                                    fullWidth
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}

                            render={({ field }) => (
                                <TextField
                                    multiline
                                    placeholder="Supplier's address"
                                    rows={4}
                                    {...field}
                                    label="Address"
                                    error={!!errors.contact}
                                    helperText={errors.contact?.message}
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
                        Add Supplier
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}