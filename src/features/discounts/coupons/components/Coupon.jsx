import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { getDiscountStatus } from 'features/discounts/discounts/utils';

import { Box, Divider, Grid, IconButton, List, ListItem, ListSubheader, Paper, TablePagination } from '@mui/material';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import CouponModal from './CouponModal';
import { Edit } from '@mui/icons-material';

function Coupon() {
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
    <Paper sx={{ p: 2, borderBottom: (theme) => '1px solid ' + theme.palette.grey[300] }}>
      {couponId ? (
        <React.Fragment>
          <Box display="flex" flexDirection="column">
            <Box sx={{ pb: 2 }}>
              <Box display="flex">
                <TruncatedBox fontSize="h6.fontSize" fontWeight="fontWeightBold">
                  {coupon.name}
                </TruncatedBox>
                <Box sx={{ pl: 1 }}>
                  <IconButton aria-label="edit" size="small" onClick={() => setCouponModalOpen(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <TruncatedBox
                sx={{
                  mt: '-4px',
                  pt: 1,

                  lineHeight: '24px',
                }}
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
                    <Box
                      sx={{
                        mt: '-4px',
                        pt: 1,

                        lineHeight: '24px',
                      }}
                      display="flex"
                    >
                      <Box> Gültige Gutscheine:</Box>
                      <Box pl={1}>
                        {numberValidCoupons}/{coupon.numberOfCoupons}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        mt: '-4px',
                        pt: 1,

                        lineHeight: '24px',
                      }}
                      display="flex"
                    >
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
                    <Box
                      sx={{
                        mt: '-4px',
                        pt: 1,

                        lineHeight: '24px',
                      }}
                      display="flex"
                    >
                      <Box>Wert:</Box>
                      <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                        {coupon.value}€
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: '-4px',
                        pt: 1,

                        lineHeight: '24px',
                      }}
                      display="flex"
                    >
                      <Box>Mindestbestellwert:</Box>
                      <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                        {coupon.minOrderValue}€
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: (theme) => theme.palette.grey[400] }}>
              <List disablePadding>
                <ListSubheader
                  sx={{
                    color: 'common.white',
                    bgcolor: 'primary.main',

                    borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
                  }}
                >
                  <Grid container>
                    <GridHeaderItem item xs={3}>
                      Code
                    </GridHeaderItem>
                    <GridHeaderItem item xs={3}>
                      Gültig
                    </GridHeaderItem>
                  </Grid>
                </ListSubheader>
                <Box sx={{ overflow: 'auto', height: '221px' }}>
                  {visibleCodes.map((code, index) => (
                    <React.Fragment key={code.id}>
                      <ListItem
                        sx={{
                          borderBottomWidth: '1px',
                          borderBottomStyle: 'solid',
                          borderBottomColor: (theme) => theme.palette.grey[400],
                          '&:last-of-type': {
                            borderBottom: 0,
                          },
                        }}
                      >
                        <Grid container>
                          <GridHeaderItem item xs={3}>
                            {code.code}
                          </GridHeaderItem>
                          <GridHeaderItem item xs={3}>
                            {coupon.date.endDate < new Date().setHours(0, 0, 0, 0) ? (
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
