'use client';
import { useTheme } from '@mui/material';
import { memo, ReactNode, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// const LazyBottomNav = dynamic(() => import('./BottomBar'), {
//   loading: () => null,
// });
// const LazyMobileTopBar = dynamic(() => import('./MobileTopBar'), {
//   loading: () => null,
// });
const LazyTopNav = dynamic(() => import('./TopNavBar'), {
  loading: () => null,
});

function NavBar({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isBelowMd = useCustomMediaQuery(
    theme.breakpoints.down('md').split(' ').pop() ?? ''
  );

  return (
    <>
    <LazyTopNav />
    {children}
      {/* Explicitly checking for a boolean value is intentional
      {isBelowMd === false ? <LazyTopNav /> : null}
      {isBelowMd === true ? <LazyMobileTopBar /> : null}
      {children}
      {isBelowMd === true ? <LazyBottomNav /> : null} */}
    </>
  );
}

export default memo(NavBar);

/**
 * @hook - Indicates whether given media query string matches or not
 * @param mediaQueryString
 */
function useCustomMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean>();

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener); // updated from .addListener
    return () => mediaQueryList.removeEventListener('change', listener); // updated from .removeListener
  }, [mediaQueryString]);

  return matches;
}