import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { deleteCoupon } from 'features/discounts/coupons/actions';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import { Box, Grid, IconButton, ListItem } from '@mui/material';
import WarningDialog from 'common/components/feedback/WarningDialog';
import CouponModal from 'features/discounts/coupons/components/CouponModal';
import GridItem from 'common/components/dataDisplay/GridItem';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { DeleteForever, Edit } from '@mui/icons-material';

function CouponOverviewItem({ coupon, selected }) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  function editEntryHandler(event) {
    setCouponModalOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectDiscountItem(coupon.id));
  }

  function deleteEntryHandler(event) {
    setDialogOpen(true);
  }

  function handleRejectDialog(event) {
    setDialogOpen(false);
  }

  function handleAcceptDialog(event) {
    dispatch(deleteCoupon(coupon.id));
    setDialogOpen(false);
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
        sx={{ bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
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
              <TruncatedBox color={couponStatus.color} fontSize="subtitle2.fontSize" fontStyle="italic" pl={1}>
                {couponStatus.statusText}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          <GridItem item xs={2}>
            {coupon.value}€
          </GridItem>
          <Box
            sx={{ visibility: selected ? 'hidden' : 'visible' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={deleteEntryHandler}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <WarningDialog
        open={dialogOpen}
        title="Couponaktion löschen?"
        message="Dieser Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
      <CouponModal open={couponModalOpen} onClose={() => setCouponModalOpen(false)} coupon={coupon} />
    </React.Fragment>
  );
}

export default CouponOverviewItem;
