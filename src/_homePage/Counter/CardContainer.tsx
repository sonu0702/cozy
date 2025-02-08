"use client"

import { Box, Typography } from "@mui/material";
import CardChip from "./CardChip";
import { useEffect, useState } from "react";
import { useAuth } from "@/_global/components/context/AuthContext";
import { dailySalesAnalytics, netIncomeAnalytics, productCountAnalytics, yearlySalesAnalytics } from "@/_global/api/api";

const numberFormatter = new Intl.NumberFormat('en-IN');

function CardContainer() {
    const { activeShop } = useAuth();
    const [todaySales, setTodaySales] = useState<number>(0);
    const [yearlySales, setYearlySales] = useState<number>(0);
    const [netIncome, setNetIncome] = useState<number>(0);
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
                const income = await netIncomeAnalytics(activeShop.id);
                setNetIncome(income.data.total);
            } catch (error) {
                setNetIncome(0);
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
        <Box component={'main'}
            display={'flex'}
            flexDirection={'column'}
            gap={1.5}
        >
            <Typography color={'grey.50'} variant="mdBold">
                Sales Summary
            </Typography>

            <Box display={'grid'}
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
                    title={'Yearly Total Sales'}
                    value={yearlySales}
                    symbol={'₹'}
                    tooltip="Total sales for the current year"
                    formatter={numberFormatter}
                />
                <CardChip
                    title={'Net Income'}
                    value={netIncome}
                    symbol={'₹'}
                    tooltip="Total net income"
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