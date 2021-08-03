import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#64cfbf',
      main: '#2a9d8f',
      dark: '#006e62',
      contrastText: '#fff',
    },
    text: { primary: 'rgb(23, 43, 77)' },
    background: {
      default: '#f4f5f7',
      footer: '#0C1324',
    },
    avatar: {
      default: '#d81f2c',
    },
    action: {
      hoverOpacity: 0.15,
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
      sm: 700, // due to Tabs component not wrappong properly if changed
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    h4: {
      fontWeight: 600,
      fontSize: '1.8725rem',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
});

export default theme;
