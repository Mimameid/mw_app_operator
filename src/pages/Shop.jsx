import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, updateShop } from 'features/shop/shop/actions';
import { CUISINE_TYPES, CUISINE_LABELS, SERVICE_TYPES } from 'common/constants';
import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Link, Paper, Toolbar, Avatar } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';

import { CloudUpload } from '@mui/icons-material';
import ShopForm from 'features/shop/shop/components/ShopForm';
import AlertDialog from 'common/components/feedback/AlertDialog';

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
  location: yup.object({
    postCode: yup
      .string('Geben Sie eine Postleitzahl ein.')
      .matches(/\d/i, { message: 'Das Format ist fehlerhaft.' })
      .min(5, 'Das Format ist fehlerhaft.')
      .max(5, 'Das Format ist fehlerhaft.')
      .required('Postleitzahl ist erforderlich'),
    city: yup.string('Geben Sie den Ort ein.').required('Adresse ist erforderlich'),
    street: yup.string('Geben Sie den Straßennamen ein.').required('Straße ist erforderlich'),
    streetNumber: yup
      .number('Geben Sie die Hausnummer ein.')
      .typeError('Die Hausnummer muss eine Zahl sein.')
      .required('Hausnummer erforderlich'),
  }),
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
  const { shopData, changed } = useSelector((state) => ({ shopData: state.shop.shop, changed: state.mode.changed }));
  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { handleSubmit, reset, ...methods } = useForm({
    mode: 'onChange',
    defaultValues: shopData,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const promise = dispatch(fetchShop());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = async (event) => {
    setDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    setSaving(true);
    await dispatch(updateShop(data));
    reset(data);
    setSaving(false);
  };

  return dataLoaded ? (
    <Box sx={{ p: 3, pt: 0 }} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />
      <FormProvider {...{ handleSubmit, reset, ...methods }}>
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
              onClick={() => {
                if (changed) {
                  setDialogOpen(true);
                }
              }}
              disabled={!changed}
            >
              Speichern
            </Button>
          </Box>
        </Box>

        <Paper sx={{ position: 'relative', overflow: 'hidden' }} elevation={2}>
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
                  href={`${process.env.REACT_APP_WEBSITE_URL}/${shopData.shopId}/${shopData.name.replaceAll(' ', '-')}`}
                  target="_blank"
                  underline="hover"
                >
                  www.{process.env.REACT_APP_WEBSITE_NAME}.de/{shopData.shopId}/{shopData.name.replaceAll(' ', '-')}
                </Link>
              </Box>
            </Box>
            <ShopForm />
          </Box>
        </Paper>
      </FormProvider>
      <AlertDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Änderungen speichern?"
        message="Sind Sie sicher, dass Sie Ihre Änderungen speichern wollen?"
        loading={saving}
        TransitionProps={{
          onExited: () => {
            setSaving(false);
          },
        }}
      />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default Shop;
