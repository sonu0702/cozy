'use client';
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

const salesList = [
    {
        id: 1,
        name: "Macbook Pro",
        code: '#0001',
        type: 'Laptop',
        total_price: 1.123,
        price_currency: '$',
        quantity: 23,
        invoice:{}
    },
    {
        id: 2,
        name: "Macbook Pro",
        code: '#0001',
        type: 'Laptop',
        total_price: 1.123,
        price_currency: '$',
        quantity: 23,
        invoice:{}
    },
    {
        id: 3,
        name: "Macbook Pro",
        code: '#0001',
        type: 'Laptop',
        total_price: 1.123,
        price_currency: '$',
        quantity: 23,
        invoice:{}
    },
    {
        id: 4,
        name: "Macbook Pro",
        code: '#0001',
        type: 'Laptop',
        total_price: 1.123,
        price_currency: '$',
        quantity: 23,
        invoice:{}
    },
    {
        id: 5,
        name: "Macbook Pro",
        code: '#0001',
        type: 'Laptop',
        total_price: 1.123,
        price_currency: '$',
        quantity: 23,
        invoice:{}
    }
]
export default function SalesList() {
    const [pageNumber, setPageNumber] = useState(2);
    return (
        <Box marginTop={'2rem'}>
            <Typography color={'grey.400'} variant="mdSemibold" pb={'1rem'}>
                Sales List
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
                                    Total Price
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Quantity
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Invoice
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesList.map((product, index) => (
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
                                        {product.type}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        {`${product.price_currency} ${product.total_price}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        {product.quantity}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        View Invoice
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