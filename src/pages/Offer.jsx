import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOffers } from 'features/offers/offers/actions';

import { Box, Button, Grid, Toolbar } from '@mui/material';
import Overview from 'features/offers/views/components/Overview/Overview';
import ItemView from 'features/offers/views/components/ItemView/ItemView';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';

import OfferModal from 'features/offers/offers/components/OfferModal';
import CategoryModal from 'features/offers/categories/components/CategoryModal';
import DishModal from 'features/offers/dishes/components/DishModal';
import ChoiceModal from 'features/offers/choices/components/ChoiceModal';
import SubModal from 'features/offers/subs/components/SubModal';
import { Add } from '@mui/icons-material';

function Offer({ name }) {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.offers.views.group);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchAllOffers());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  const handleAddButton = () => {
    switch (selectedGroup) {
      case 0:
        setOfferModalOpen(true);
        break;
      case 1:
        setCategoryModalOpen(true);
        break;
      case 2:
        setDishModalOpen(true);
        break;
      case 3:
        setChoiceModalOpen(true);
        break;
      case 4:
        setSubModalOpen(true);
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
        <ContentHeader name={name} info="Erstellen Sie Ihre Speisekarten." />
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
        <Grid sx={{ pb: 3 }} item>
          <Overview />
        </Grid>

        <Grid item>
          <ItemView />
        </Grid>
      </Grid>
      <OfferModal open={offerModalOpen} onClose={() => setOfferModalOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
      <SubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Offer;
