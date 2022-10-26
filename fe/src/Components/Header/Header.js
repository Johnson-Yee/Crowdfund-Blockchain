import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4, bgcolor: '#3282B8' }}>
      <Toolbar>
        <Grid container>
          <Grid container item sm={4} justifyContent={'flex-start'}>
            <Button color="inherit" sx={{ mr: 3 }}>
              Start Project
            </Button>
            <Button color="inherit">My Projects</Button>
          </Grid>
          <Grid container item sm={4} justifyContent="center">
            <Typography variant="h5" color="black" component="div" sx={{ fontWeight: 'bold' }}>
              QuickStarter
            </Typography>
          </Grid>
          <Grid container item sm={4} alignItems="flex-end" justifyContent={'flex-end'}>
            <Button variant="contained" sx={{ bgcolor: '#1B262C' }}>
              Connect Wallet
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
