"use client"
import CardContainer from "@/_homePage/Counter/CardContainer";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import SuppliersList from "@/_suppliers/ProductList/ProductList";
import TopNavBar from "@/_settings/TopNavBar/TopNavBar";
import { Box, Divider } from "@mui/material";
import { Suspense, useState } from "react";
import SettingsPage from "./setting";

export default function SuppliersClient() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <TopNavBar />
                <SettingsPage/>
            </Suspense>
        </>
    )
}