'use client';
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import AddProductForm from "@/_inventory/AddProductForm/AddProductForm";
import ProductList from "@/_inventory/ProductList/ProductList";
import TopNavBar from "@/_inventory/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";


export default function Inventory() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleOpenForm = () => setIsAddFormOpen(true);
  const handleCloseForm = () => setIsAddFormOpen(false);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>

        <TopNavBar onAddClick={handleOpenForm} />
        <ProductList />
        <AddProductForm
          open={isAddFormOpen}
          onClose={handleCloseForm}
        />
      </Suspense>
    </>
  )
}