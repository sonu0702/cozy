import { Box, Button, Typography } from "@mui/material";
import { IconNotes, IconBox, IconTruck, IconDownload } from "@tabler/icons-react";

function QuickActions() {
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
                Quick Actions
            </Typography>

            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                startIcon={<IconNotes size={16} />}
                style={{ justifyContent: 'flex-start' }}
            >
                Create Order
            </Button>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconBox size={16} />}
            >
                Add Product
            </Button>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconTruck size={16} />}
            >
                Add Supplier
            </Button>
            <Button
                fullWidth
                href={'https://x.com'}
                variant="darkContained"
                target="_blank"
                style={{ justifyContent: 'flex-start' }}
                startIcon={<IconDownload size={16} />}
            >
                Export
            </Button>
        </Box>
    )
}

export default QuickActions;