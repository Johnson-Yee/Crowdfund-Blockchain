import React, { useState } from 'react';
import { AppBar, Button, Menu, MenuItem, SpeedDial, EditIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { border, color, positions, shadows } from '@mui/system';

function PopoverMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    console.log(event);
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div onMouseLeave={handleClose}>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
        startIcon={<MenuIcon />}
        onMouseOver={handleClick}></Button>
      <Menu
        color="primary"
        id="simple-menu"
        hideBackdrop={true}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        MenuListProps={{
          backgroundColor: 'transparent',
          style: {
            color: 'white',
            width: '40vw',
            backgroundColor: '#1B3933'
          }
        }}>
        <MenuItem selected={true} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem selected={true} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem selected={true} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default PopoverMenu;
