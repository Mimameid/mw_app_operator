import React from 'react';

import { AppBar, Box, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Menu, MenuOpen } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen } from 'features/frame/actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  userDetails: {},
}));

function MyAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.frame.drawerOpen);

  const handleOpenDrawer = () => {
    dispatch(setDrawerOpen(!open));
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton size="small" onClick={handleOpenDrawer} color="inherit">
          {open ? <MenuOpen /> : <Menu />}
        </IconButton>
        <Box className={classes.userDetails}>
          <Typography variant="h6" noWrap></Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
