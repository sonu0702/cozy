import { Box, CircularProgress } from '@mui/material';

const CircularLoader = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      margin={'2rem 0'}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};
export default CircularLoader;
