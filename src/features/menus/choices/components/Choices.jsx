import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { Grid, makeStyles } from '@material-ui/core';
import ChoiceCard from './ChoiceCard';
import AddSubModal from 'features/menus/subs/components/AddSubModal';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  list: {
    paddingBottom: 0,
  },
}));

function Choices({ choiceIds }) {
  const classes = useStyles();
  const [addSubOpen, setAddSubOpen] = useState(false);

  return choiceIds.length > 0 ? (
    <div className={classes.listContainer}>
      <Grid container spacing={2}>
        {choiceIds.map((choiceId, index) => (
          <Grid item xs={4} key={nanoid()}>
            <ChoiceCard choiceId={choiceId} setAddSubOpen={setAddSubOpen} />
          </Grid>
        ))}
      </Grid>
      <AddSubModal open={addSubOpen} setOpen={setAddSubOpen} />
    </div>
  ) : null;
}

export default Choices;
