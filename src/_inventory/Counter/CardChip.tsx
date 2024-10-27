import { Box, Card, Tooltip, Typography } from "@mui/material";
import { IconHelp } from "@tabler/icons-react";

type Props = {
    title: string;
    value: number;
    symbol?: string;
    percent?: number;
    tooltip: string;
}

const CardChip = ({ title, value, symbol, percent, tooltip }: Props) => {
    return (<Card>
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color={'gray.400'}
            mb={'1rem'}
        >
            <Typography color={'grey.300'} variant="smMedium">
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
            color={'gray.400'}
        >
            <Typography color={'grey.200'} variant="xlSemibold">
                {value}{' '}
                <Typography component={'span'} variant="smMedium">
                    {symbol}
                </Typography>
            </Typography>
        </Box>
    </Card>
    )
}

export default CardChip;