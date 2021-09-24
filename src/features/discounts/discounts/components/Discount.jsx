import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDiscountTypeName, weekdays } from 'common/constants';

import { Box, Divider, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import DiscountModal from './DiscountModal';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: '1px solid ' + theme.palette.grey[300],
  },
  headerContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  innerContainer: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  subtitle: {
    marginTop: '-4px',
    paddingTop: theme.spacing(1),

    lineHeight: '24px',
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
  toggleButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: theme.spacing(2),
    height: theme.spacing(4),
    margin: theme.spacing(0.5),

    color: theme.palette.action.disabledOpacity,
    ...theme.typography.button,

    border: 'none',
    borderRadius: theme.shape.borderRadius,
  },
  coloredButton: {
    width: theme.spacing(4),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

function Discount() {
  const classes = useStyles();
  const discountId = useSelector((state) => state.discounts.views.itemId);
  const discount = useSelector((state) => state.discounts.discounts.byId[discountId]);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);

  return (
    <Paper elevation={3} className={classes.root}>
      {discountId ? (
        <React.Fragment>
          <Box display="flex" flexDirection="column">
            <Box className={classes.headerContainer}>
              <Box display="flex">
                <TruncatedBox fontSize="h6.fontSize" fontWeight="fontWeightBold">
                  {discount.name}
                </TruncatedBox>
                <Box className={classes.buttonsContainer}>
                  <IconButton aria-label="edit" size="small" onClick={() => setDiscountModalOpen(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
                {discount.active ? (
                  <Box
                    className={classes.buttonsContainer}
                    color={'green'}
                    fontStyle={'italic'}
                    flexGrow={1}
                    textAlign="right"
                  >
                    aktiv
                  </Box>
                ) : null}
              </Box>

              <TruncatedBox
                className={classes.subtitle}
                color="text.secondary"
                fontSize="subtitle2.fontSize"
                fontStyle="italic"
              >
                {discount.desc ? discount.desc : 'Keine Beschreibung verfügbar...'}
              </TruncatedBox>
            </Box>
            <Divider />
            <Grid container direction="column">
              <Grid className={classes.container} container>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Typ
                  </Box>
                  <Box display="flex">
                    <Box>{getDiscountTypeName(discount.type)}rabatt</Box>
                  </Box>
                </Grid>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Betroffene {getDiscountTypeName(discount.type)}
                  </Box>
                  <Box>{discount.effectedItems.map((item, index) => item[1]).join(', ')}</Box>
                </Grid>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    {discount.isFixedPrice ? <Box> Festpreis</Box> : <Box> Nachlass</Box>}
                  </Box>
                  {discount.isFixedPrice ? (
                    <Box> {discount.fixedPrice}</Box>
                  ) : (
                    <React.Fragment>
                      <Box>
                        Nachlass: {discount.reduction}
                        {discount.percental ? '%' : '€'}
                      </Box>
                      <Box> Midnestbestellwert: {discount.minOrderValue}€</Box>
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>

              <Divider />
              <Grid className={classes.container} container>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
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
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Wochentage
                  </Box>
                  <Box display="flex">
                    {Object.keys(weekdays).map((day, index) => {
                      return (
                        <span
                          key={index}
                          className={`${classes.toggleButton} ${
                            discount.weekdays.includes(day) ? classes.coloredButton : null
                          }`}
                          value={day}
                        >
                          {day[0]}
                        </span>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid className={classes.innerContainer} item sm={12} md={4}>
                  <Box fontSize="subtitle1.fontSize" fontWeight="fontWeightBold">
                    Uhrzeit
                  </Box>
                  <Box display="flex">
                    <Box>{discount.time.startTime} Uhr</Box>
                    <Box px={1}> - </Box>
                    <Box>{discount.time.endTime} Uhr</Box>
                  </Box>
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
