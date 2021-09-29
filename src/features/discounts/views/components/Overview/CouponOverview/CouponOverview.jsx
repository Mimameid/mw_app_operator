import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons } from 'features/discounts/coupons/actions';
import { nanoid } from 'common/constants';

import { Grid, List, ListSubheader, Divider, makeStyles, Box } from '@material-ui/core';
import CouponOverviewItem from './CouponOverviewItem';
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

function CouponOverview() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const couponsArray = useSelector((state) => {
    let couponsArray = Object.values(state.discounts.coupons.byId);
    couponsArray.sort((a, b) => a.name.localeCompare(b.name));
    return couponsArray;
  });
  const selectedCouponId = useSelector((state) => state.discounts.views.itemId);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchCoupons()).then(() => setDataLoaded(true));
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
            Gutscheine
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Ablaufdatum
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Wert
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box className={classes.listBody}>
        {dataLoaded ? (
          couponsArray.length === 0 ? (
            <EmptyView>Keine Couponaktion verfügbar...</EmptyView>
          ) : (
            couponsArray.map((coupon, index) => (
              <React.Fragment key={nanoid()}>
                <CouponOverviewItem coupon={coupon} selected={coupon.id === selectedCouponId} />
                {couponsArray.length >= 5 && index === couponsArray.length - 1 ? null : <Divider />}
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

export default CouponOverview;
