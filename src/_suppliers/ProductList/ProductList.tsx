'use client';
import {
    Box, Button, Pagination, PaginationItem, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

const suppliersList = [
    {
        id: 1,
        name: "John Doer",
        email: "john@house.com",
        contact: "+1 232 234",
        address: "NC caroline, 123780, USA"
    },
    {
        id: 2,
        name: "John Doer",
        email: "john@house.com",
        contact: "+1 232 234",
        address: "NC caroline, 123780, USA"
    },
    {
        id: 3,
        name: "John Doer",
        email: "john@house.com",
        contact: "+1 232 234",
        address: "NC caroline, 123780, USA"
    },
    {
        id: 4,
        name: "John Doer",
        email: "john@house.com",
        contact: "+1 232 234",
        address: "NC caroline, 123780, USA"
    },
    {
        id: 5,
        name: "John Doer",
        email: "john@house.com",
        contact: "+1 232 234",
        address: "NC caroline, 123780, USA"
    }
]
export default function SuppliersList() {
    const [pageNumber, setPageNumber] = useState(2);
    return (
        <Box marginTop={'2rem'}>
            <Typography color={'grey.400'} variant="mdSemibold" pb={'1rem'}>
                Suppliers List
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
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '125px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}>
                                    Contact
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: '110px' }}>
                                <Typography variant="xsSemibold" color={'grey.400'}
                                    textAlign={'right'}>
                                    Address
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliersList.map((product, index) => (
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
                                        {product.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular">
                                        {product.contact}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'grey.300'} variant="smRegular" textAlign={'right'}>
                                        {product.address}
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