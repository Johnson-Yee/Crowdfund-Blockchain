import React from 'react';
import {
  AppBar,
  Button,
  createTheme,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4, bgcolor: 'primary' }}>
      <Toolbar>
        <Grid container>
          <Grid container item sm={4} justifyContent={'flex-start'}>
            <Button color="secondary" sx={{ mr: 3 }}>
              Start Project
            </Button>
            <Button color="secondary">My Projects</Button>
          </Grid>
          <Grid container item sm={4} justifyContent="center">
            <Typography variant="h5" color="secondary" component="div" sx={{ fontWeight: 'bold' }}>
              QUICKSTARTER
            </Typography>
          </Grid>
          <Grid container item sm={4} alignItems="flex-end" justifyContent={'flex-end'}>
            <Button variant="outlined" color="secondary">
              Connect Wallet
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
