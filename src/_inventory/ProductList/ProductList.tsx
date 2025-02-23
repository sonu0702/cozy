'use client';
import { listProduct } from "@/_global/api/api";
import { useAuth } from "@/_global/components/context/AuthContext";
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const productList = [
    {
        id: '1',
        name: "Macbook Pro",
        code: '#0001',
        type: {
            id: '1',
            name: "Laptop"
        },
        price: 1.123,
        price_currency: '$',
        quantity: 23
    },
    {
        id: '2',
        name: "Macbook Pro",
        code: '#0001',
        type: {
            id: '1',
            name: "Laptop"
        },
        price: 1.123,
        price_currency: '$',
        quantity: 23
    },
    {
        id: '3',
        name: "Macbook Pro",
        code: '#0001',
        type: {
            id: '1',
            name: "Laptop"
        },
        price: 1.123,
        price_currency: '$',
        quantity: 23
    },
    {
        id: '4',
        name: "Macbook Pro",
        code: '#0001',
        type: {
            id: '1',
            name: "Laptop"
        },
        price: 1.123,
        price_currency: '$',
        quantity: 23
    },
    {
        id: '5',
        name: "Macbook Pro",
        code: '#0001',
        type: {
            id: '1',
            name: "Laptop"
        },
        price: 1.123,
        price_currency: '$',
        quantity: 23
    }
]

export type SupplierListProps = {
    onEditClick: (existingSupplier:any ) => void
}

export default function ProductList({onEditClick }:SupplierListProps ) {
    const [pageNumber, setPageNumber] = useState(2);
    const {activeShop} = useAuth();
    const limit = 5;

    const { data: productListData, isLoading, error, refetch,isFetching} = useQuery({
        queryKey: ['product-list', activeShop?.id, pageNumber],
        queryFn: () => listProduct(activeShop?.id as string, pageNumber, limit),
        enabled:!!activeShop?.id,
    });
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>Loading...</Typography>
            </Box>
        );
    }
    if(error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography>Error: {error.message}</Typography>
            </Box>
        );
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    return (
        <Box marginTop={'2rem'}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography color={'grey.700'} variant="mdSemibold" pb={'1rem'}>
                    Product List
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
                                    Code
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="smBold">
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    Price
                                </Typography>
                            </TableCell>
                            {/* <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Quantity
                                </Typography>
                            </TableCell> */}
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    CGST
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    SGST
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    IGST
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="smBold"
                                    textAlign={'right'}>
                                    Discount
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(productListData?.data?.products || []).map((product, index) => (
                            <TableRow key={product.id}
                                sx={{ backgroundColor: index % 2 === 0 ? 'grey.200' : 'unset' }}
                            >
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular">
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular">
                                        {product.hsn}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular">
                                        {product.category}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        {product.price}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        {product.cgst}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        {product.sgst}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        {product.igst}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.700'} variant="smRegular" textAlign={'right'}>
                                        {product.discount_percent}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: '110px' }}>
                                    <Typography variant="xsSemibold" color={'grey.400'}
                                        textAlign={'right'}>
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={() => onEditClick(product)}
                                        >
                                            Edit
                                        </Button>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={'flex'}
                justifyContent={{ md: 'space-between' }}
                alignItems={'flex-end'}
            >
                <Button
                    variant="semiDarkContained"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                    startIcon={<IconArrowLeft size={16} />}

                >
                    Prev
                </Button>
                <Pagination 
                    count={Math.ceil((productListData?.data?.pagination.total || 0 )/ limit)}    
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
                    variant="semiDarkContained"
                    disabled={pageNumber>= Math.ceil((productListData?.data?.pagination.total || 0) / limit)} // this will change
                    onClick={() => setPageNumber(prev => prev + 1)}
                    startIcon={<IconArrowRight size={16} />}

                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}