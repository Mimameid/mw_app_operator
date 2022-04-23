import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDiscountTypeName, weekdays } from 'common/constants';
import { getDiscountStatus } from '../utils';

import { Box, Divider, Grid, IconButton, Paper } from '@mui/material';
import TruncatedBox from 'features/offers/common/components/TruncatedBox';
import DiscountModal from './DiscountModal';
import { Edit } from '@mui/icons-material';

function Discount() {
  const discountId = useSelector((state) => state.discounts.views.itemId);
  const discount = useSelector((state) => state.discounts.discounts.byId[discountId]);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const discountStatus = getDiscountStatus(discount);

  return (
    <Paper sx={{ p: 2, borderBottom: (theme) => '1px solid ' + theme.palette.grey[300] }}>
      {discountId ? (
        <React.Fragment>
          <Box display="flex" flexDirection="column">
            <Box sx={{ pb: 2 }}>
              <Box display="flex">
                <TruncatedBox fontSize="h6.fontSize" fontWeight="fontWeightBold">
                  {discount.name}
                </TruncatedBox>
                <Box sx={{ pl: 1 }}>
                  <IconButton aria-label="edit" size="small" onClick={() => setDiscountModalOpen(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  sx={{ pl: 1 }}
                  color={discount.isActive ? 'success.main' : 'grey.500'}
                  fontStyle={'italic'}
                  flexGrow={1}
                  textAlign="right"
                >
                  {discount.isActive ? 'aktiv' : 'inaktiv'}
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
                {discount.desc ? discount.desc : 'Keine Beschreibung verfügbar...'}
              </TruncatedBox>
            </Box>
            <Divider />
            <Grid container direction="column">
              <Grid sx={{ pt: 1, pb: { xs: 0, md: 2 } }} container>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Typ
                  </Box>
                  <Box display="flex">
                    <Box>{getDiscountTypeName(discount.scope.itemType)}rabatt</Box>
                  </Box>
                </Grid>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Betroffene {getDiscountTypeName(discount.scope.itemType)}
                  </Box>
                  <Box>{discount.scope.items.map((item, index) => item[1]).join(', ')}</Box>
                </Grid>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    {discount.isFixedPrice ? <Box> Festpreis</Box> : <Box> Nachlass</Box>}
                  </Box>
                  {discount.isFixedPrice ? (
                    <Box> {discount.fixedPrice}</Box>
                  ) : (
                    <React.Fragment>
                      <Box display="flex">
                        <Box>Nachlass:</Box>
                        <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                          {discount.reduction}
                          {discount.percental ? '%' : '€'}
                        </Box>
                      </Box>
                      <Box display="flex">
                        <Box>Midnestbestellwert:</Box>
                        <Box color="primary.main" fontWeight="fontWeightBold" pl={1}>
                          {discount.minOrderValue}€
                        </Box>
                      </Box>
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>

              <Divider />
              <Grid sx={{ pt: 1, pb: { xs: 0, md: 2 } }} container>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Zeitraum
                  </Box>
                  <Box display="flex" flexDirection="column">
                    {discount.repeating ? (
                      <Box>Wiederkehrend</Box>
                    ) : (
                      <Box display="flex">
                        <Box>{new Date(discount.date.startDate).toLocaleDateString('de-DE')}</Box>
                        <Box px={1}> - </Box>
                        <Box>{new Date(discount.date.endDate).toLocaleDateString('de-DE')}</Box>
                        <Box color={discountStatus.color} fontSize="subtitle2.fontSize" fontStyle="italic" pl={1}>
                          {discountStatus.statusText}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Wochentage
                  </Box>
                  <Box display="flex">
                    {Object.keys(weekdays).map((day, index) => {
                      return (
                        <Box
                          component={'span'}
                          key={index}
                          sx={{
                            typography: 'button',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                            width: (theme) => (discount.weekdays.includes(day) ? theme.spacing(4) : theme.spacing(2)),
                            height: (theme) => theme.spacing(4),
                            m: 0.5,

                            color: discount.weekdays.includes(day) ? 'common.white' : 'action.disabledOpacity',

                            border: 'none',
                            borderRadius: (theme) => theme.shape.borderRadius,

                            backgroundColor: (theme) =>
                              discount.weekdays.includes(day) ? theme.palette.primary.main : null,
                          }}
                          value={day}
                        >
                          {day[0]}
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid sx={{ pb: { xs: 2, md: 0 } }} item xs={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Uhrzeit
                  </Box>
                  {discount.allDay ? (
                    <Box>Ganztags</Box>
                  ) : (
                    <Box display="flex">
                      <Box>{discount.timeRange.startTime} Uhr</Box>
                      <Box px={1}> - </Box>
                      <Box>{discount.timeRange.endTime} Uhr</Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <DiscountModal open={discountModalOpen} onClose={() => setDiscountModalOpen(false)} discount={discount} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Discount;
