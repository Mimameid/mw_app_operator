import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDiscountItem } from 'features/discounts/views/slice';
import { deleteCoupon } from 'features/discounts/coupons/actions';

import { Box, Grid, IconButton, ListItem, makeStyles } from '@material-ui/core';
import WarningDialog from 'common/components/dialogs/WarningDialog';
import CouponModal from 'features/discounts/coupons/components/CouponModal';
import GridItem from 'common/components/other/GridItem';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { DeleteForever, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  highlight: {
    background: theme.palette.primary.light + '85',
  },
  hidden: {
    visibility: 'hidden',
  },
  wrap: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
    },
  },
}));

function CouponOverviewItem({ coupon, selected }) {
  const classes = useStyles();
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

  const numberValidCoupons = coupon.expired
    ? 0
    : coupon.codes.reduce((prev, cur) => {
        return cur.valid ? prev + 1 : prev;
      }, 0);
  return (
    <React.Fragment>
      <ListItem
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
      >
        <Grid container wrap={'nowrap'}>
          <GridItem item xs={1}>
            {coupon.id}
          </GridItem>
          <GridItem item xs={2}>
            {coupon.name}
          </GridItem>
          <GridItem item xs={2}>
            {coupon.desc}
          </GridItem>
          <GridItem item xs={2}>
            {numberValidCoupons}/{coupon.numberOfCoupons}
          </GridItem>
          <GridItem item xs={2}>
            <TruncatedBox display="flex">
              {new Date(coupon.date.endDate).toLocaleDateString('DE-de')}
              <TruncatedBox color="error.main" fontSize="subtitle2.fontSize" fontStyle="italic" pl={1}>
                {coupon.expired ? 'abgelaufen' : null}
              </TruncatedBox>
            </TruncatedBox>
          </GridItem>
          <GridItem item xs={2}>
            {coupon.value}€
          </GridItem>
          <Box className={selected ? null : classes.hidden} display="flex" flexGrow={1} justifyContent="flex-end">
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
