import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Box, Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import ChoiceOverviewItem from './ChoiceOverviewItem';
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

function ChoiceOverview() {
  const classes = useStyles();
  const choicesArray = useSelector((state) => {
    let choicesArray = Object.values(state.menus.choices.byId);
    choicesArray.sort((a, b) => a.name.localeCompare(b.name));
    return choicesArray;
  });
  const selectedChoiceId = useSelector((state) => state.menus.views.itemId);

  return (
    <List className={classes.list}>
      <ListSubheader className={classes.listHeader}>
        <Grid container>
          <GridHeaderItem item xs={1}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Beschreibung
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Optionen
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider className={classes.divider} />
      <Box className={classes.listBody}>
        {choicesArray.length === 0 ? (
          <EmptyView>Keine Optiongruppen verfügbar. Bitte erstellen Sie eine Optiongruppe...</EmptyView>
        ) : (
          choicesArray.map((choice, index) => (
            <React.Fragment key={nanoid()}>
              <ChoiceOverviewItem choice={choice} selected={choice.id === selectedChoiceId} />
              {choicesArray.length >= 5 && index === choicesArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
    </List>
  );
}

export default ChoiceOverview;
