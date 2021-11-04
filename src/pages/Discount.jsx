import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMenus } from 'features/menus/menus/actions';

import { Box, Button, Toolbar, Grid } from '@mui/material';
import Overview from 'features/discounts/views/components/Overview/Overview';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';
import LoadingScreen from './LoadingScreen';
import ItemView from 'features/discounts/views/components/ItemView/ItemView';
import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import CouponModal from 'features/discounts/coupons/components/CouponModal';
import { Add } from '@mui/icons-material';

function Discount({ name }) {
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
    <Box
      sx={{
        p: 3,
        pt: 0,
      }}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Toolbar />

      <Box display="flex" justifyContent="space-between">
        <ContentHeader name={name} info="Erstellen Sie Ihre Angebote." />
        <Box alignSelf="flex-end">
          <Button
            sx={{
              mb: 3,
              fontSize: 'body1.fontSize',
              textTransform: 'none',
            }}
            onClick={handleAddButton}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Erstellen
          </Button>
        </Box>
      </Box>

      <Grid
        sx={{
          width: '100%',
          transition: 'margin 0.2s ease-in-out, width 0.2s ease-in-out',
          backgroundColor: 'transparent',
        }}
        container
        direction="column"
      >
        <Grid
          sx={{
            pb: 3,
          }}
          item
        >
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
