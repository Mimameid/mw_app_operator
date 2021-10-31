import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Paper,
  TablePagination,
} from '@material-ui/core';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import GridHeaderItem from 'common/components/other/GridHeaderItem';
import CouponModal from './CouponModal';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: '1px solid ' + theme.palette.grey[300],
  },
  headerContainer: {
    paddingBottom: theme.spacing(2),
  },
  subtitle: {
    marginTop: '-4px',
    paddingTop: theme.spacing(1),

    lineHeight: '24px',
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
  listContainer: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.grey[400],
  },
  listHeader: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderBottom: '1px solid ' + theme.palette.primary.main,
  },
  listBody: {
    overflow: 'auto',
    height: '221px',
  },
  listeItem: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[400],
    '&:last-of-type': {
      borderBottom: 0,
    },
  },
}));

function Coupon() {
  const classes = useStyles();
  const couponId = useSelector((state) => state.discounts.views.itemId);
  const coupon = useSelector((state) => state.discounts.coupons.byId[couponId]);
  const [pageSize, setPageSize] = React.useState(25);
  const [page, setPage] = useState(0);

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const onPageChange = (event, page) => {
    setPage(page);
  };

  const couponStatus = getDiscountStatus(coupon);
  const visibleCodes = coupon.codes.slice(page * pageSize, (page + 1) * pageSize);
  const numberValidCoupons = coupon.expired
    ? 0
    : coupon.codes.reduce((prev, cur) => {
        return cur.isValid ? prev + 1 : prev;
      }, 0);

  return (
    <Paper elevation={3} className={classes.root}>
      {couponId ? (
        <React.Fragment>
          <Box display="flex" flexDirection="column">
            <Box className={classes.headerContainer}>
              <Box display="flex">
                <TruncatedBox fontSize="h6.fontSize" fontWeight="fontWeightBold">
                  {coupon.name}
                </TruncatedBox>
                <Box className={classes.buttonsContainer}>
                  <IconButton aria-label="edit" size="small" onClick={() => setCouponModalOpen(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <TruncatedBox
                className={classes.subtitle}
                color="text.secondary"
                fontSize="subtitle2.fontSize"
                fontStyle="italic"
              >
                {coupon.desc ? coupon.desc : 'Keine Beschreibung verfügbar...'}
              </TruncatedBox>
            </Box>
            <Divider />
            <Box pt={1} pb={2}>
              <Grid container justifyContent="space-between">
                <Grid item xs={12} md={4}>
                  <Box>
                    <Box display="flex" className={classes.subtitle}>
                      <Box> Gültige Gutscheine:</Box>
                      <Box pl={1}>
                        {numberValidCoupons}/{coupon.numberOfCoupons}
                      </Box>
                    </Box>

                    <Box display="flex" className={classes.subtitle}>
                      <Box> Zeitraum:</Box>
                      <Box display="flex" flexWrap="nowrap">
                        <TruncatedBox pl={1}>
                          {new Date(coupon.date.startDate).toLocaleDateString('de-DE')} -{' '}
                          {new Date(coupon.date.endDate).toLocaleDateString('de-DE')}
                        </TruncatedBox>
                        <TruncatedBox
                          color={couponStatus.color}
                          fontSize="subtitle2.fontSize"
                          fontStyle="italic"
                          pl={1}
                        >
                          {couponStatus.statusText}
                        </TruncatedBox>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Box display="flex" className={classes.subtitle}>
                      <Box>Wert:</Box>
                      <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                        {coupon.value}€
                      </Box>
                    </Box>
                    <Box display="flex" className={classes.subtitle}>
                      <Box>Mindestbestellwert:</Box>
                      <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                        {coupon.minOrderValue}€
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.listContainer}>
              <List disablePadding>
                <ListSubheader className={classes.listHeader}>
                  <Grid container>
                    <GridHeaderItem item xs={3}>
                      Code
                    </GridHeaderItem>
                    <GridHeaderItem item xs={3}>
                      Gültig
                    </GridHeaderItem>
                  </Grid>
                </ListSubheader>
                <Box className={classes.listBody}>
                  {visibleCodes.map((code, index) => (
                    <React.Fragment key={nanoid()}>
                      <ListItem className={classes.listeItem}>
                        <Grid container>
                          <GridHeaderItem item xs={3}>
                            {code.code}
                          </GridHeaderItem>
                          <GridHeaderItem item xs={3}>
                            {coupon.isExpired ? (
                              <Box color="error.main">Abgelaufen</Box>
                            ) : code.isValid ? (
                              <Box color="success.main">Gültig</Box>
                            ) : (
                              <Box color="error.main">Ungültig</Box>
                            )}
                          </GridHeaderItem>
                        </Grid>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </Box>
              </List>
            </Box>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={coupon.codes.length}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={(event) => {
                setPage(0);
                setPageSize(event.target.value);
              }}
            />
          </Box>
          <CouponModal open={couponModalOpen} onClose={() => setCouponModalOpen(false)} coupon={coupon} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Coupon;
