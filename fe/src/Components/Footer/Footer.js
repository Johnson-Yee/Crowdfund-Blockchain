import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const Footer = () => {
  return (
    <Stack marginTop={4}>
      <footer>
        <Stack bgcolor="#F2F2F2">
          <Typography variant="h5" color="black" component="div" sx={{ fontWeight: 'bold', mt: 4 }}>
            QuickStarter
          </Typography>
          <Typography
            variant="h7"
            color="black"
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
