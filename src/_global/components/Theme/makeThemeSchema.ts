import { Components, PaletteOptions, ThemeOptions } from '@mui/material';

/**
 * @function makeThemeSchema - Function that appends theme palette to preset Theme options.
 * @description
 * - This function creates a base schema by appending the pallete fetched from BE
 * to a set of predefined theme options.
 * - The value returned by this function needs to be passed to `createTheme` function of `mui`
 * to convert it into the proper theme format which can then be passed to `mui` `ThemeProvider`.
 */
export const makeThemeSchema = (
  brandPalette: PaletteOptions,
  fontName: string
): ThemeOptions => ({
  typography: {
    fontSize: 8,
    htmlFontSize: 12,
    fontFamily: fontName,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      padding: '0.75rem 1.125rem',
    },
    xlBold: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: '30px',
    },
    xlSemibold: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: '30px',
    },
    xlMedium: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '30px',
    },
    xlRegular: {
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: '30px',
    },
    lgBold: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '28px',
    },
    lgSemibold: {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '28px',
    },
    lgMedium: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '28px',
    },
    lgRegular: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '28px',
    },
    mdBold: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
    },
    mdSemibold: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
    },
    mdMedium: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
    },
    mdRegular: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
    },
    smBold: {
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '20px',
    },
    smSemibold: {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '20px',
    },
    smMedium: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
    },
    smRegular: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
    },
    xsBold: {
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '18px',
    },
    xsSemibold: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '18px',
    },
    xsMedium: {
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '18px',
    },
    xsRegular: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
  palette: {
    mode: 'dark',
    text: {
      primary: '#FCFCFD',
      secondary: '#98A2B3',
    },
    primary: {
      main: '#FF3465',
      light: '#ffccd8',
      dark: '#cc0030',
    },
    secondary: {
      '50': '#F8F9FC',
      '100': '#EAECF5',
      '200': '#D5D9EB',
      '300': '#AFB5D9',
      '400': '#717BBC',
      '500': '#4E5BA6',
      '600': '#3E4784',
      '700': '#363F72',
      '800': '#293056',
      '900': '#101323',
      main: '#EAECF5',
      light: '#717BBC',
      dark: '#293056',
    },
    success: {
      '50': '#ECFDF3',
      '100': '#D1FADF',
      '200': '#A6F4C5',
      '300': '#6CE9A6',
      '400': '#32D583',
      '500': '#12B76A',
      '600': '#039855',
      '700': '#027A48',
      '800': '#05603A',
      '900': '#054F31',
      main: '#D1FADF',
      light: '#32D583',
      dark: '#05603A',
    },
    warning: {
      '50': '#FFFAEB',
      '100': '#FEF0C7',
      '200': '#FEDF89',
      '300': '#FEC84B',
      '400': '#FDB022',
      '500': '#F79009',
      '600': '#DC6803',
      '700': '#B54708',
      '800': '#93370D',
      '900': '#7A2E0E',
      main: '#FEF0C7',
      light: '#FDB022',
      dark: '#93370D',
    },
    error: {
      '50': '#FEF3F2',
      '100': '#FEE4E2',
      '200': '#FECDCA',
      '300': '#FDA29B',
      '400': '#F97066',
      '500': '#F04438',
      '600': '#D92D20',
      '700': '#B42318',
      '800': '#912018',
      '900': '#7A271A',
      main: '#FEE4E2',
      light: '#F97066',
      dark: '#912018',
    },
    grey: {
      '50': '#F9FAFB',
      '100': '#F2F4F7',
      '200': '#E4E7EC',
      '300': '#D0D5DD',
      '400': '#98A2B3',
      '500': '#667085',
      '600': '#475467',
      '700': '#344054',
      '800': '#1D2939',
      '900': '#101828',
    },
    background: {
      default: '#101828',
      paper: '#1D2939',
    },
  },
  // palette: { ...brandPalette },
});

/**
 * @constant ComponentOverride - Object that overrides the default style of MUI components.
 */
