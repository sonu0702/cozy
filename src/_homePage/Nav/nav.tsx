"use client"
import { Box, Button, Typography } from "@mui/material";
import { IconBrandX , IconLayoutDashboard,IconPackage,IconShoppingCart,
    IconTruck, IconReportAnalytics, IconSettings, IconHeadset
 } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";

function Nav() {
    const router = useRouter();
    const currentPath = usePathname(); // Gets the current path directly from Next.js


    const handleNavigation = (path: string) => {
        if (path !== currentPath) {
            router.push(path);
        }
    };
    return (
        <Box display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            width={200}
            // bgcolor={'red'}
            paddingLeft={'0.2rem'}
            gap={1.5}
        >

            <Typography color={'grey.50'} variant="mdBold">
                General
            </Typography>

            <Button
                fullWidth
                // href={'/'}
                onClick={() => handleNavigation('/')}
                variant={currentPath === '/' ? 'lightContained' : 'darkContained'}
                // target="_blank"
                startIcon={<IconLayoutDashboard size={16} />}
                style={{ justifyContent: 'flex-start' }}
            >
                Dashboard
            </Button>
            <Button
                fullWidth
                // href={'/inventory'}
                onClick={() => handleNavigation('/inventory')}
                variant={currentPath === '/inventory' ? 'lightContained' : 'darkContained'}
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconPackage size={16} />}

            >
                Inventory
            </Button>
            <Button
                fullWidth
                // href={'/salesorder'}
                onClick={() => handleNavigation('/salesorder')}
                variant={currentPath === '/salesorder' ? 'lightContained' : 'darkContained'}
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconShoppingCart size={16} />}
            >
                Sales Orders
            </Button>
            <Button
                fullWidth
                // href={'/suppliers'}
                onClick={() => handleNavigation('/suppliers')}
                variant={currentPath === '/suppliers' ? 'lightContained' : 'darkContained'}
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconTruck size={16} />}
            >
                Suppliers
            </Button>
            <Button
                fullWidth
                // href={'/reports'}
                onClick={() => handleNavigation('/reports')}
                variant={currentPath === '/reports' ? 'lightContained' : 'darkContained'}
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconReportAnalytics size={16} />}
            >
                Reports
            </Button>

            <Typography color={'grey.50'} variant="mdBold">
                Support
            </Typography>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconHeadset size={16} />}
            >
                Help
            </Button>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconSettings size={16} />}
            >
                Settings
            </Button>

        </Box>
    )
}

export default Nav;