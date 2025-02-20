import { Box, Card, Tooltip, Typography } from "@mui/material";
import { IconHelp } from "@tabler/icons-react";

type Props = {
    title: string;
    value: number;
    symbol?: string;
    percent?: number;
    tooltip: string;
    formatter: Intl.NumberFormat;
}

const CardChip = ({ title, value, symbol, percent, tooltip, formatter }: Props) => {
    return (<Card>
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            // color={'gray.400'}
            mb={'1rem'}
        >
            <Typography  variant="smMedium">
                {title}
            </Typography>
            <Tooltip title={tooltip} arrow>
                <IconHelp size={16} />
            </Tooltip>
        </Box>
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
           
        >
            <Typography  variant="xlSemibold">
                {formatter.format(value)}{' '}
                <Typography component={'span'} variant="smMedium">
                    {symbol}
                </Typography>
            </Typography>
        </Box>
    </Card>
    )
}

export default CardChip;