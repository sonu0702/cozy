import {
  AppBar,
  Stack,
  Typography,
  Button,
  Avatar,
  styled,
  paperClasses,
  Popover,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import HomeLink from './HomeLink';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../_global/components/context/AuthContext';
//   import NavMenu from './NavMenu';
//   import { useAppSelector } from '@/_global/hooks/useAppSelector';

//   import HomeLink from './HomeLink';
//   import { track } from '@amplitude/analytics-browser';
//   import QBEBalance from './QBEBalance';
//   import { generateLoginUrl } from '@/_common/helper/utility';
//   import { generateExchangeAppUrl } from '@/_common/helper/utility';


interface FormData {
  selectedShopId: string;
}

interface CreateShopFormData {
  name: string;
}

interface Shop {
  id: string;
  name: string;
}

interface User {
  username?: string;
}

export default function TopNavBar() {
  const { control, handleSubmit } = useForm<FormData>();
  const { isAuthenticated, user, shops, activeShop, logout, updateDefaultShop, createShop } = useAuth() as {
    isAuthenticated: boolean;
    user: User;
    shops: Shop[];
    activeShop: Shop | null;
    logout: () => void;
    updateDefaultShop: (shopId: string) => void;
    createShop: (name: string) => Promise<void>;
  };
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false);
  const { control: createShopControl, handleSubmit: handleCreateShopSubmit, reset: resetCreateShopForm } = useForm<CreateShopFormData>();
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
          {isAuthenticated ? (
            <>
              <Controller
                name="selectedShopId"
                control={control}
                defaultValue={activeShop?.id || ''}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      value={activeShop?.id || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        updateDefaultShop(e.target.value);
                      }}
                      displayEmpty
                      sx={{
                        minWidth: 200,
                        color: 'white',
                        '& .MuiSelect-select': {
                          py: 1
                        }
                      }}
                    >
                      {shops.map((shop) => (
                        <MenuItem key={shop.id} value={shop.id}>
                          {shop.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
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
                <Typography variant="inherit" maxWidth={'16ch'} overflow={"unset"}noWrap>
                  {user?.username || 'User'}
                </Typography>
              </Button>
              <Modal
                open={isCreateShopModalOpen}
                onClose={() => setIsCreateShopModalOpen(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                    minWidth: 300,
                  }}
                >
                  <form onSubmit={handleCreateShopSubmit(async (data) => {
                    await createShop(data.name);
                    setIsCreateShopModalOpen(false);
                    resetCreateShopForm();
                  })}>
                    <Stack spacing={2}>
                      <Typography variant="h6">Create New Shop</Typography>
                      <Controller
                        name="name"
                        control={createShopControl}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Shop Name"
                            fullWidth
                            required
                          />
                        )}
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Create
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Modal>
            </>

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
            <Stack sx={{ p: 2 }} spacing={1}>
              <Button onClick={() => setIsCreateShopModalOpen(true)} fullWidth variant="contained" color="primary">
                New Shop
              </Button>
              <Button onClick={logout} fullWidth variant="outlined" color="inherit">
                Logout
              </Button>
            </Stack>
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