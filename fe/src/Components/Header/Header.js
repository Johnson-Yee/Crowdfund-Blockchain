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
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const directToPage = (link) => {
    navigate('../' + link);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 4, bgcolor: 'primary' }}>
      <Toolbar>
        <Grid container>
          <Grid container item sm={4} justifyContent={'flex-start'}>
            <Button
              size="small"
              color="secondary"
              sx={{ mr: 1 }}
              onClick={() => directToPage('MyProject')}>
              My Projects
            </Button>
            <Button size="small" color="secondary">
              Backed Projects
            </Button>
          </Grid>
          <Grid container item sm={4} justifyContent="center">
            <Typography
              variant="h6"
              color="secondary"
              component="div"
              sx={{ fontWeight: 'bold' }}
              onClick={() => directToPage('/')}>
              QUICKSTARTER
            </Typography>
          </Grid>
          <Grid container item spacing={3} sm={4} alignItems="flex-end" justifyContent={'flex-end'}>
            <Button size="small" variant="contained" color="secondary" sx={{ mr: 1 }}>
              Create Project
            </Button>
            <Button size="small" variant="outlined" color="secondary">
              Connect Wallet
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
