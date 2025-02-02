import React, { useState } from 'react';
import { Button, Box, Stack, TextField, Typography, Divider, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InvoiceModal from './InvoiceModal';
import InvoiceTable from './InvoiceTable';
import { useAuth } from '@/_global/components/context/AuthContext';
import { createInvoice } from '@/_global/api/api';
import { CreateInvoiceRequest } from '@/_global/api/types';

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

interface InvoiceDetails {
    gstin: string;
    address: string;
    serialNo: string;
    date: string;
    panNo: string;
    cinNo: string;
    state: string;
    stateCode: string;
    billTo: {
        name: string;
        address: string;
        state: string;
        stateCode: string;
        gstin: string;
    };
    shipTo: {
        name: string;
        address: string;
        state: string;
        stateCode: string;
        gstin: string;
    };
}

interface InvoiceForm {
    onClose: () => void;
}

const convertToWords = (amount: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertGroup = (n: number): string => {
        if (n === 0) return '';
        else if (n < 10) return ones[n];
        else if (n < 20) return teens[n - 10];
        else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
        else return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertGroup(n % 100) : '');
    };

    const wholePart = Math.floor(amount);
    const decimalPart = Math.round((amount - wholePart) * 100);

    if (wholePart === 0 && decimalPart === 0) return 'Zero';

    let result = '';
    const crores = Math.floor(wholePart / 10000000);
    const lakhs = Math.floor((wholePart % 10000000) / 100000);
    const thousands = Math.floor((wholePart % 100000) / 1000);
    const hundreds = wholePart % 1000;

    if (crores > 0) result += convertGroup(crores) + ' Crore ';
    if (lakhs > 0) result += convertGroup(lakhs) + ' Lakh ';
    if (thousands > 0) result += convertGroup(thousands) + ' Thousand ';
    if (hundreds > 0) result += convertGroup(hundreds);

    result = result.trim();
    if (decimalPart > 0) {
        result += ' and ' + convertGroup(decimalPart) + ' Paise';
    } else {
        result += ' Rupees Only';
    }

    return result;
};

