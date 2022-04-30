import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMenus } from 'features/products/menus/actions';

import { Box, Button, Grid, Toolbar } from '@mui/material';
import Overview from 'features/products/views/components/Overview/Overview';
import ItemView from 'features/products/views/components/ItemView/ItemView';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';

import MenuModal from 'features/products/menus/components/MenuModal';
import CategoryModal from 'features/products/categories/components/CategoryModal';
import ProductModal from 'features/products/products/components/ProductModal';
import ChoiceModal from 'features/products/choices/components/ChoiceModal';
import SubModal from 'features/products/subs/components/SubModal';
import { Add } from '@mui/icons-material';

function Menu({ name }) {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.menus.views.group);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchAllMenus());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  const handleAddButton = () => {
    switch (selectedGroup) {
      case 0:
        setMenuModalOpen(true);
        break;
      case 1:
        setCategoryModalOpen(true);
        break;
      case 2:
        setProductModalOpen(true);
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
        <Grid sx={{ pb: 3 }} item>
          <Overview />
        </Grid>

        <Grid item>
          <ItemView />
        </Grid>
      </Grid>
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
      <ProductModal open={productModalOpen} onClose={() => setProductModalOpen(false)} />
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
      {/* <SubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} /> */}
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Menu;
