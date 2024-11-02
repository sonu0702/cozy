'use client';
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
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
    return (
        <Box marginTop={'2rem'}>
            <Typography color={'grey.400'} variant="mdSemibold" pb={'1rem'}>
                Product List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}>
                                    Code
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}>
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Quantity
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={product.id}
                                sx={{ backgroundColor: index % 2 === 0 ? 'grey.800' : 'unset' }}
                            >
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular">
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular">
                                        {product.code}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular">
                                        {product.type.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        {`${product.price_currency} ${product.price}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        {product.quantity}
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
                    onClick={() => []}
                    startIcon={<IconArrowLeft size={16} />}

                >
                    Prev
                </Button>
                <Pagination count={12}
                    variant="text"
                    shape="rounded"
                    sx={{ mt: '2rem' }}
                    page={pageNumber}
                    onChange={(event, value) => {
                        return []
                    }}
                    siblingCount={3}
                    renderItem={(item) => <PaginationItem {...item} />}
                    hideNextButton={true}
                    hidePrevButton={true}
                />
                <Button
                    variant="semiDarkContained"
                    disabled={pageNumber === 1} // this will change
                    onClick={() => []}
                    startIcon={<IconArrowRight size={16} />}

                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}