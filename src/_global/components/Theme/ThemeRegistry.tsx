'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Fragment, useLayoutEffect } from 'react';
import { ComponentOverride, makeThemeSchema } from './makeThemeSchema';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// import { useSearchParams } from 'next/navigation';

export default function ThemeRegistry(props: any) {
  // const searchParams = useSearchParams();
  // const referralCode = searchParams.get('referral_code');
  const { children, platformTheme, fontName } = props;
  const generatedTheme = makeThemeSchema(platformTheme, fontName);
  const theme = createTheme({
    ...generatedTheme,
    components: ComponentOverride,
  });

  /* TODO: This should not be here, we need to refactor */
  // useLayoutEffect(() => {
  //   if (referralCode) {
  //     sessionStorage.setItem(`referral_code`, referralCode);
  //   }
  // }, [referralCode]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Fragment>
          <CssBaseline />
          {children}
        </Fragment>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
