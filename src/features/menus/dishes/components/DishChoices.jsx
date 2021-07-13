import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Choice from '../../choices/components/Choice';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  list: {
    paddingBottom: 0,
  },
}));

function DishChoices({ dish }) {
  const classes = useStyles();

  const choiceIds = dish.choices;
  return choiceIds.length > 0 ? (
    <div className={classes.listContainer}>
      <Grid container spacing={2}>
        {choiceIds.map((choiceId, index) => (
          <Grid item xs={4} key={choiceId}>
            <Choice choiceId={choiceId} dish={dish} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : null;
}

export default DishChoices;
