import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscounts } from 'features/discounts/discounts/actions';
import { nanoid } from 'common/constants';

import { Grid, List, ListSubheader, Divider, makeStyles } from '@material-ui/core';
import DiscountOverviewItem from './DiscountOverviewItem';
import EmptyView from '../../ItemView/EmptyView';
import Spinner from 'common/components/other/Spinner';

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

function DiscountOverview() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const discountsArray = useSelector((state) => {
    let discountsArray = Object.values(state.discounts.discounts.byId);
    discountsArray.sort((a, b) => a.name.localeCompare(b.name));
    return discountsArray;
  });
  const selectedMenuId = useSelector((state) => state.discounts.views.itemId);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchDiscounts()).then(() => setDataLoaded(true));
  }, [dispatch]);

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
            Typ
          </Grid>
          <Grid item xs={2}>
            Erstellt
          </Grid>
          <Grid item xs={2}>
            Aktiv
          </Grid>
        </Grid>
      </ListSubheader>
      <Divider />
      {dataLoaded ? (
        discountsArray.length === 0 ? (
          <EmptyView>Keine Rabatte verfügbar...</EmptyView>
        ) : (
          discountsArray.map((discount, index) => (
            <React.Fragment key={nanoid()}>
              <DiscountOverviewItem discount={discount} selected={discount.id === selectedMenuId} />
              <Divider />
            </React.Fragment>
          ))
        )
      ) : (
        <Spinner className={classes.loadingIcon} />
      )}
    </List>
  );
}

export default DiscountOverview;
