import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { Divider, Paper } from '@material-ui/core';
import MenuCategory from './MenuCategory';
import AddDishModal from 'features/menus/dishes/components/AddDishModal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    margin: '0 ' + theme.spacing(1) + 'px',
    marginBottom: theme.spacing(1),
  },
  list: {
    paddingBottom: 0,
  },
}));

function MenuCategories() {
  const classes = useStyles();
  const categories = useSelector((state) => Object.values(state.menus.menus.activeMenu.categories));
  const [addDishOpen, setAddDishOpen] = useState(false);

  return (
    <Paper className={classes.listContainer} elevation={3}>
      {categories
        ? categories.map((category, index) => (
            <React.Fragment key={nanoid()}>
              <MenuCategory category={category} setAddDishOpen={setAddDishOpen} />
              <Divider />
            </React.Fragment>
          ))
        : null}
      <AddDishModal open={addDishOpen} setOpen={setAddDishOpen} />
    </Paper>
  );
}

export default MenuCategories;
