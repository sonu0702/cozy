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
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const handleOpenForm = (invoiceId?: string) => {
    setSelectedInvoiceId(invoiceId || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedInvoiceId(null);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isFormOpen ? (
          <InvoiceForm onClose={handleCloseForm} invoiceId={selectedInvoiceId} />
        ) : (
          <>
            <TopNavBar onOpenForm={handleOpenForm} />
            <SalesList onOpenForm={handleOpenForm}/>
          </>
        )}
      </Suspense>
    </>
  )
}