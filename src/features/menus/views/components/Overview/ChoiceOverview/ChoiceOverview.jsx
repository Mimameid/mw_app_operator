import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { Box, Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import ChoiceOverviewItem from './ChoiceOverviewItem';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
  },
  listHeader: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderBottom: '1px solid ' + theme.palette.primary.main,
    boxShadow: theme.shadows[3],
  },
}));

function ChoiceOverview() {
  const classes = useStyles();
  const choices = useSelector((state) => state.menus.choices.byId);
  const selectedChoiceId = useSelector((state) => state.menus.views.itemId);

  return (
    <List className={classes.list}>
      <ListSubheader className={classes.listHeader}>
        <Grid container>
          <Grid item xs={2}>
            ID
          </Grid>
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={2}>
            Beschreibung
          </Grid>
          <Grid item xs={2}>
            Optionen
          </Grid>
          <Grid item xs={2}>
            Erstellt
          </Grid>
        </Grid>
      </ListSubheader>
      <Divider className={classes.divider} />
      {Object.values(choices).length === 0 ? (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          Keine Optiongruppen verfügbar. Bitte fügen Sie eine Optiongruppe hinzu...
        </Box>
      ) : (
        Object.values(choices).map((choice, index) => (
          <React.Fragment key={nanoid()}>
            <ChoiceOverviewItem choice={choice} selected={choice.id === selectedChoiceId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default ChoiceOverview;
