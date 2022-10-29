import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const Footer = () => {
  return (
    <Stack marginTop={4} width="100%">
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
  );
};

export default Footer;
