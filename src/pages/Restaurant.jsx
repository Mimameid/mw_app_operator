import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant } from 'features/restaurant/location/actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper, Toolbar, TextField, Avatar, makeStyles } from '@material-ui/core';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/ContentHeader';

import Autocomplete from 'features/restaurant/restaurant/components/Autocomplete';
import BusinessHours from 'features/restaurant/location/components/BusinessHours';
import { CloudUpload } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  saveButton: {
    fontSize: theme.typography.body1.fontSize,
    marginBottom: theme.spacing(3),
    textTransform: 'none',
  },
  headerContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    margin: 'auto',

    fontSize: theme.typography.h4.fontSize,
    backgroundColor: theme.palette.avatar.default,
  },
  headerName: {
    paddingTop: theme.spacing(2),
  },
}));

const schema = yup.object({
  //   name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  //   address: yup.string('Geben Sie eine korrekte Adresse ein.').required('Adresse ist erforderlich'),
  //   available: yup
  //     .boolean('Geben Sie an, ob die Speise verfügbar ist.')
  //     .required('Angabe der Verfügbarkeit ist erforderlich'),
});

function Restaurant({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.restaurant.restaurant);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [selected, setSelected] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      address: '',
      type: 'Burger',
      available: true,
      price: '0,00',
      categories: [],
      tags: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const promise = dispatch(fetchRestaurant());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (restaurantData) {
      setValue('name', restaurantData.name);
      setValue('address', restaurantData.location);
    }
    setSelected(false);
  }, [restaurantData, setValue, selected]);

  const onSubmit = (data) => {
    console.log('submiotti');
  };

  return dataLoaded ? (
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between">
          <ContentHeader name={name} info="Ihre Restaurant Daten." />
          <Box alignSelf="flex-end">
            <Button
              className={classes.saveButton}
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              type="submit"
            >
              Speichern
            </Button>
          </Box>
        </Box>

        <Paper>
          <Grid className={classes.menuContainer} container direction="column">
            <Grid item>
              <Box className={classes.headerContainer} display="flex" justifyContent="space-around">
                <Box>
                  <Avatar alt="restaurant logo" src="./assets/delivery_icon.png" className={classes.avatar}>
                    {restaurantData.name[0]}
                  </Avatar>
                  <Box className={classes.headerName} fontSize="h3.fontSize">
                    {restaurantData.name}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" flexDirection="column">
                <Box display="flex" style={{ width: '300px', margin: 'auto' }}>
                  <Box>Name</Box>
                  <TextField name="desc" label="Name" variant="outlined" fullWidth />
                </Box>
                <Box display="flex" style={{ width: '300px', margin: 'auto' }}>
                  <Box>Adresse</Box>

                  <Autocomplete
                    name="address"
                    label="Addresse"
                    control={control}
                    onSelect={() => setSelected(true)}
                    variant="outlined"
                  />
                </Box>

                <Box style={{ width: '300px', margin: 'auto' }}>
                  <TextField name="phoneNumber" label="Telefonnummer" variant="outlined" fullWidth />
                </Box>
                <Box style={{ width: '300px', margin: 'auto' }}>
                  <TextField name="desc" label="Name" variant="standard" fullWidth />
                </Box>
                <Box style={{ width: '300px', margin: 'auto' }}>
                  <TextField name="desc" label="Name" variant="standard" fullWidth />
                </Box>

                <Box style={{ width: '300px', margin: 'auto' }}>
                  <BusinessHours openingHours={restaurantData.openingHours} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Restaurant;
