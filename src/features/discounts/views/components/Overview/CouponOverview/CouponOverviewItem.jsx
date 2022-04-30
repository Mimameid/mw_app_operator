import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import CouponModal from 'features/discounts/coupons/components/CouponModal';
import GridItem from 'common/components/dataDisplay/GridItem';
import TruncatedBox from 'features/products/common/components/TruncatedBox';
import { DeleteForever, Edit } from '@mui/icons-material';

function CouponOverviewItem({ coupon, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [couponModalOpen, setCouponModalOpen] = useState(false);

  function editEntryHandler(event) {
    setCouponModalOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectDiscountItem(coupon.id));
  }

  const couponStatus = getDiscountStatus(coupon);
  const numberValidCoupons = coupon.isExpired
    ? 0
    : coupon.codes.reduce((prev, cur) => {
        return cur.isValid ? prev + 1 : prev;
      }, 0);
  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
      >
        <Grid container wrap={'nowrap'}>
          <GridItem item xs={2}>
            {coupon.id}
          </GridItem>
          <GridItem item xs={2}>
            {coupon.name}
          </GridItem>
          <GridItem item xs={2}>
            {numberValidCoupons}/{coupon.numberOfCoupons}
          </GridItem>
          <GridItem item xs={3}>
            <TruncatedBox display="flex">
              {new Date(coupon.date.endDate).toLocaleDateString('DE-de')}
              <TruncatedBox color={couponStatus.color} fontSize="subtitle2.fontSize" fontStyle="italic">
                {couponStatus.statusText}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          <GridItem item xs={2}>
            {coupon.value}€
          </GridItem>
          <Grid item xs={1}>
            <Box
              sx={{ visibility: selected ? 'visible' : 'hidden' }}
              display="flex"
              flexGrow={1}
              justifyContent="flex-end"
            >
              <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton aria-label="edit" size="small" onClick={() => setTriggerDelete(true)}>
                <DeleteForever fontSize="small" color="error" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <CouponModal open={couponModalOpen} onClose={() => setCouponModalOpen(false)} coupon={coupon} />
    </React.Fragment>
  );
}

export default CouponOverviewItem;
