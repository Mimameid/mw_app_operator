import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#64cfbf',
      main: '#2a9d8f',
      dark: '#006e62',
      contrastText: '#fff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    text: { primary: '#132F4C' },

    background: {
      default: '#f4f5f7',
      footer: '#0C1324',
    },
    avatar: {
      default: '#d81f2c',
    },
    action: {
      hoverOpacity: 0.15,
      disabledOpacity: 'rgba(0,0,0,0.38)',
    },
    food_tags: {
      // halal: {
      //   main: '#ffa200',
      //   light: '#ffa20044',
      // },
      halal: {
        main: '#db000e',
        light: '#f5b2b3',
      },
      vegetarian: {
        main: '#1f9c27',
        light: '#bee1b9',
      },
      vegan: {
        main: '#facc34',
        light: '#fef6b7',
      },
      kosher: {
        main: '#2a7bcb',
        light: '#bed5ef',
      },
      gluten: {
        main: '#4b00b3',
        light: '#4b00b344',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      fontSize: '1.8725rem',
    },
    body1: {
      lineHeight: '1.4',
      fontSize: '0.875rem',
    },
    button: {
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 16,
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
  navigationDrawer: {
    width: 214,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});

export default theme;
