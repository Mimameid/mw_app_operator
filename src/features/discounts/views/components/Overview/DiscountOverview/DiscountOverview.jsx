import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscounts } from 'features/discounts/discounts/actions';
import { nanoid } from 'common/constants';

import { Grid, List, ListSubheader, Divider, makeStyles, Box } from '@material-ui/core';
import DiscountOverviewItem from './DiscountOverviewItem';
import GridHeaderItem from 'common/components/other/GridHeaderItem';
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
  listBody: {
    overflow: 'auto',
    height: '213px',
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
  const selectedDiscountId = useSelector((state) => state.discounts.views.itemId);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchDiscounts()).then(() => setDataLoaded(true));
  }, [dispatch]);

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
            Typ
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Ablaufdatum
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Aktiv
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box className={classes.listBody}>
        {dataLoaded ? (
          discountsArray.length === 0 ? (
            <EmptyView>Keine Rabattaktion verfügbar...</EmptyView>
          ) : (
            discountsArray.map((discount, index) => (
              <React.Fragment key={nanoid()}>
                <DiscountOverviewItem discount={discount} selected={discount.id === selectedDiscountId} />
                {discountsArray.length >= 5 && index === discountsArray.length - 1 ? null : <Divider />}
              </React.Fragment>
            ))
          )
        ) : (
          <Spinner className={classes.loadingIcon} />
        )}
      </Box>
    </List>
  );
}

export default DiscountOverview;
