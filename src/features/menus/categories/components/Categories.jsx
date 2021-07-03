import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Divider, Paper, makeStyles } from '@material-ui/core';
import Category from './Category';
import AddDishModal from 'features/menus/dishes/components/AddDishModal';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    margin: '0 ' + theme.spacing(1) + 'px',
    marginBottom: theme.spacing(1),
  },
  list: {
    paddingBottom: 0,
  },
}));

function Categories() {
  const classes = useStyles();
  const categoriesIds = useSelector((state) => state.menus.menus.activeMenu.categories);
  const [addDishOpen, setAddDishOpen] = useState(false);

  return (
    <Paper className={classes.listContainer} elevation={3}>
      {categoriesIds
        ? categoriesIds.map((categoryId, index) => (
            <React.Fragment key={categoryId}>
              <Category categoryId={categoryId} setAddDishOpen={setAddDishOpen} />
              <Divider />
            </React.Fragment>
          ))
        : null}
      <AddDishModal open={addDishOpen} setOpen={setAddDishOpen} />
    </Paper>
  );
}

export default Categories;
