import React from 'react';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, MenuOpen } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen } from 'features/frame/actions';

function MyAppBar() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.frame.drawerOpen);

  const handleOpenDrawer = () => {
    dispatch(setDrawerOpen(!open));
  };

  return (
    <AppBar sx={{ position: 'fixed', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton size="small" onClick={handleOpenDrawer} color="inherit">
          {open ? <MenuOpen /> : <Menu />}
        </IconButton>
        <Box>
          <Typography variant="h6" noWrap></Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
