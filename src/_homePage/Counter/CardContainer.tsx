import { Box, Typography } from "@mui/material";
import CardChip from "./CardChip";

function CardContainer() {
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
                    value={400}
                    symbol={'QBE'}
                    tooltip="Total QBE tokens accumulated through bounty completion"
                />
                <CardChip
                    title={'Yearly Total Sales'}
                    value={7980}
                    tooltip="Total count of Official and Fan clubs available on Brands.fun."
                />
                <CardChip
                    title={'Net Income'}
                    value={324}
                    tooltip="Aggregate member count across all Official and Fan clubs"
                />
                <CardChip
                    title={'Products'}
                    value={324}
                    tooltip="Aggregate member count across all Official and Fan clubs"
                />
            </Box>
        </Box>
    )
}

export default CardContainer;