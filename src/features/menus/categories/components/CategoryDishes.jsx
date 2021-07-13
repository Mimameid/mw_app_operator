import React from 'react';

import { Divider, Paper, makeStyles } from '@material-ui/core';
import Dish from '../../dishes/components/Dish';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    marginBottom: theme.spacing(1),
  },
  list: {
    paddingBottom: 0,
  },
}));

function CategoryDishes({ category }) {
  const classes = useStyles();

  const dishIds = category.dishes;
  return dishIds.length > 0 ? (
    <Paper className={classes.listContainer} variant="outlined" square>
      {dishIds.map((dishId, index) => (
        <React.Fragment key={dishId}>
          <Dish dishId={dishId} category={category} />
          <Divider />
        </React.Fragment>
      ))}
    </Paper>
  ) : null;
}

export default CategoryDishes;
