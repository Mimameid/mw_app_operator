import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import SubOverviewItem from './SubOverviewItem';
import EmptyView from '../../ItemView/EmptyView';

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
  const subsArray = useSelector((state) => {
    let subsArray = Object.values(state.menus.subs.byId);
    subsArray.sort((a, b) => a.name.localeCompare(b.name));
    return subsArray;
  });
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
      {subsArray.length === 0 ? (
        <EmptyView>Keine Optiongruppe verfügbar. Bitte fügen Sie ein Optiongrupp hinzu...</EmptyView>
      ) : (
        subsArray.map((sub, index) => (
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
