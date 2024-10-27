import { Box, Skeleton } from '@mui/material';
import { memo } from 'react';

/**
 * @function SuspenseFallbackUI
 * - UI displayed by the Suspense boundary when waiting for component load
 */
function SuspenseFallbackUI() {
  return (
    <Box
      minHeight={'inherit'}
      height={'calc(100% - 1rem)'}
      p={'0.5rem'}
      width={'100%'}
    >
      <Skeleton
        height={'inherit'}
        sx={{ transform: 'unset', minHeight: 'inherit' }}
      />
    </Box>
  );
}

const MemoisedSuspenseFallbackUI = memo(SuspenseFallbackUI);
export default MemoisedSuspenseFallbackUI;
