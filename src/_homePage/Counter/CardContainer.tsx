"use client"

import { Box, Typography } from "@mui/material";
import CardChip from "./CardChip";
import { useEffect, useState } from "react";
import { useAuth } from "@/_global/components/context/AuthContext";
import { dailySalesAnalytics, monthlySalesAnalytics, productCountAnalytics, yearlySalesAnalytics } from "@/_global/api/api";

const numberFormatter = new Intl.NumberFormat('en-IN');

function CardContainer() {
    const { activeShop } = useAuth();
    const [todaySales, setTodaySales] = useState<number>(0);
    const [yearlySales, setYearlySales] = useState<number>(0);
    const [monthlySales, setMonthlySales] = useState<number>(0);
    const [productCount, setProductCount] = useState<number>(0);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!activeShop?.id) return;

            try {
                const dailySales = await dailySalesAnalytics(activeShop.id);
                setTodaySales(dailySales.data.total);
            } catch (error) {
                setTodaySales(0);
            }

            try {
                const yearSales = await yearlySalesAnalytics(activeShop.id);
                setYearlySales(yearSales.data.total);
            } catch (error) {
                setYearlySales(0);
            }

            try {
                const monthlySales = await monthlySalesAnalytics(activeShop.id);
                setMonthlySales(monthlySales.data.total);
            } catch (error) {
                setMonthlySales(0);
            }

            try {
                const products = await productCountAnalytics(activeShop.id);
                setProductCount(products.data.count);
            } catch (error) {
                setProductCount(0);
            }
        };

        fetchAnalytics();
    }, [activeShop]);

    return (
        <Box
            component={'main'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>
                Sales Summary
            </Typography>

            <Box
                display={'grid'}
                alignItems={'center'}
                gap={'1rem'}
                gridTemplateColumns={{ xs: '100%', md: 'repeat(4, 1fr)' }}
            >
                <CardChip
                    title={`Today's Sale`}
                    value={todaySales}
                    symbol={'₹'}
                    tooltip="Total sales for today"
                    formatter={numberFormatter}
                />
                <CardChip
                    title={'Monthly Total Sales'}
                    value={monthlySales}
                    symbol={'₹'}
                    tooltip="Total sales for the current month"
                    formatter={numberFormatter}
                />
                <CardChip
                    title={'Yearly Total Sales'}
                    value={yearlySales}
                    symbol={'₹'}
                    tooltip="Total sales for the current year"
                    formatter={numberFormatter}
                />
                <CardChip
                    title={'Products'}
                    value={productCount}
                    tooltip="Total number of products"
                    formatter={numberFormatter}
                />
            </Box>
        </Box>
    )
}

export default CardContainer;