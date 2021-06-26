import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { Divider, Paper } from '@material-ui/core';
import CategoryDish from './CategoryDish';
// import AddDishModal from 'features/menus/dishes/components/AddDishModal';
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

function CategoryDishes({ dishes }) {
  const classes = useStyles();
  const [addDishOpen, setAddDishOpen] = useState(false);

  return (
    <Paper className={classes.listContainer} elevation={3}>
      {Object.values(dishes).map((dish, index) => (
        <React.Fragment key={nanoid()}>
          <CategoryDish dish={dish} setAddDishOpen={setAddDishOpen} />
          <Divider />
        </React.Fragment>
      ))}
      {/* <AddDishModal open={addDishOpen} setOpen={setAddDishOpen} /> */}
    </Paper>
  );
}

export default CategoryDishes;
