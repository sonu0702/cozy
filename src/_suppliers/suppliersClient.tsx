"use client"
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import SuppliersList from "@/_suppliers/ProductList/ProductList";
import TopNavBar from "@/_suppliers/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";
import AddSupplierForm from "./AddSupplierForm/AddSupplier";

export default function SuppliersClient() {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const handleOpenForm = () => setIsAddFormOpen(true);
    const handleCloseForm = () => setIsAddFormOpen(false);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <TopNavBar onAddClick={handleOpenForm} />
                <SuppliersList />
                <AddSupplierForm
                    open={isAddFormOpen}
                    onClose={handleCloseForm} />
            </Suspense>
        </>
    )
}