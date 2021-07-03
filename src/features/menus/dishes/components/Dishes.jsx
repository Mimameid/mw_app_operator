import React, { useState } from 'react';

import { Divider, Paper, makeStyles } from '@material-ui/core';
import Dish from './Dish';
import AddChoiceModal from 'features/menus/choices/components/AddChoiceModal';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  list: {
    paddingBottom: 0,
  },
}));

function Dishes({ dishIds }) {
  const classes = useStyles();
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);

  return dishIds.length > 0 ? (
    <Paper className={classes.listContainer} variant="outlined" square>
      {dishIds.map((dishId, index) => (
        <React.Fragment key={dishId}>
          <Dish dishId={dishId} setAddChoiceOpen={setAddChoiceOpen} />
          <Divider />
        </React.Fragment>
      ))}
      <AddChoiceModal open={addChoiceOpen} setOpen={setAddChoiceOpen} />
    </Paper>
  ) : null;
}

export default Dishes;
