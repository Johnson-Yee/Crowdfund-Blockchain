import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../Wallet/Connector';
import { useUpdateEffect } from 'ahooks';

const Header = () => {
  // Active- bool isWalletConnected
  // Account- user address
  // Library- web3React functions
  // Activate- function called to authenticate wallet
  // Deactivate- logout
  const { active, account, library, activate, deactivate } = useWeb3React();

  useUpdateEffect(() => {
    console.log(account);
  }, [account]);

  // useMount(() => {
  //   console.log(active);
  // });

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
