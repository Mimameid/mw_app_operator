import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscounts } from 'features/discounts/discounts/actions';

import { Grid, List, ListSubheader, Divider, Box } from '@mui/material';
import DiscountOverviewItem from './DiscountOverviewItem';
import DeleteDiscount from 'features/discounts/discounts/components/DeleteDiscount';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';
import Spinner from 'common/components/feedback/Spinner';

function DiscountOverview() {
  const dispatch = useDispatch();
  const discountsArray = useSelector((state) => {
    let discountsArray = Object.values(state.discounts.discounts.byId);
    discountsArray.sort((a, b) => a.name.localeCompare(b.name));
    return discountsArray;
  });
  const selectedDiscountId = useSelector((state) => state.discounts.views.itemId);

  const [triggerDelete, setTriggerDelete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchDiscounts()).then(() => setDataLoaded(true));
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
            Typ
          </GridHeaderItem>
          <GridHeaderItem item xs={3}>
            Ablaufdatum
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Aktiv
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {dataLoaded ? (
          discountsArray.length === 0 ? (
            <EmptyView>Keine Rabattaktion verfügbar...</EmptyView>
          ) : (
            discountsArray.map((discount, index) => (
              <React.Fragment key={discount.id}>
                <DiscountOverviewItem
                  discount={discount}
                  setTriggerDelete={setTriggerDelete}
                  selected={discount.id === selectedDiscountId}
                />
                {discountsArray.length >= 5 && index === discountsArray.length - 1 ? null : <Divider />}
              </React.Fragment>
            ))
          )
        ) : (
          <Spinner />
        )}
      </Box>
      <DeleteDiscount trigger={triggerDelete} setTrigger={setTriggerDelete} discountId={selectedDiscountId} />
    </List>
  );
}

export default DiscountOverview;
