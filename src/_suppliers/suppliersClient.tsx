"use client"
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import SuppliersList from "@/_suppliers/ProductList/ProductList";
import TopNavBar from "@/_suppliers/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";
import AddSupplierForm from "./AddSupplierForm/AddSupplier";
import EditSupplierForm from "./EditSupplierForm/AddSupplier";

export default function SuppliersClient() {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [existingSupplier, setExistingSupplier] = useState<any>(null)
    const handleOpenForm = () => setIsAddFormOpen(true);
    const handleCloseForm = () => setIsAddFormOpen(false);

    const handleOpenEditForm = () => setIsEditFormOpen(true);
    const handleCloseEditForm = () => setIsEditFormOpen(false);
    const handleEditOpen = (existingSupplier: any) => {
        console.log("existingSupplier",existingSupplier);
        setExistingSupplier(existingSupplier)
        handleOpenEditForm();
    }
    const handleEditClose = () => {
        setExistingSupplier(null);
        handleCloseEditForm();
    }
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <TopNavBar onAddClick={handleOpenForm} />
                <SuppliersList onEditClick={handleEditOpen} />
                <AddSupplierForm
                    open={isAddFormOpen}
                    onClose={handleCloseForm} />
                <EditSupplierForm
                    open={isEditFormOpen}
                    onClose={handleEditClose}
                    existingSupplier={existingSupplier && {
                        address: existingSupplier.address,
                        name: existingSupplier.name,
                        contact: existingSupplier.contact,
                        email: existingSupplier.email
                    }}
                    supplierId={existingSupplier && existingSupplier.id}
                />
            </Suspense>
        </>
    )
}