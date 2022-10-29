import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1B3933'
    },
    secondary: {
      main: '#EDE8E0'
    }
  },
  typography: {
    h1: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '36px',
      color: '#1B262C'
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      color: '#666666'
    }
  }
});

export default Theme;
