import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { createShop } from 'features/shop/shop/actions';
import { CUISINE_TYPES, CUISINE_LABELS } from 'common/constants';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShopSchema } from 'features/shop/shop/schema';

import { Alert, Dialog, Stack, useMediaQuery, useTheme, Box, Typography } from '@mui/material';
import AlertDialog from 'common/components/feedback/AlertDialog';
import FormTextField from 'common/components/form/FormTextField';
import LoadingButton from 'common/components/inputs/LoadingButton';
import FormMultiSelect from 'common/components/form/FormMultiSelectChip';
import FormSwitch from 'common/components/form/FormSwitch';
import OpeningHours from 'features/shop/shop/components/OpeningHours';
import { isAddressValid } from 'features/shop/shop/utils';

function SignUp({ shopRegistered }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const shopData = useSelector((state) => state.shop.shop);

  const [loading, setLoading] = useState(false);
  const [locationInvalidDialogOpen, setLocationInvalidDialogOpen] = useState(false);

  const { handleSubmit, control, getValues, formState, ...methods } = useForm({
    mode: 'onChange',
    defaultValues: shopData,
    delayError: 300,
    resolver: yupResolver(ShopSchema),
  });

  const handleRejectDialog = (event) => {
    setLocationInvalidDialogOpen(false);
  };

  const handleAcceptDialog = async (event) => {
    setLocationInvalidDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(createShop(data));
    setLoading(false);
  };

  if (shopRegistered) {
    return <Redirect to="/" />;
  }

  const { isDirty, isValid } = formState;

  return (
    <FormProvider {...{ handleSubmit, control, getValues, formState, ...methods }}>
      <Dialog open={true} hideBackdrop={true} fullScreen={small} scroll="body">
        <Box sx={{ p: 6 }}>
          <Box sx={{ mb: 8 }}>
            <div>
              <Typography variant="h4">Shop erstellen</Typography>
              <Typography variant="body2">Erstellen Sie Ihr Shop.</Typography>
            </div>
          </Box>

          <Box m="auto" pb={3}>
            <Stack spacing={4}>
              <Box>
                <FormTextField name="name" label="Name*" control={control} variant="outlined" fullWidth />
              </Box>

              <Box>
                <FormTextField
                  name="desc"
                  label="Kurzbeschreibung*"
                  placeholder="Beschreiben Sie ihr Shop kurz..."
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <FormTextField
                  name="location.postCode"
                  label="Postleitzahl*"
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <FormTextField name="location.city" label="Ort*" control={control} variant="outlined" fullWidth />
              </Box>
              <Box>
                <FormTextField name="location.street" label="Straße*" control={control} variant="outlined" fullWidth />
              </Box>
              <Box>
                <FormTextField
                  name="location.number"
                  label="Hausnummer*"
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box>
                <FormTextField
                  name="phoneNumber"
                  label="Telefonnummer*"
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box>
                <FormTextField name="url" label="URL" control={control} variant="outlined" fullWidth />
              </Box>

              <Box>
                <FormMultiSelect
                  name="cuisineTypes"
                  label="Kategorien*"
                  items={CUISINE_TYPES}
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box>
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
              </Box>

              <Box pt={1}>
                <OpeningHours />
              </Box>

              <Box pb={1}>
                <FormMultiSelect
                  name="cuisineLabels"
                  label="Labels"
                  items={CUISINE_LABELS}
                  control={control}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box py={1}>
                <FormSwitch
                  name="isKosher"
                  label="Koscher"
                  control={control}
                  desc="Geben Sie an, ob Ihr Shop das Essen Koscher zubereitet."
                />
              </Box>

              <Box py={1}>
                <FormSwitch
                  name="isLocal"
                  label="Vor Ort"
                  control={control}
                  desc="Geben Sie an, ob in Ihrem Shop vor Ort  gegessen werden kann."
                />
              </Box>

              <LoadingButton
                sx={{
                  height: '46px',
                  mt: 2,

                  fontWeight: 'bold',
                }}
                color="primary"
                variant="contained"
                onClick={async () => {
                  const { location } = getValues();
                  const isValid = await isAddressValid(location);
                  if (isValid) {
                    handleSubmit(onSubmit)();
                  } else {
                    setLocationInvalidDialogOpen(true);
                  }
                }}
                loading={loading}
                disabled={!(isValid && isDirty)}
                fullWidth
              >
                Erstellen
              </LoadingButton>
              <Alert sx={{ mt: 2 }} severity="info">
                Bitte geben Sie Ihre Shop Daten ein. Felder, die mit einem * markiert sind, sind erforderlich.
              </Alert>
            </Stack>
          </Box>
        </Box>
        <AlertDialog
          open={locationInvalidDialogOpen}
          handleReject={handleRejectDialog}
          handleAccept={handleAcceptDialog}
          title="Adresse korrekt?"
          message={
            <Box
              sx={{
                typography: 'body1',
                textAlign: 'center',
                color: 'grey.700',
              }}
            >
              <Box sx={{ py: 1, fontWeight: 'bold' }}>
                {getValues('location.street')}&nbsp;
                {getValues('location.number')} <br />
                {getValues('location.postCode')}&nbsp;
                {getValues('location.city')} <br />
              </Box>
              Die angegebene Adresse scheint ungültig zu sein. Sind sie sicher, dass die Angaben korrekt sind?
            </Box>
          }
          rejectText={'Zurück'}
          loading={loading}
          TransitionProps={{
            onExited: () => {
              setLoading(false);
            },
          }}
        />
      </Dialog>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100vw',
          pointerEvents: 'none',

          zIndex: -1,
        }}
      >
        <svg
          id="wave"
          style={{ transform: 'rotate(0deg) translate(0,5px)', transition: '0.3s' }}
          viewBox="0 0 1440 170"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(42, 157, 143, 1)" offset="0%"></stop>
              <stop stopColor="rgba(100, 207, 191, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: 'translate(0, 0px)', opacity: '1' }}
            fill="url(#sw-gradient-0)"
            d="M0,85L130.9,68L261.8,51L392.7,85L523.6,68L654.5,0L785.5,51L916.4,119L1047.3,51L1178.2,119L1309.1,68L1440,0L1570.9,68L1701.8,34L1832.7,17L1963.6,0L2094.5,136L2225.5,51L2356.4,0L2487.3,119L2618.2,102L2749.1,0L2880,119L3010.9,0L3141.8,85L3141.8,170L3010.9,170L2880,170L2749.1,170L2618.2,170L2487.3,170L2356.4,170L2225.5,170L2094.5,170L1963.6,170L1832.7,170L1701.8,170L1570.9,170L1440,170L1309.1,170L1178.2,170L1047.3,170L916.4,170L785.5,170L654.5,170L523.6,170L392.7,170L261.8,170L130.9,170L0,170Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 110, 98, 1)" offset="0%"></stop>
              <stop stopColor="rgba(100, 207, 191, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: 'translate(0, 50px)', opacity: '0.9' }}
            fill="url(#sw-gradient-1)"
            d="M0,153L130.9,0L261.8,0L392.7,34L523.6,153L654.5,136L785.5,85L916.4,119L1047.3,68L1178.2,119L1309.1,17L1440,51L1570.9,119L1701.8,102L1832.7,136L1963.6,51L2094.5,102L2225.5,119L2356.4,136L2487.3,0L2618.2,68L2749.1,102L2880,0L3010.9,68L3141.8,85L3141.8,170L3010.9,170L2880,170L2749.1,170L2618.2,170L2487.3,170L2356.4,170L2225.5,170L2094.5,170L1963.6,170L1832.7,170L1701.8,170L1570.9,170L1440,170L1309.1,170L1178.2,170L1047.3,170L916.4,170L785.5,170L654.5,170L523.6,170L392.7,170L261.8,170L130.9,170L0,170Z"
          ></path>
          <defs>
            <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(42, 157, 143, 1)" offset="0%"></stop>
              <stop stopColor="rgba(100, 207, 191, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: 'translate(0, 100px)', opacity: '0.8' }}
            fill="url(#sw-gradient-2)"
            d="M0,136L130.9,68L261.8,51L392.7,136L523.6,34L654.5,17L785.5,0L916.4,153L1047.3,119L1178.2,68L1309.1,68L1440,136L1570.9,119L1701.8,136L1832.7,102L1963.6,153L2094.5,85L2225.5,0L2356.4,17L2487.3,136L2618.2,153L2749.1,34L2880,136L3010.9,102L3141.8,17L3141.8,170L3010.9,170L2880,170L2749.1,170L2618.2,170L2487.3,170L2356.4,170L2225.5,170L2094.5,170L1963.6,170L1832.7,170L1701.8,170L1570.9,170L1440,170L1309.1,170L1178.2,170L1047.3,170L916.4,170L785.5,170L654.5,170L523.6,170L392.7,170L261.8,170L130.9,170L0,170Z"
          ></path>
        </svg>
      </Box>
    </FormProvider>
  );
}

export default SignUp;
