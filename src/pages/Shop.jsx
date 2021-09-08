import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, updateShop } from 'features/shop/shop/actions';
import { CUISINE_TYPES, CUISINE_LABELS, SERVICE_TYPES } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';
import useDetectFormChange from 'common/hooks/useDetectFormChange';
import { Box, Button, Grid, Paper, Toolbar, Avatar, makeStyles } from '@material-ui/core';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/ContentHeader';
import Autocomplete from 'features/shop/location/components/Autocomplete';
import OpeningHours from 'features/shop/shop/components/OpeningHours';
import FormSwitch from 'common/components/form/FormSwitch';
import FormMultiSelect from 'common/components/form/FormMultiSelect';
import FormTextField from 'common/components/form/FormTextField';
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
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
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
  name: yup
    .string('Geben Sie einen Namen ein.')
    .min(1, 'Name ist erforderlich')
    .max(255, 'Name zu lang.')
    .required('Name ist erforderlich'),
  address: yup.string('Geben Sie eine korrekte Adresse ein.').required('Adresse ist erforderlich'),
  phoneNumber: yup.string('Geben Sie eine Telefonnumer ein.').matches(/^\+?[0-9]+([0-9]|\/|\(|\)|-| ){7,}$/, {
    message: 'Das Format ist fehlerhaft',
    excludeEmptyString: true,
  }),
  url: yup
    .string('Geben Sie eine URL ein.')
    .matches(
      /^(www\.|[a-zA-Z0-9](.*[a-zA-Z0-9])?\.)?((?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-z]{2,5}(:[0-9]{1,5})?$/i,
      { message: 'Das Format ist fehlerhaft', excludeEmptyString: true },
    ),
  serviceTypes: yup
    .array()
    .min(1, 'Es muss mindestens eine Serviceart ausgewählt werden.')
    .of(yup.string().oneOf(SERVICE_TYPES, 'Serviceart muss aus der vorgegebenen Liste ausgewählt werden'))
    .required(),
  cuisineTypes: yup
    .array()
    .min(1, 'Es muss mindestens eine Kategorie ausgewählt werden.')
    .max(3, 'Es dürfen maximal 3 Kategorien ausgewählt werden.')
    .of(yup.string().oneOf(CUISINE_TYPES, 'Kategorie muss aus der vorgegebenen Liste ausgewählt werden'))
    .required(),
  cuisineLabels: yup
    .array()
    .of(yup.string().oneOf(CUISINE_LABELS, 'Label muss aus der vorgegebenen Liste ausgewählt werden'))
    .required(),
  isActive: yup
    .boolean('Geben Sie an, ob Ihre Gastronomie online gehen soll.')
    .required('Diese Angabe ist erforderlich'),
  isKosher: yup
    .boolean('Geben Sie an, ob Ihre Gastronomie das Essen Kosher zubereitet.')
    .required('Diese Angabe ist erforderlich'),
});

function Shop({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shopData = useSelector((state) => state.shop.shop);

  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [selected, setSelected] = useState(false);

  const { handleSubmit, control, setValue, formState } = useForm({
    mode: 'onTouched',
    defaultValues: shopData,
    resolver: yupResolver(schema),
  });
  useDetectFormChange(formState);

  useEffect(() => {
    const promise = dispatch(fetchShop());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (shopData) {
      setValue('name', shopData.name);
      setValue('address', shopData.location.address);
      setValue('phoneNumber', shopData.phoneNumber);
      setValue('url', shopData.url);
      setValue('serviceTypes', shopData.serviceTypes);
      setValue('cuisineTypes', shopData.cuisineTypes);
      setValue('cuisineLabels', shopData.cuisineLabels);
      setValue('isActive', shopData.isActive);
      setValue('isKosher', shopData.isKosher);
    }
    setSelected(false);
  }, [shopData, setValue, selected]);

  const onSubmit = (data) => {
    dispatch(updateShop(data));
  };

  return dataLoaded ? (
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between">
          <ContentHeader name={name} info="Ihre Shop Daten." />
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
                  <Avatar alt="shop logo" src="./assets/delivery_icon.png" className={classes.avatar}>
                    {shopData.name[0]}
                  </Avatar>
                  <Box className={classes.headerName} fontSize="h3.fontSize">
                    {shopData.name}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box width="90%" m="auto" pb={8}>
                <Grid container direction="column" spacing={4}>
                  <Grid container item spacing={3} justifyContent="space-around">
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormTextField name="name" label="Name*" control={control} variant="outlined" fullWidth />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Autocomplete
                          name="address"
                          label="Addresse*"
                          control={control}
                          onSelect={() => setSelected(true)}
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3} justifyContent="space-around">
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormTextField
                          name="phoneNumber"
                          label="Telefonnummer"
                          control={control}
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormTextField name="url" label="URL" control={control} variant="outlined" fullWidth />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3} justifyContent="space-around">
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormMultiSelect
                          name="serviceTypes"
                          label="Servicearten*"
                          items={SERVICE_TYPES}
                          control={control}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormMultiSelect
                          name="cuisineTypes"
                          label="Kategorien*"
                          items={CUISINE_TYPES}
                          control={control}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3} justifyContent="space-around">
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <OpeningHours />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box pb={1}>
                        <FormMultiSelect
                          name="cuisineLabels"
                          label="Labels"
                          items={CUISINE_LABELS}
                          control={control}
                          variant="outlined"
                        />
                      </Box>
                      <Box py={1}>
                        <FormSwitch
                          name="isKosher"
                          label="Koscher"
                          control={control}
                          desc="Geben Sie an, ob Ihre Gastronomie das Essen Koscher zubereitet."
                        />
                      </Box>
                      <Box pt={1}>
                        <FormSwitch
                          name="isActive"
                          label="Aktiv"
                          control={control}
                          desc="Geben Sie an, ob Ihre Gastronomie online gehen soll."
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
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

export default Shop;
