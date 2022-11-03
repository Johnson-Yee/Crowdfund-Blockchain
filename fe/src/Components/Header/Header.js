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
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../Wallet/Connector';
import { useUpdateEffect } from 'ahooks';

const Header = () => {
  // Active- bool isWalletConnected
  // Account- user address
  // Library- web3React functions
  // Activate- function called to authenticate wallet
  // Deactivate- logout
  const { active, account, activate, deactivate } = useWeb3React();
  const navigate = useNavigate();

  const directToPage = (link) => {
    navigate('../' + link);
  };

  async function connect() {
    try {
      await activate(injected);
      console.log('login>>>>>>>>>>>>>', account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      await deactivate();
      console.log('logout>>>>>>>>>>>>>', account);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleClickWallet = !active ? connect : disconnect;

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
          <Grid
            container
            item
            sm={4}
            alignItems="flex-end"
            justifyContent={'flex-end'}
            onClick={handleClickWallet}>
            <Button variant="outlined" color="secondary">
              {!active ? 'Connect Wallet' : 'Disconnect Wallet'}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
