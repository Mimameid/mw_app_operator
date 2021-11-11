import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons } from 'features/discounts/coupons/actions';
import { nanoid } from 'common/constants';

import { Grid, List, ListSubheader, Divider, Box } from '@mui/material';
import CouponOverviewItem from './CouponOverviewItem';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';
import Spinner from 'common/components/feedback/Spinner';

function CouponOverview() {
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
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          bgcolor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={2}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Gutscheine
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Ablaufdatum
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Wert
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
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
          <Spinner />
        )}
      </Box>
    </List>
  );
}

export default CouponOverview;
