import { Box, Typography } from '@mui/material';
import { IconExclamationCircle } from '@tabler/icons-react';
import { memo } from 'react';

/**
 * @function FallbackErrorUI
 * - UI displayed by the Error boundary when component errors out
 */
function FallbackErrorUI() {
  return (
    <Box
      m={'2'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={100}
    >
      <Box
        display={'flex'}
        gap={'0.5rem'}
        alignItems={'center'}
        color={'text.secondary'}
      >
        <IconExclamationCircle />
        <Typography
          fontSize={{ xs: '1rem', md: '1.5rem' }}
          color={'inherit'}
          textAlign={'center'}
        >
          Something went wrong
        </Typography>
      </Box>
    </Box>
  );
}

const MemoisedFallbackErrorUI = memo(FallbackErrorUI);
export default MemoisedFallbackErrorUI;
