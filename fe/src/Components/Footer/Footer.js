import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const Footer = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1B3933'
      },
      secondary: {
        main: '#EDE8E0'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack marginTop={4}>
        <footer>
          <Stack bgcolor="#1B3933">
            <Typography
              variant="h5"
              color="secondary"
              component="div"
              sx={{ fontWeight: 'bold', mt: 4 }}>
              QUICKSTARTER
            </Typography>
            <Typography
              variant="h7"
              color="secondary"
              component="div"
              sx={{ fontWeight: 'bold', mt: 1, mb: 5 }}>
              &copy; 2022
            </Typography>
          </Stack>
        </footer>
      </Stack>
    </ThemeProvider>
  );
};

export default Footer;
