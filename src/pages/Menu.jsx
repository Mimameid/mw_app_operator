import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from 'features/menus/menus/actions';

import { Box, Button, Grid, Toolbar } from '@material-ui/core';
import Overview from 'features/menus/views/components/Overview/Overview';
import ItemView from 'features/menus/views/components/ItemView/ItemView';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/ContentHeader';

import MenuModal from 'features/menus/menus/components/MenuModal';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import DishModal from 'features/menus/dishes/components/DishModal';
import ChoiceModal from 'features/menus/choices/components/ChoiceModal';
import SubModal from 'features/menus/subs/components/SubModal';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

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
  menuContainer: {
    width: '100%',
    transition: 'margin 0.2s ease-in-out, width 0.2s ease-in-out',
  },

  menuListContainer: {
    paddingBottom: theme.spacing(3),
  },
}));

function Menu({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.menus.views.group);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchAll());
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
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />

      <Box display="flex" justifyContent="space-between">
        <ContentHeader name={name} info="Erstellen Sie ihre Menüs." />
        <Box alignSelf="flex-end">
          <Button
            className={classes.addNewButton}
            onClick={handleAddButton}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Hinzufügen
          </Button>
        </Box>
      </Box>

      <Grid className={classes.menuContainer} container direction="column">
        <Grid className={classes.menuListContainer} item>
          <Overview />
        </Grid>

        <Grid item>
          <ItemView />
        </Grid>
      </Grid>
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
      <SubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Menu;
