import { createTheme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

declare module '@mui/system' {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    body3: React.CSSProperties;
    label: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    label?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    body3: true;
    label: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line no-unused-vars
  interface CommonColors {
    primaryGreen: string;
    greenTeaGreen: string;
    strawberryRed: string;
    skyBlue: string;
    mustardYellow: string;
    cementGrey: string;
    dirtyWhite: string;
    white: string;
    bgGreen: string;
    bgBlue: string;
    bgRed: string;
  }
}

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
    },
    common: {
      primaryGreen: '#73AB54',
      greenTeaGreen: '#A7CF9F',
      strawberryRed: '#D44F54',
      skyBlue: '#4897D9',
      mustardYellow: '#F8A53B',
      cementGrey: '#58585A',
      dirtyWhite: '#F2ECE7',
      white: '#ffffff',
      bgGreen: '#D4E3D2',
      bgBlue: '#BADAF3',
      bgRed: '#FAD6C1',
    },
    divider: '#E2E2E2',
  },
});

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1200,
    xl: 1536,
    xxl: 1900,
    xxxl: 2400, // 2k screen
  },
});

const theme = createTheme({
  ...paletteTheme,
  breakpoints,
  typography: {
    fontFamily: '"AG Book Rounded Regular", "AG Book Rounded Bold"',
    allVariants: {
      fontFamily: '"AG Book Rounded Bold", "AG Book Rounded Regular"',
      userSelect: 'none',
    },
    h1: {
      fontWeight: 900,
      [breakpoints.up('xs')]: {
        fontSize: '2.5rem', // 40px
        lineHeight: '2.625rem', // 42px
      },
      [breakpoints.up('sm')]: {
        fontSize: '2.875rem', // 46px
        lineHeight: '2.75rem', // 44px
      },
      [breakpoints.up('md')]: {
        fontSize: '3.75rem', // 60px
        lineHeight: '4rem', // 64px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(3.75rem, 1.8vw + 2.1rem, 4.875rem)',
        lineHeight: 'clamp(4rem, 1.9vw + 2.2rem, 5.2rem)',
      },
    },
    h2: {
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '36px',
        lineHeight: '38px',
      },
      [breakpoints.up('sm')]: {
        fontSize: '2.5rem', // 40px
        lineHeight: '2.625rem', // 42px
      },
      [breakpoints.up('md')]: {
        fontSize: '3.125rem', // 50px
        lineHeight: '3.5rem', // 56px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(3.125rem, 1.5vw + 1.7rem, 4.0625rem)',
        lineHeight: 'clamp(3.5rem, 1.6vw + 1.9rem, 4.55rem)',
      },
    },
    h3: {
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '30px',
        lineHeight: '32px',
      },
      [breakpoints.up('sm')]: {
        fontSize: '2rem', // 32px
        lineHeight: '2.25rem', // 36px
      },
      [breakpoints.up('md')]: {
        fontSize: '2.5rem', // 40px
        lineHeight: '2.75rem', // 44px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(2.5rem, 1.2vw + 1.4rem, 3.25rem)',
        lineHeight: 'clamp(2.75rem, 1.3vw + 1.5rem, 3.575rem)',
      },
    },
    h4: {
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '1.75rem', // 28px
        lineHeight: '2.125rem', // 34px
      },
      [breakpoints.up('md')]: {
        fontSize: '2rem', // 32px
        lineHeight: '2.625rem', // 42px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(2rem, 1vw + 1.1rem, 2.625rem)',
        lineHeight: 'clamp(2.625rem, 1.3vw + 1.4rem, 3.445rem)',
      },
    },
    h5: {
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
      },
      [breakpoints.up('md')]: {
        fontSize: '1.5rem', // 24px
        lineHeight: '2rem', // 32px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(1.5rem, 0.8vw + 0.8rem, 2rem)',
        lineHeight: 'clamp(2rem, 1vw + 1rem, 2.666rem)',
      },
    },
    h6: {
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.5rem', // 24px
      },
      [breakpoints.up('md')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.5rem', // 24px
      },
      [breakpoints.up('xl')]: {
        fontSize: 'clamp(1.25rem, 0.6vw + 0.7rem, 1.625rem)',
        lineHeight: 'clamp(1.5rem, 0.7vw + 0.8rem, 1.95rem)',
      },
    },
    body1: {
      fontFamily: 'AG Book Rounded Regular',
      fontWeight: 500,
      [breakpoints.up('xs')]: {
        fontSize: '1rem', // 16px
        lineHeight: '1.375rem', // 22px
      },
      [breakpoints.up('lg')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.5rem', // 24px
      },
      [breakpoints.up('xxl')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
      },
      [breakpoints.up('xxxl')]: {
        fontSize: '1.375rem', // 22px
        lineHeight: '1.875rem', // 30px
      },
    },
    body2: {
      fontFamily: 'AG Book Rounded Regular',
      fontWeight: 500,
      [breakpoints.up('xs')]: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.125rem', // 18px
      },
      [breakpoints.up('lg')]: {
        fontSize: '1rem', // 16px
        lineHeight: '1.375rem', // 22px
      },
      [breakpoints.up('xxl')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.5rem', // 24px
      },
      [breakpoints.up('xxxl')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
      },
    },
    body3: {
      fontFamily: 'AG Book Rounded Regular',
      fontWeight: 500,
      [breakpoints.up('xs')]: {
        fontSize: '0.75rem', // 12px
        lineHeight: '0.875rem', // 14px
      },
      [breakpoints.up('lg')]: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.125rem', // 18px
      },
      [breakpoints.up('xxl')]: {
        fontSize: '1rem', // 16px
        lineHeight: '1.375rem', // 22px
      },
      [breakpoints.up('xxxl')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.5rem', // 24px
      },
    },
    caption: {
      fontFamily: 'AG Book Rounded Bold',
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.5rem', // 24px
      },

      [breakpoints.up('lg')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.75rem', // 28px
      },
      [breakpoints.up('xxxl')]: {
        fontSize: '1.375rem', // 22px
        lineHeight: '1.875rem', // 30px
      },
      display: 'block',
    },
    button: {
      fontWeight: 700,
      textTransform: 'initial',
      [breakpoints.up('xs')]: {
        fontSize: '1rem', // 16px
        lineHeight: '1rem', // 16px
      },
      [breakpoints.up('xl')]: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.125rem', // 18px
      },
      [breakpoints.up('xxxl')]: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.25rem', // 20px
      },
      letterSpacing: '0.02rem', // 0.32px
    },
    label: {
      fontFamily: 'AG Book Rounded Bold',
      fontWeight: 700,
      [breakpoints.up('xs')]: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
      },
      [breakpoints.up('md')]: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.125rem', // 18px
      },
      [breakpoints.up('xl')]: {
        fontSize: '1rem', // 16px
        lineHeight: '1.375rem', // 22px
      },
      letterSpacing: '0.015rem', // 0.24px
    },
  },

  components: {
    MuiLinearProgress: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
});

export default theme;
