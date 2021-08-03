import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Box, Divider, Grid, List, ListSubheader } from '@material-ui/core';
import SubOverviewItem from './SubOverviewItem';
import { makeStyles } from '@material-ui/styles';

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

function SubOverview() {
  const classes = useStyles();
  const subs = useSelector((state) => state.menus.subs.byId);
  const selectedSubId = useSelector((state) => state.menus.views.itemId);

  return (
    <List className={classes.list}>
      <ListSubheader className={classes.listHeader}>
        <Grid container>
          <Grid item xs={3}>
            ID
          </Grid>
          <Grid item xs={3}>
            Name
          </Grid>
          <Grid item xs={3}>
            Erstellt
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </ListSubheader>
      <Divider />
      {Object.values(subs).length === 0 ? (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          Keine Optiongruppe verfügbar. Bitte fügen Sie ein Optiongrupp hinzu...
        </Box>
      ) : (
        Object.values(subs).map((sub, index) => (
          <React.Fragment key={nanoid()}>
            <SubOverviewItem sub={sub} selected={sub.id === selectedSubId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default SubOverview;
