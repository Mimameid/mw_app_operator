import React from 'react';

import { Paper, Box, Divider } from '@material-ui/core';
import Dish from '../../dishes/components/Dish';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: 0,
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
          {index < dishIds.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Paper>
  ) : (
    <Box color="text.secondary" fontStyle="italic">
      Keine Speisen verfügbar. Bitte fügen Sie eine Speise hinzu...
    </Box>
  );
}

export default CategoryDishes;
