'use client';
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import AddProductForm from "@/_inventory/AddProductForm/AddProductForm";
import ProductList from "@/_inventory/ProductList/ProductList";
import TopNavBar from "@/_inventory/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";
import EditProductForm from "./EditInventoryForm/EditInventory";


export default function Inventory() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [existingProduct, setExistingProduct] = useState<any>(null)

  const handleOpenForm = () => setIsAddFormOpen(true);
  const handleCloseForm = () => setIsAddFormOpen(false);

  const handleEditOpen = (existingProduct: any) => {
    setExistingProduct(existingProduct);
    setIsEditFormOpen(true);
  }

  const handleEditClose = () => {
    setExistingProduct(null);
    setIsEditFormOpen(false);
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>

        <TopNavBar onAddClick={handleOpenForm} />
        <ProductList
          onEditClick={handleEditOpen}
        />
        <AddProductForm
          open={isAddFormOpen}
          onClose={handleCloseForm}
        />
        <EditProductForm
          open={isEditFormOpen}
          existingProduct={existingProduct && {
            name: existingProduct?.name,
            code: existingProduct?.code,
            quantity: existingProduct?.quantity,
            price: existingProduct?.price,
            type: existingProduct?.type
          }}
          productId={existingProduct && existingProduct.id}
          onClose={handleEditClose}
        />
      </Suspense>
    </>
  )
}