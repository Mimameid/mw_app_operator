import React, { useState } from 'react';

import { Divider, Paper, makeStyles } from '@material-ui/core';
import Sub from './Sub';
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

function Dishes({ subIds }) {
  const classes = useStyles();
  const [addChoiceOpen, setAddChoiceOpen] = useState(false);

  return subIds.length > 0 ? (
    <Paper className={classes.listContainer} variant="outlined" square>
      {subIds.map((subId, index) => (
        <React.Fragment key={subId}>
          <Sub subId={subId} setAddChoiceOpen={setAddChoiceOpen} />
          <Divider />
        </React.Fragment>
      ))}
      <AddChoiceModal open={addChoiceOpen} setOpen={setAddChoiceOpen} />
    </Paper>
  ) : null;
}

export default Dishes;
