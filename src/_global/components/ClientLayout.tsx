// app/components/ClientLayout.tsx
"use client"; // Mark this component as a client component

import { usePathname } from 'next/navigation';
import ProtectedRoute from './ProtectedRoute';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import NavBar from '@/_common/components/NavBar/NavBar';
import { Box, Divider } from "@mui/material";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import QueryProvider from './query-provider';
import { useAuth } from './context/AuthContext';

interface ClientLayoutProps {
    children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
    const pathname = usePathname();
    const isProtectedRoute = !['/login', '/signup'].includes(pathname);
    const { isAuthenticated } = useAuth();
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        setShowNav(isAuthenticated && isProtectedRoute);
    }, [isAuthenticated, isProtectedRoute]);

    return (
        <>
            {isProtectedRoute ? (
                <ProtectedRoute>
                    {showNav && (
                        <NavBar>
                            <Box component={'main'}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: '100%',
                                    lg: 'minmax(315px, 360px) minmax(500px, 1200px) minmax(315px, 360px)',
                                }}
                                gap={{ xs: '1rem', lg: '0' }}
                            >
                                <Box
                                    paddingLeft={'2rem'}
                                    paddingTop={'2rem'}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Nav />
                                    </Suspense>
                                </Box>
                                <Box display={'grid'}
                                    gridTemplateColumns={'100%'}
                                    gridTemplateRows={'auto'}
                                    borderLeft={'1px solid'}
                                    borderRight={'1px solid'}
                                    borderColor={'grey.800'}
                                    pb={{ xs: '0', md: '12px' }}
                                    paddingTop={'2rem'}
                                    paddingLeft={'2rem'}
                                    paddingRight={'2rem'}
                                >
                                    <QueryProvider>
                                        {children}
                                    </QueryProvider>
                                </Box>
                                <Box
                                    paddingTop={'2rem'}
                                    paddingLeft={'2rem'}>
                                    <QuickActions />
                                    <Divider sx={{ my: '1rem' }} />
                                </Box>
                            </Box>
                        </NavBar>
                    )}
                </ProtectedRoute>
            ) : (
                children
            )}
        </>
    );
};

export default ClientLayout;
