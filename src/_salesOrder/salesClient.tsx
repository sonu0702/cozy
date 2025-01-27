"use client"
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import SalesList from "@/_salesOrder/SalesList/SalesList";
import TopNavBar from "@/_salesOrder/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";
import SalesOrderForm from "./SalesForm/SalesOrderForm";
import InvoiceForm from "./Invoice/InvoiceForm";


export default function SalesClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isFormOpen ?
          (<InvoiceForm onClose={handleCloseForm} />) : (
            <>
              <TopNavBar onOpenForm={handleOpenForm} />
              <SalesList />
            </>

          )
        }
        {/* <SalesOrderForm open={isFormOpen} onClose={handleCloseForm} /> */}
      </Suspense>
    </>
  )
}