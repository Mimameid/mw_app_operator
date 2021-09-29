import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Box, Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import SubOverviewItem from './SubOverviewItem';
import GridHeaderItem from 'common/components/other/GridHeaderItem';
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
  listBody: {
    overflow: 'auto',
    height: '213px',
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
          <GridHeaderItem item xs={3}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={3}></GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box className={classes.listBody}>
        {subsArray.length === 0 ? (
          <EmptyView>Keine Optiongruppe verfügbar. Bitte erstellen Sie eine Optiongruppe...</EmptyView>
        ) : (
          subsArray.map((sub, index) => (
            <React.Fragment key={nanoid()}>
              <SubOverviewItem sub={sub} selected={sub.id === selectedSubId} />
              {subsArray.length >= 5 && index === subsArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
    </List>
  );
}

export default SubOverview;
