import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, updateShop } from 'features/shop/shop/actions';
import { CUISINE_TYPES, CUISINE_LABELS, SERVICE_TYPES } from 'common/constants';
import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';
import useDetectFormChange from 'common/hooks/useDetectFormChange';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Link, Paper, Toolbar, Avatar } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';
import Autocomplete from 'features/shop/location/components/Autocomplete';
import OpeningHours from 'features/shop/shop/components/OpeningHours';
import FormSwitch from 'common/components/form/FormSwitch';
import FormMultiSelect from 'common/components/form/FormMultiSelect';
import FormTextField from 'common/components/form/FormTextField';
import { CloudUpload } from '@mui/icons-material';

const schema = yup.object({
  name: yup
    .string('Geben Sie einen Namen ein.')
    .min(1, 'Name ist erforderlich')
    .max(48, 'Name zu lang.')
    .required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Kurzbeschreibung ein.')
    .max(48, 'Kurzbeschreibung zu lang.')
    .required('Kurzbeschreibung ist erforderlich'),
  descLong: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(1024, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  address: yup.string('Geben Sie eine korrekte Adresse ein.').required('Adresse ist erforderlich'),
  phoneNumber: yup
    .string('Geben Sie eine Telefonnumer ein.')
    .matches(/^\+?[0-9]+([0-9]|\/|\(|\)|-| ){7,}$/, {
      message: 'Das Format ist fehlerhaft',
      excludeEmptyString: true,
    })
    .required('Telefonnummer ist erforderlich'),
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
      setValue('desc', shopData.desc);
      setValue('descLong', shopData.descLong);
      setValue('address', shopData.location.address);
      setValue('phoneNumber', shopData.phoneNumber);
      setValue('url', shopData.url);
      setValue('serviceTypes', shopData.serviceTypes);
      setValue('cuisineTypes', shopData.cuisineTypes);
      setValue('cuisineLabels', shopData.cuisineLabels);
      setValue('isActive', shopData.isActive);
      setValue('isKosher', shopData.isKosher);
      setValue('openingHours', shopData.openingHours);
    }
    setSelected(false);
  }, [shopData, setValue]);

  useEffect(() => {
    if (shopData.location.address) {
      setValue('address', shopData.location.address);
    }
    setSelected(false);
  }, [selected, shopData.location.address, setValue]);

  const onSubmit = (data) => {
    dispatch(updateShop(data));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between">
          <ContentHeader name={name} info="Ihre Shop Daten." />
          <Box alignSelf="flex-end">
            <Button
              sx={{
                mb: 3,
                fontSize: 'body1.fontSize',
                textTransform: 'none',
              }}
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
          <Box flexDirection="column">
            <Box sx={{ pt: 6, pb: 9, px: 4, textAlign: 'center' }} display="flex" justifyContent="space-around">
              <Box>
                <Avatar
                  sx={{
                    height: (theme) => theme.spacing(12),
                    width: (theme) => theme.spacing(12),

                    margin: 'auto',

                    fontSize: 'h4.fontSize',
                    bgcolor: 'avatar.default',
                  }}
                  alt="shop logo"
                  src="./assets/delivery_icon.png"
                >
                  {shopData.name[0]}
                </Avatar>
                <Box
                  sx={{
                    pt: 2,
                    fontSize: { xs: 'h4.fontSize', sm: 'h3.fontSize' },
                  }}
                >
                  {shopData.name}
                </Box>
                <Box fontSize="subtitle1.fontSize">{shopData.desc}</Box>
                <Link
                  rel="noreferrer"
                  href={`http://www.pickstop.de/${shopData.id}/${shopData.name.replaceAll(' ', '-')}`}
                  target="_blank"
                  underline="hover"
                >
                  www.pickstop.de/{shopData.id}/{shopData.name.replaceAll(' ', '-')}
                </Link>
              </Box>
            </Box>

            <Box width="90%" m="auto" pb={8}>
              <Grid container direction="column" spacing={4}>
                <Grid container item spacing={4} justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <FormTextField name="name" label="Name*" control={control} variant="outlined" fullWidth />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="desc"
                      label="Kurzbeschreibung*"
                      placeholder="Beschreiben Sie ihr Shop kurz..."
                      control={control}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={4} justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      name="address"
                      label="Addresse*"
                      control={control}
                      onSelect={() => setSelected(true)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="phoneNumber"
                      label="Telefonnummer*"
                      control={control}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={4} justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <FormTextField name="url" label="URL" control={control} variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <FormMultiSelect
                          name="cuisineTypes"
                          label="Kategorien*"
                          items={CUISINE_TYPES}
                          control={control}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="descLong"
                      label="Beschreibung*"
                      placeholder="Beschreiben Sie ihr Shop etwas ausführlicher..."
                      control={control}
                      variant="outlined"
                      multiline
                      rows={6}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={4} justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <OpeningHours name="openingHours" control={control} setOpeningHours={setValue} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <FormMultiSelect
                          name="serviceTypes"
                          label="Servicearten*"
                          items={SERVICE_TYPES}
                          control={control}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormMultiSelect
                          name="cuisineLabels"
                          label="Labels"
                          items={CUISINE_LABELS}
                          control={control}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormSwitch
                          name="isKosher"
                          label="Koscher"
                          control={control}
                          desc="Geben Sie an, ob Ihre Gastronomie das Essen Koscher zubereitet."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </form>
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Shop;