const InvoiceForm: React.FC<InvoiceForm> = ({ onClose }) => {
    const { user, activeShop } = useAuth();
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<InvoiceItem | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [copyBillToShip, setCopyBillToShip] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>(() => ({
        gstin: activeShop?.gstin || 'GSTIN123456789',
        address: activeShop?.address || '123 Business Park, Tech Hub, Bangalore',
        serialNo: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        date: new Date().toLocaleDateString('en-GB'),
        panNo: activeShop?.pan || 'PANABCD1234E',
        cinNo: activeShop?.cin || 'CIN123456789',
        state: activeShop?.state || 'Karnataka',
        stateCode: activeShop?.state_code || '29',
        billTo: {
            name: 'Client Name',
            address: 'Client Address',
            state: 'Client State',
            stateCode: '00',
            gstin: 'Client GSTIN'
        },
        shipTo: {
            name: 'Client Name',
            address: 'Client Address',
            state: 'Client State',
            stateCode: '00',
            gstin: 'Client GSTIN'
        }
    }));

    const addItem = (item: InvoiceItem) => {
        setItems([...items, item]);
        setIsModalOpen(false);
    };

    const editItem = (index: number, item: InvoiceItem) => {
        const newItems = items.map((i, idx) => (idx === index ? item : i));
        setItems(newItems);
        setIsModalOpen(false);
    };

    const deleteItem = (index: number) => {
        const newItems = items.filter((_, idx) => idx !== index);
        setItems(newItems);
    };

    const openModal = (item: InvoiceItem | null = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const invoiceData: CreateInvoiceRequest = {
                gstin: invoiceDetails.gstin,
                address: invoiceDetails.address,
                serialNo: invoiceDetails.serialNo,
                date: invoiceDetails.date,
                panNo: invoiceDetails.panNo,
                cinNo: invoiceDetails.cinNo,
                state: invoiceDetails.state,
                stateCode: invoiceDetails.stateCode,
                billTo: {
                    name: invoiceDetails.billTo.name,
                    address: invoiceDetails.billTo.address,
                    state: invoiceDetails.billTo.state,
                    stateCode: invoiceDetails.billTo.stateCode,
                    gstin: invoiceDetails.billTo.gstin
                },
                shipTo: {
                    name: invoiceDetails.shipTo.name,
                    address: invoiceDetails.shipTo.address,
                    state: invoiceDetails.shipTo.state,
                    stateCode: invoiceDetails.shipTo.stateCode,
                    gstin: invoiceDetails.shipTo.gstin
                },
                total: totalAmount,
                items: items.map(item => ({
                    description: item.description,
                    hsnSacCode: item.hsnSacCode,
                    quantity: item.quantity,
                    unitValue: item.unitValue,
                    discount: item.discount,
                    taxableValue: item.taxableValue,
                    cgstRate: item.cgstRate,
                    cgstAmount: item.cgstAmount,
                    sgstRate: item.sgstRate,
                    sgstAmount: item.sgstAmount,
                    igstRate: item.igstRate,
                    igstAmount: item.igstAmount
                }))
            };
            
            await createInvoice(activeShop?.id as string, invoiceData);
            onClose();
        } catch (error) {
            console.error('Failed to create invoice:', error);
            // TODO: Add error handling UI
        }
    };

    const totalTaxableValue = items.reduce((total, item) => total + item.taxableValue, 0);
    const totalCgstAmount = items.reduce((total, item) => total + item.cgstAmount, 0);
    const totalSgstAmount = items.reduce((total, item) => total + item.sgstAmount, 0);
    const totalIgstAmount = items.reduce((total, item) => total + item.igstAmount, 0);
    const totalAmount = totalTaxableValue + totalCgstAmount + totalSgstAmount + totalIgstAmount;

    const handleBillToShipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCopyBillToShip(event.target.checked);
        if (event.target.checked) {
            setInvoiceDetails(prev => ({
                ...prev,
                shipTo: { ...prev.billTo }
            }));
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        if (newDate) {
            setInvoiceDetails(prev => ({
                ...prev,
                date: newDate.toLocaleDateString('en-GB')
            }));
        }
    };

    const handleInvoiceDetailsChange = (field: string, value: string) => {
        setInvoiceDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBillToChange = (field: string, value: string) => {
        setInvoiceDetails(prev => ({
            ...prev,
            billTo: {
                ...prev.billTo,
                [field]: value
            }
        }));
    };

    const handleShipToChange = (field: string, value: string) => {
        setInvoiceDetails(prev => ({
            ...prev,
            shipTo: {
                ...prev.shipTo,
                [field]: value
            }
        }));
    };

    return (
        <Box p={2} sx={{ fontSize: '0.7rem', position: 'relative' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                        Invoice Form
                    </Typography>
                    <IconButton onClick={() => setEditMode(!editMode)} size="small" sx={{ ml: 1 }}>
                        {editMode ? <CloseIcon /> : <EditIcon />}
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => openModal()}
                        sx={{ fontSize: '0.6rem' }}
                    >
                        Add Item
                    </Button>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Box display="flex" gap={2} alignItems="flex-start">
                            <Box flex={1}>
                                <Stack spacing={1}>
                                    <Box display="flex" gap={2} alignItems="center">
                                        {editMode ? (
                                            <TextField
                                                label="Invoice No"
                                                value={invoiceDetails.serialNo}
                                                onChange={(e) => handleInvoiceDetailsChange('serialNo', e.target.value)}
                                                size="small"
                                                sx={{ flex: 1 }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontSize: '0.8rem' }}>
                                                <strong>Invoice No:</strong> {invoiceDetails.serialNo}
                                            </Typography>
                                        )}
                                        {editMode ? (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Date"
                                                    value={new Date(invoiceDetails.date)}
                                                    onChange={handleDateChange}
                                                    slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
                                                />
                                            </LocalizationProvider>
                                        ) : (
                                            <Typography sx={{ fontSize: '0.8rem' }}>
                                                <strong>Date:</strong> {invoiceDetails.date}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box display="flex" gap={2} alignItems="center">
                                        {editMode ? (
                                            <>
                                                <TextField
                                                    label="PAN No"
                                                    value={invoiceDetails.panNo}
                                                    onChange={(e) => handleInvoiceDetailsChange('panNo', e.target.value)}
                                                    size="small"
                                                    sx={{ flex: 1 }}
                                                />
                                                <TextField
                                                    label="GSTIN"
                                                    value={invoiceDetails.gstin}
                                                    onChange={(e) => handleInvoiceDetailsChange('gstin', e.target.value)}
                                                    size="small"
                                                    sx={{ flex: 1 }}
                                                />
                                            </>
                                        ) : (
                                            <Box display="flex" gap={2}>
                                                <Typography sx={{ fontSize: '0.8rem' }}>
                                                    <strong>PAN No:</strong> {invoiceDetails.panNo}
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.8rem' }}>
                                                    <strong>GSTIN:</strong> {invoiceDetails.gstin}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Stack>
                            </Box>
                            <Box flex={1}>
                                <Stack spacing={1}>
                                    {editMode ? (
                                        <TextField
                                            label="Address"
                                            value={invoiceDetails.address}
                                            onChange={(e) => handleInvoiceDetailsChange('address', e.target.value)}
                                            multiline
                                            rows={2}
                                            size="small"
                                        />
                                    ) : (
                                        <Typography sx={{ fontSize: '0.8rem' }}>
                                            <strong>Address:</strong> {invoiceDetails.address}
                                        </Typography>
                                    )}
                                    <Box display="flex" gap={2} alignItems="center">
                                        {editMode ? (
                                            <>
                                                <TextField
                                                    label="State"
                                                    value={invoiceDetails.state}
                                                    onChange={(e) => handleInvoiceDetailsChange('state', e.target.value)}
                                                    size="small"
                                                    sx={{ flex: 1 }}
                                                />
                                                <TextField
                                                    label="State Code"
                                                    value={invoiceDetails.stateCode}
                                                    onChange={(e) => handleInvoiceDetailsChange('stateCode', e.target.value)}
                                                    size="small"
                                                    sx={{ flex: 1 }}
                                                />
                                            </>
                                        ) : (
                                            <Box display="flex" gap={2}>
                                                <Typography sx={{ fontSize: '0.8rem' }}>
                                                    <strong>State:</strong> {invoiceDetails.state}
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.8rem' }}>
                                                    <strong>State Code:</strong> {invoiceDetails.stateCode}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>

                        <Divider />

                        <Box display="flex" gap={4}>
                            <Box flex={1}>
                                <Box marginBottom={"12px"} marginTop={"8px"}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Bill To:</Typography>
                                </Box>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Name"
                                        value={invoiceDetails.billTo.name}
                                        onChange={(e) => handleBillToChange('name', e.target.value)}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                    <TextField
                                        label="Address"
                                        value={invoiceDetails.billTo.address}
                                        onChange={(e) => handleBillToChange('address', e.target.value)}
                                        multiline
                                        rows={3}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                    <Box display="flex" gap={2}>
                                        <TextField
                                            label="State"
                                            value={invoiceDetails.billTo.state}
                                            onChange={(e) => handleBillToChange('state', e.target.value)}
                                            size="small"
                                            sx={{ flex: 1, '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                        />
                                        <TextField
                                            label="State Code"
                                            value={invoiceDetails.billTo.stateCode}
                                            onChange={(e) => handleBillToChange('stateCode', e.target.value)}
                                            size="small"
                                            sx={{ flex: 1, '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                        />
                                    </Box>
                                    <TextField
                                        label="GSTIN"
                                        value={invoiceDetails.billTo.gstin}
                                        onChange={(e) => handleBillToChange('gstin', e.target.value)}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                </Stack>
                            </Box>
                            <Box flex={1}>
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Ship To:</Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={copyBillToShip}
                                                onChange={handleBillToShipChange}
                                                size="small"
                                            />
                                        }
                                        label="Same as Bill To"
                                    />
                                </Box>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Name"
                                        value={invoiceDetails.shipTo.name}
                                        onChange={(e) => handleShipToChange('name', e.target.value)}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                    <TextField
                                        label="Address"
                                        value={invoiceDetails.shipTo.address}
                                        onChange={(e) => handleShipToChange('address', e.target.value)}
                                        multiline
                                        rows={3}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                    <Box display="flex" gap={2}>
                                        <TextField
                                            label="State"
                                            value={invoiceDetails.shipTo.state}
                                            onChange={(e) => handleShipToChange('state', e.target.value)}
                                            size="small"
                                            sx={{ flex: 1, '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                        />
                                        <TextField
                                            label="State Code"
                                            value={invoiceDetails.shipTo.stateCode}
                                            onChange={(e) => handleShipToChange('stateCode', e.target.value)}
                                            size="small"
                                            sx={{ flex: 1, '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                        />
                                    </Box>
                                    <TextField
                                        label="GSTIN"
                                        value={invoiceDetails.shipTo.gstin}
                                        onChange={(e) => handleShipToChange('gstin', e.target.value)}
                                        size="small"
                                        fullWidth
                                        sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
                                    />
                                </Stack>
                            </Box>
                        </Box>

                        <Divider />
                        <InvoiceTable items={items} onEdit={openModal} onDelete={deleteItem} />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Box width="200px">
                                <Typography sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>TOTAL</Typography>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ fontSize: '0.7rem' }}>{totalTaxableValue.toFixed(2)}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem' }}>{totalCgstAmount.toFixed(2)}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem' }}>{totalSgstAmount.toFixed(2)}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem' }}>NA</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box>
                            <Typography sx={{ fontSize: '0.7rem', mb: 1 }}>Total Invoice Value (In figure): {totalAmount.toFixed(2)}</Typography>
                            <Typography sx={{ fontSize: '0.7rem', mb: 2 }}>Total Invoice Value (In Words): {convertToWords(totalAmount)}</Typography>
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: '0.7rem', mb: 1 }}>Declaration:</Typography>
                            <Typography sx={{ fontSize: '0.7rem', mb: 2, fontStyle: 'italic' }}>Certified that the particulars given above are true and correct and checked under my supervision.</Typography>
                        </Box>

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Box textAlign="center">
                                <Typography sx={{ fontSize: '0.7rem', mb: 1 }}>For Pivora Experiential Communications Pvt Ltd</Typography>
                                <Box sx={{ borderBottom: '1px solid black', width: '200px', mb: 1 }} />
                                <Typography sx={{ fontSize: '0.7rem' }}>Signature of the Licencee or his authorised agent</Typography>
                            </Box>
                        </Box>

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontSize: '0.6rem' }}>
                            Submit Invoice
                        </Button>
                    </Stack>
                </form>
            </Box>

            {isModalOpen && (
                <InvoiceModal
                    item={currentItem}
                    onSave={currentItem ? (item) => editItem(items.indexOf(currentItem), item) : addItem}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Box>
    );
};

export default InvoiceForm;
