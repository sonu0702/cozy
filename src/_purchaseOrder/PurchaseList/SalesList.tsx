'use client';
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography, Menu, MenuItem
} from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { listInvoices, generatePdf } from '@/_global/api/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/_global/components/context/AuthContext';
import { InvoiceType } from "@/_global/api/types";

interface TopNavBarProps {
    onOpenForm: (invoiceId?: string) => void;
}

export default function SalesList({onOpenForm} : TopNavBarProps) {
    const { activeShop } = useAuth();
    const [pageNumber, setPageNumber] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
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
        queryKey: ['purchase-invoices', activeShop?.id, pageNumber],
        queryFn: () => listInvoices(activeShop?.id as string, pageNumber, limit, InvoiceType.PURCHASE),
        enabled: !!activeShop?.id,
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

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
                                <Typography variant="smBold">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="smBold">
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