import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMenus } from 'features/menus/menus/actions';

import { Box, Button, Toolbar, makeStyles, Grid } from '@material-ui/core';
import Overview from 'features/discounts/views/components/Overview/Overview';
import ContentHeader from 'common/components/other/ContentHeader';
import LoadingScreen from 'common/components/other/Spinner';
import ItemView from 'features/discounts/views/components/ItemView/ItemView';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import CouponModal from 'features/discounts/coupons/components/CouponModal';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  addNewButton: {
    fontSize: theme.typography.body1.fontSize,
    marginBottom: theme.spacing(3),
    textTransform: 'none',
  },
  discountContainer: {
    width: '100%',
    transition: 'margin 0.2s ease-in-out, width 0.2s ease-in-out',
    backgroundColor: 'transparent',
  },

  discountListContainer: {
    paddingBottom: theme.spacing(3),
    backgroundColor: 'transparent',
  },
}));

function Discount({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.discounts.views.group);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [couponModal, setCouponModalOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchAllMenus());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  const handleAddButton = () => {
    switch (selectedGroup) {
      case 0:
        setDiscountModalOpen(true);
        break;
      case 1:
        setCouponModalOpen(true);
        break;
      default:
        return;
    }
  };

  return dataLoaded ? (
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />

      <Box display="flex" justifyContent="space-between">
        <ContentHeader name={name} info="Erstellen Sie Ihre Angebote." />
        <Box alignSelf="flex-end">
          <Button
            className={classes.addNewButton}
            onClick={handleAddButton}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Erstellen
          </Button>
        </Box>
      </Box>

      <Grid className={classes.discountContainer} container direction="column">
        <Grid className={classes.discountListContainer} item>
          <Overview />
        </Grid>

        <Grid item>
          <ItemView />
        </Grid>
      </Grid>

      <DiscountModal open={discountModalOpen} onClose={() => setDiscountModalOpen(false)} />
      <CouponModal open={couponModal} onClose={() => setCouponModalOpen(false)} />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Discount;
