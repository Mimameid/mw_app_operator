import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllMenus } from 'features/menus/menus/actions';

import { Box, Button, Toolbar, makeStyles } from '@material-ui/core';

import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/ContentHeader';

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
}));

function Discount({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {}, [dispatch]);

  const handleAddButton = () => {};

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
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Discount;
