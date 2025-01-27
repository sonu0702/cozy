import React, { useState } from 'react';
import { Button, Box, Stack, TextField, Typography, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InvoiceModal from './InvoiceModal';
import InvoiceTable from './InvoiceTable';

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

const InvoiceForm: React.FC<InvoiceForm> = ({ onClose }) => {
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<InvoiceItem | null>(null);
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
        gstin: '29AAPCP2330Q1ZQ',
        address: '2313, 2nd Floor, Saptaghiri Padmini, 15 th Main Road, 2nd Cross Hal 2nd Stage Bengaluru - 560008',
        serialNo: '001/2024-25',
        date: '20-01-2025',
        panNo: 'AAPCP2330Q',
        cinNo: 'U93290KA2024PTC195321',
        state: 'Karnataka',
        stateCode: '29',
        billTo: {
            name: 'Zscaler Softech India Private Limited',
            address: '3, 63-159-8/2, Bren Optimus, Dr.M.H. Marigowda Road, Dairy Colony, Adugodi, Bengaluru - 560029',
            state: 'Karnataka',
            stateCode: '29',
            gstin: '29AAICSO242G1ZD',
        },
        shipTo: {
            name: 'Zscaler Softech India Private Limited',
            address: '3, 63-159-8/2, Bren Optimus, Dr.M.H. Marigowda Road, Dairy Colony, Adugodi, Bengaluru - 560029',
            state: 'Karnataka',
            stateCode: '29',
            gstin: '29AAICSO242G1ZD',
        },
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(items, invoiceDetails);
    };

    const totalTaxableValue = items.reduce((total, item) => total + item.taxableValue, 0);
    const totalCgstAmount = items.reduce((total, item) => total + item.cgstAmount, 0);
    const totalSgstAmount = items.reduce((total, item) => total + item.sgstAmount, 0);
    const totalIgstAmount = items.reduce((total, item) => total + item.igstAmount, 0);
    const totalAmount = totalTaxableValue + totalCgstAmount + totalSgstAmount + totalIgstAmount;

    return (
        <Box p={2} sx={{ fontSize: '0.7rem' }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '0.8rem' }}>
                Invoice Form
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => onClose()} sx={{ mb: 2, fontSize: '0.6rem' }}>
                Close
            </Button>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => openModal()} sx={{ mb: 2, fontSize: '0.6rem' }}>
                Add Item
            </Button>
            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between">
                            <TextField label="GSTIN" value={invoiceDetails.gstin} sx={{ flex: 1, mr: 1, fontSize: '0.2rem' }} />
                            <TextField label="PAN No" value={invoiceDetails.panNo} sx={{ flex: 1, ml: 1, fontSize: '0.2rem' }} />
                        </Box>
                        <TextField label="Address" value={invoiceDetails.address} fullWidth multiline rows={3} sx={{ fontSize: '0.6rem' }} />
                        <Box display="flex" justifyContent="space-between">
                            <TextField label="Serial No. of Invoice" value={invoiceDetails.serialNo} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
                            <TextField label="Date" value={invoiceDetails.date} sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
                        </Box>
                        <Box display="flex" justifyContent="space-between">

                            {/* <Box display="flex" flexDirection="column"> */}
                            <TextField label="CIN No" value={invoiceDetails.cinNo} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
                            <TextField label="State" value={invoiceDetails.state} sx={{ mb: 1, fontSize: '0.6rem' }} />
                            <TextField label="State Code" value={invoiceDetails.stateCode} sx={{ fontSize: '0.6rem' }} />
                            {/* </Box> */}
                        </Box>
                        <Divider />
                        <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>Bill To:</Typography>
                        <TextField label="Name" value={invoiceDetails.billTo.name} fullWidth sx={{ fontSize: '0.6rem' }} />
                        <TextField label="Address" value={invoiceDetails.billTo.address} fullWidth multiline rows={3} sx={{ fontSize: '0.6rem' }} />
                        <Box display="flex" justifyContent="space-between">
                            <TextField label="State" value={invoiceDetails.billTo.state} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
                            <TextField label="State Code" value={invoiceDetails.billTo.stateCode} sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
                        </Box>
                        <TextField label="GSTIN" value={invoiceDetails.billTo.gstin} fullWidth sx={{ fontSize: '0.6rem' }} />
                        <Divider />
                        <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>Ship To:</Typography>
                        <TextField label="Name" value={invoiceDetails.shipTo.name} fullWidth sx={{ fontSize: '0.6rem' }} />
                        <TextField label="Address" value={invoiceDetails.shipTo.address} fullWidth multiline rows={3} sx={{ fontSize: '0.6rem' }} />
                        <Box display="flex" justifyContent="space-between">
                            <TextField label="State" value={invoiceDetails.shipTo.state} sx={{ flex: 1, mr: 1, fontSize: '0.6rem' }} />
                            <TextField label="State Code" value={invoiceDetails.shipTo.stateCode} sx={{ flex: 1, ml: 1, fontSize: '0.6rem' }} />
                        </Box>
                        <TextField label="GSTIN" value={invoiceDetails.shipTo.gstin} fullWidth sx={{ fontSize: '0.6rem' }} />
                        <Divider />
                        <InvoiceTable items={items} onEdit={openModal} onDelete={deleteItem} />
                        <Divider />
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>Total:</Typography>
                            <Box>
                                <Typography sx={{ fontSize: '0.6rem' }}>Taxable Value: {totalTaxableValue.toFixed(2)}</Typography>
                                <Typography sx={{ fontSize: '0.6rem' }}>CGST Amount: {totalCgstAmount.toFixed(2)}</Typography>
                                <Typography sx={{ fontSize: '0.6rem' }}>SGST Amount: {totalSgstAmount.toFixed(2)}</Typography>
                                <Typography sx={{ fontSize: '0.6rem' }}>IGST Amount: {totalIgstAmount.toFixed(2)}</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>Total Amount: {totalAmount.toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontSize: '0.6rem' }}>
                        Submit Invoice
                    </Button>
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
