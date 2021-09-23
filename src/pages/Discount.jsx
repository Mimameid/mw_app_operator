import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Toolbar, makeStyles, Grid } from '@material-ui/core';

import Overview from 'features/discounts/views/components/Overview/Overview';
import ContentHeader from 'common/components/other/ContentHeader';

import DiscountModal from 'features/discounts/discounts/components/DiscountModal';
import { Add } from '@material-ui/icons';
import { fetchAllMenus } from 'features/menus/menus/actions';
import LoadingScreen from 'common/components/other/Spinner';

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
            Hinzufügen
          </Button>
        </Box>
      </Box>

      <Grid className={classes.menuContainer} container direction="column">
        <Grid className={classes.menuListContainer} item>
          <Overview />
        </Grid>

        <Grid item>{/* <DiscountView /> */}</Grid>
      </Grid>

      <DiscountModal open={discountModalOpen} onClose={() => setDiscountModalOpen(false)} />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Discount;
