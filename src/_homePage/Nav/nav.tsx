import { Box, Button, Typography } from "@mui/material";
import { IconBrandX } from "@tabler/icons-react";

function Nav() {
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
                href={'/'}
                variant="darkContained"
                // target="_blank"
                startIcon={<IconBrandX size={16} />}
                style={{ justifyContent: 'flex-start' }}
            >
                Dashboard
            </Button>
            <Button
                fullWidth
                href={'/inventory'}
                variant="darkContained"
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBrandX size={16} />}
            >
                Inventory
            </Button>
            <Button
                fullWidth
                href={'/salesorder'}
                variant="darkContained"
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBrandX size={16} />}
            >
                Sales Orders
            </Button>
            <Button
                fullWidth
                href={'/suppliers'}
                variant="darkContained"
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBrandX size={16} />}
            >
                Suppliers
            </Button>
            <Button
                fullWidth
                href={'/reports'}
                variant="darkContained"
                // target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBrandX size={16} />}
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
                startIcon={<IconBrandX size={16} />}
            >
                Help
            </Button>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBrandX size={16} />}
            >
                Settings
            </Button>

        </Box>
    )
}

export default Nav;