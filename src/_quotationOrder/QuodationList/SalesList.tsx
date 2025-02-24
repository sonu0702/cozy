'use client';
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography, Menu, MenuItem
} from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { listInvoices, generatePdf, convertToInvoice } from '@/_global/api/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/_global/components/context/AuthContext';
import { InvoiceType } from "@/_global/api/types";

interface TopNavBarProps {
    onOpenForm: (invoiceId?: string) => void;
    refreshTrigger?: boolean;
}

export default function SalesList({onOpenForm, refreshTrigger} : TopNavBarProps) {
    const { activeShop } = useAuth();
    const [pageNumber, setPageNumber] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);

    const limit = 10;

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, invoice: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedInvoice(invoice);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedInvoice(null);
    };

    const handleEditClick = () => {
        onOpenForm(selectedInvoice.id);
        handleMenuClose();
    };

    const { data: invoicesData, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['qotation-invoices', activeShop?.id, pageNumber, refreshTrigger],
        queryFn: () => listInvoices(activeShop?.id as string, pageNumber, limit, InvoiceType.QUOTATION),
        enabled: !!activeShop?.id,
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    const handleDownloadClick = async () => {
        try {
            if (!selectedInvoice) return;
            setIsDownloading(true);
            const pdfBlob = await generatePdf(selectedInvoice.id);
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${selectedInvoice.serialNo}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            handleMenuClose();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error('Failed to download PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleConvertToInvoiceClick = async () => {
        try {
            if(!selectedInvoice) return;
            setIsConverting(true);
            await convertToInvoice(selectedInvoice.id);
            toast.success('Successfully converted to invoice');
            refetch();
            handleMenuClose();
        } catch (error) {
            console.error('Error converting to invoice:', error);
            toast.error('Failed to convert to invoice. Please try again.');
        } finally {
            setIsConverting(false);
        }
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography color="error">Error loading invoices</Typography>
            </Box>
        );
    }

    return (
        <Box marginTop={'2rem'}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography color={'grey.700'} variant="mdSemibold">
                    Purchase List
                </Typography>
                <Button
                    variant="text"
                    color="primary"
                    startIcon={<IconRefresh
                        size={16}
                        style={{
                            animation: isFetching ? 'spin 1s linear infinite' : 'none'
                        }}
                    />}
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    {isFetching ? 'Refreshing...' : 'Refresh'}
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="xsSemibold">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="smBold" >
                                    Invoice
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold" 
                                    textAlign={'right'}>
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'center'}>
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    Invoice Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoicesData?.data.invoices.map((invoice, index) => (
                            <TableRow key={invoice.id}
                                sx={{ backgroundColor: index % 2 === 0 ? 'grey.200' : 'unset' }}
                            >
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular">
                                        {invoice.billTo.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular">
                                        {invoice.serialNo}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        ₹ {Number(invoice.total).toFixed(2)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'center'}>
                                        {new Date(invoice.date).toDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: '110px' }}>
                                    <Typography variant="xsSemibold" color={'grey.400'}
                                        textAlign={'right'}>
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={(e) => handleMenuClick(e, invoice)}
                                        >
                                            Actions
                                        </Button>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem 
                    onClick={handleDownloadClick}
                    disabled={isDownloading}
                >
                    {isDownloading ? 'Downloading...' : 'Download'}
                </MenuItem>
                <MenuItem
                    onClick={handleConvertToInvoiceClick}
                    disabled={isConverting}
                >
                        { isConverting? 'Converting...' : 'Convert to Invoice'}
                </MenuItem>
            </Menu>
            <Box display={'flex'}
                justifyContent={{ md: 'space-between' }}
                alignItems={'flex-end'}
            >
                <Button
                    // variant="semiDarkContained"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                    startIcon={<IconArrowLeft size={16} />}
                >
                    Prev
                </Button>
                <Pagination
                    count={Math.ceil((invoicesData?.data.pagination.total || 0) / limit)}
                    variant="text"
                    shape="rounded"
                    sx={{ mt: '2rem' }}
                    page={pageNumber}
                    onChange={handlePageChange}
                    siblingCount={3}
                    renderItem={(item) => <PaginationItem {...item} />}
                    hideNextButton={true}
                    hidePrevButton={true}
                />
                <Button
                    // variant="semiDarkContained"
                    disabled={pageNumber >= Math.ceil((invoicesData?.data.pagination.total || 0) / limit)}
                    onClick={() => setPageNumber(prev => prev + 1)}
                    startIcon={<IconArrowRight size={16} />}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}