import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import ProductList from "@/_suppliers/ProductList/ProductList";
import TopNavBar from "@/_suppliers/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";

export default function Suppliers() {
  return (
    <>
      <TopNavBar />
      <ProductList />
    </>
  )
}