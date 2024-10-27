import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import ProductList from "@/_salesOrder/ProductList/ProductList";
import TopNavBar from "@/_salesOrder/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense } from "react";


export default function SalesOrders() {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <TopNavBar />
      <ProductList />
      </Suspense>
    </>
  )
}