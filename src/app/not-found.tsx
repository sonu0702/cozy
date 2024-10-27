import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import Image404 from '../../public/images/404.png';
import Image from 'next/image';

const NotFound = () => {
  return (
    <Box
      padding={'0 1rem'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
      gap={'0.5rem'}
      maxWidth={'480px'}
      margin={'0 auto'}
    >
      <Image src={Image404} width={200} height={200} alt={'404'} />
      <Typography fontWeight={600} fontSize={'1.25rem'}>
        404. Page not found.
      </Typography>
      <Typography>
        The page you were looking for does not exist. Go back to the{' '}
        <Link href={'/'}>Homepage</Link>
      </Typography>
    </Box>
  );
};

export default NotFound;