export const ComponentOverride: Components = {
  MuiAlert: {
    styleOverrides: {
      root: {
        transition: 'all 0.3s ease-in-out',
      },
    },
  },
  MuiDrawer: {
    defaultProps: {
      anchor: 'right',
    },
    styleOverrides: {
      paper: {
        backgroundColor: '#101828',
        minWidth: '40%',
        '@media (max-width: 780px)': {
          width: '100%',
        },
      },
    },
  },
  MuiAccordion: {
    defaultProps: {
      style: {
        backgroundColor: 'inherit',
        backgroundImage: 'unset',
        boxShadow: 'none',
      },
    },
    styleOverrides: {
      root: {
        '&.Mui-expanded': {
          '&:before': {
            opacity: 1,
          },
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        padding: '1rem',
        borderRadius: '1rem',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiChip: {
    defaultProps: {
      style: {
        borderColor: '#475467',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
      },
    },
    variants: [
      {
        props: { variant: 'fanClub' },
        style: {
          background: 'linear-gradient(45deg, #101828 0%, #475467 100%)',
          color: '#D0D5DD',
          borderColor: '#475467',
          backgroundColor: '#101828',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '12px',
          padding: '0.1rem 0.1rem',
          height: '1.375rem',
          width: '3.75rem',
        },
      },
      {
        props: { variant: 'newBounty' },
        style: {
          background: `linear-gradient(76.59deg, #930DC3 1.84%, #2D64F2 98.69%)`,
          fontWeight: `600!important`,
          borderRadius: '0.25rem',
          height: 'fit-content',
          width: 'fit-content',
          fontSize: '12px',
          lineHeight: '18px',
        },
      },
      {
        props: { variant: 'streak' },
        style: {
          background: '#000',
          height: 'fit-content',
          width: 'fit-content',
        },
      },
      {
        props: { variant: 'trade' },
        style: {
          background: '#344054',
          height: 'fit-content',
          width: 'fit-content',
          padding: '0.25rem 0.25rem',
          borderRadius: '0.375rem',
        },
      },
    ],
  },
  MuiButton: {
    defaultProps: {
      style: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '0.5rem 0.85rem',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          backgroundColor: '#344054',
          color: '#98A2B3',
        },
      },
      containedPrimary: {
        background:
          'linear-gradient(0deg, var(--Brand-Red, #FF3465), var(--Brand-Red, #FF3465)), linear-gradient(180deg, #FF3465 0%, #E22553 100%)',
        '&:disabled': {
          background: '#344054',
          color: '#98A2B3',
        },
      },
    },
    variants: [
      {
        props: { variant: 'lightContained' },
        style: {
          color: '#101828',
          backgroundColor: '#F9FAFB',
          '&:hover': {
            color: '#101828',
            backgroundColor: '#F9FAFB',
          },
        },
      },
      {
        props: { variant: 'lightText' },
        style: {
          color: '#98A2B3',
          backgroundColor: 'transparent',
          '&:hover': {
            color: '#98A2B3',
            backgroundColor: 'transparent',
          },
        },
      },
      {
        props: { variant: 'darkContained' },
        style: {
          color: '#98A2B3',
          backgroundColor: '#101828',
          '&:hover': {
            color: '#D0D5DD',
            backgroundColor: '#101828',
          },
        },
      },
      {
        props: { variant: 'semiDarkContained' },
        style: {
          fontSize: '0.8rem',
          fontWeight: '500',
          color: '#D0D5DD',
          backgroundColor: '#344054',
          '&:hover': {
            backgroundColor: '#344054',
          },
        },
      },
    ],
  },
  MuiIconButton: {
    variants: [
      {
        props: { variant: 'darkContained' },
        style: {
          backgroundColor: '#101828',
          color: '#98A2B3',
        },
      },
    ],
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        color: '#98A2B3',
        '&.Mui-selected': {
          color: 'white',
        },
      },
    },
  },
  MuiTabs: {
    defaultProps: {
      TabIndicatorProps: {
        style: {
          backgroundColor: 'white',
        },
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      style: {
        background: '#101828',
        padding: '1rem 1.5rem',
        boxShadow: 'none',
        borderBottom: `1px solid #1D2939`,
      },
    },
  },
  MuiTableContainer: {
    defaultProps: {
      style: {
        border: '1px solid #344054',
        borderRadius: '8px',
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        xlBold: 'p',
        xlSemibold: 'p',
        xlMedium: 'p',
        xlRegular: 'p',
        lgBold: 'p',
        lgSemibold: 'p',
        lgMedium: 'p',
        lgRegular: 'p',
        mdBold: 'p',
        mdSemibold: 'p',
        mdMedium: 'p',
        mdRegular: 'p',
        smBold: 'p',
        smSemibold: 'p',
        smMedium: 'p',
        smRegular: 'p',
        xsBold: 'p',
        xsSemibold: 'p',
        xsMedium: 'p',
        xsRegular: 'p',
      },
    },
  },
};

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    lightContained: true;
    lightText: true;
    darkContained: true;
    semiDarkContained: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'darkContained';
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    fanClub: true;
    newBounty: true;
    streak: true;
    trade: true;
  }
}

declare module '@mui/material/styles' {
  interface FontStyle {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
  interface TypographyVariants {
    xlBold: React.CSSProperties;
    xlSemibold: React.CSSProperties;
    xlMedium: React.CSSProperties;
    xlRegular: React.CSSProperties;
    lgBold: React.CSSProperties;
    lgSemibold: React.CSSProperties;
    lgMedium: React.CSSProperties;
    lgRegular: React.CSSProperties;
    mdBold: React.CSSProperties;
    mdSemibold: React.CSSProperties;
    mdMedium: React.CSSProperties;
    mdRegular: React.CSSProperties;
    smBold: React.CSSProperties;
    smSemibold: React.CSSProperties;
    smMedium: React.CSSProperties;
    smRegular: React.CSSProperties;
    xsBold: React.CSSProperties;
    xsSemibold: React.CSSProperties;
    xsMedium: React.CSSProperties;
    xsRegular: React.CSSProperties;
  }

  interface FontStyleOptions {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    xlBold: React.CSSProperties;
    xlSemibold: React.CSSProperties;
    xlMedium: React.CSSProperties;
    xlRegular: React.CSSProperties;
    lgBold: React.CSSProperties;
    lgSemibold: React.CSSProperties;
    lgMedium: React.CSSProperties;
    lgRegular: React.CSSProperties;
    mdBold: React.CSSProperties;
    mdSemibold: React.CSSProperties;
    mdMedium: React.CSSProperties;
    mdRegular: React.CSSProperties;
    smBold: React.CSSProperties;
    smSemibold: React.CSSProperties;
    smMedium: React.CSSProperties;
    smRegular: React.CSSProperties;
    xsBold: React.CSSProperties;
    xsSemibold: React.CSSProperties;
    xsMedium: React.CSSProperties;
    xsRegular: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xlBold: true;
    xlSemibold: true;
    xlMedium: true;
    xlRegular: true;
    lgBold: true;
    lgSemibold: true;
    lgMedium: true;
    lgRegular: true;
    mdBold: true;
    mdSemibold: true;
    mdMedium: true;
    mdRegular: true;
    smBold: true;
    smSemibold: true;
    smMedium: true;
    smRegular: true;
    xsBold: true;
    xsSemibold: true;
    xsMedium: true;
    xsRegular: true;
  }
}
