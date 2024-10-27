import {
  AppBar,
  Stack,
  Typography,
  Button,
  Avatar,
  styled,
  paperClasses,
  Popover,
} from '@mui/material';
import Link from 'next/link';
//   import NavMenu from './NavMenu';
//   import { useAppSelector } from '@/_global/hooks/useAppSelector';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import HomeLink from './HomeLink';
//   import HomeLink from './HomeLink';
//   import { track } from '@amplitude/analytics-browser';
//   import QBEBalance from './QBEBalance';
//   import { generateLoginUrl } from '@/_common/helper/utility';
//   import { generateExchangeAppUrl } from '@/_common/helper/utility';

export default function TopNavBar() {
  const isLoggedIn = true;
  // const { isLoggedIn, profile } = useAppSelector((state) => state.userProfile);
  // const { skyrampServiceUrl, authServiceUrl, brandsAppServiceUrl } =
  //   useAppSelector((state) => state.global);
  // const exchangeAppRoute = generateExchangeAppUrl(
  //   skyrampServiceUrl,
  //   '/portfolio'
  // );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const pathName = usePathname();

  // const loginUrl = generateLoginUrl(
  //   authServiceUrl,
  //   `${brandsAppServiceUrl}${pathName}`
  // );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar position="static">
      <Stack
        width={'100%'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <HomeLink />

        <Stack
          gap={3}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {isLoggedIn ? (
            <Button
              color="inherit"
              variant="text"
              onClick={handleOpenUserMenu}
              size="small"
              sx={{
                padding: '0.1rem 0.5rem!important',
              }}
              startIcon={<Avatar sx={{ width: 32, height: 32 }} />}
            >
              <Typography variant="inherit" maxWidth={'16ch'} noWrap>
                {'Sonu'}
              </Typography>
            </Button>
          ) : (
            <Link
              href={`${"https://login.com"}`}
            >
              <Typography color={'grey.400'} variant="subtitle1">
                Login
              </Typography>
            </Link>
          )}

          <StyledPopover
            id="menu-appbar"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            keepMounted
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            Nave menu
            {/* <NavMenu onClose={handleCloseUserMenu} /> */}
          </StyledPopover>
        </Stack>
      </Stack>
    </AppBar>
  );
}

const StyledPopover = styled(Popover)(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    backgroundColor: theme.palette.grey[800],
    minWidth: '300px',
    border: `1px solid ${theme.palette.grey[700]}`,
    borderRadius: '0.5rem',
    padding: '0',
  },
}));