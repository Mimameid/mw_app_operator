import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantData } from 'features/menus/fetchRestaurantData/actions';

import { Grid, Divider, Typography, makeStyles } from '@material-ui/core';
import Menus from 'features/menus/menus/components/Menus';
import MenuCard from 'features/menus/menus/components/MenuCard';

const useStyles = (props) => {
  return makeStyles((theme) => ({
    menuContainer: {
      backgroundColor: 'white',
      marginLeft: props.drawer.width + 'px',
      minHeight: '100vh',
      width: `calc(100vw - ${props.drawer.width}px)`,
      transition: 'margin 0.2s ease-in-out, width 0.2s ease-in-out',
    },
    titleContainer: {
      margin: '0 auto',
    },

    menuListContainer: {
      padding: theme.spacing(2),
    },

    divider: {
      margin: '0 ' + theme.spacing(2) + 'px',
    },
  }));
};

function Menu() {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer);
  const classes = useStyles({ drawer })();

  useEffect(() => {
    dispatch(fetchRestaurantData());
  }, [dispatch]);

  return (
    <Grid className={classes.menuContainer} container direction="column">
      <Grid className={classes.titleContainer} item>
        <Typography variant="h3" component="h1">
          Menü
        </Typography>
      </Grid>
      <Divider className={classes.divider} />

      <Grid className={classes.menuListContainer} item>
        <Menus />
      </Grid>

      <Grid className={classes.menuListContainer} item>
        <MenuCard />
      </Grid>
    </Grid>
  );
}

export default Menu;
