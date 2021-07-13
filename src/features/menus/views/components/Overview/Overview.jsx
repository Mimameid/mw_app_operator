import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectGroup } from '../../viewsSlice';

import { Paper, Box, Tabs, makeStyles, Fab } from '@material-ui/core';
import GroupTab from './GroupTab';
import MenuOverview from './MenuOverview/MenuOverview';
import CategoryOverview from './CategoryOverview/CategoryOverview';
import DishOverview from './DishOverview/DishOverview';
import ChoiceOverview from './ChoiceOverview/ChoiceOverview';
import SubOverview from './SubOverview/SubOverview';
import MenuModal from 'features/menus/menus/components/MenuModal';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import DishModal from 'features/menus/dishes/components/DishModal';
import ChoiceModal from 'features/menus/choices/components/ChoiceModal';
import SubModal from 'features/menus/subs/components/SubModal';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  tabs: {
    borderRadius: '6px 6px 0 0',
    boxShadow: theme.shadows[20],
  },
  tab: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderRadius: '6px 6px 0 0',
    boxShadow: theme.shadows[12],
  },
  listContainer: {
    height: '265px',
    overflow: 'auto',

    boxShadow: theme.shadows[3],
  },
  fab: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',

    zIndex: 10,
  },
}));

const tabNames = ['Menüs', 'Kategorien', 'Speisen', 'Optiongruppe', 'Optionen'];
function Overview() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  const handleChange = (event, newValue) => {
    dispatch(selectGroup(newValue));
    setValue(newValue);
  };

  const renderList = (value) => {
    switch (value) {
      case 0:
        return <MenuOverview />;
      case 1:
        return <CategoryOverview />;
      case 2:
        return <DishOverview />;
      case 3:
        return <ChoiceOverview />;
      case 4:
        return <SubOverview />;
      default:
        return null;
    }
  };

  const handleAddButton = (event) => {
    event.stopPropagation();
    switch (value) {
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

  return (
    <Paper className={classes.container} elevation={0}>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="menu tabs"
        variant="fullWidth"
      >
        {tabNames.map((tabName, index) => (
          <GroupTab key={index} selected={index === value} value={index} label={tabName} />
        ))}
      </Tabs>
      <Fab className={classes.fab} color="primary" size="small" onClick={handleAddButton}>
        <Add />
      </Fab>
      <Box className={classes.listContainer}>{renderList(value)}</Box>
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
      <SubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </Paper>
  );
}

export default Overview;
