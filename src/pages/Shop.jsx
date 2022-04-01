import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, updateShop } from 'features/shop/shop/actions';
import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShopSchema } from 'features/shop/shop/schema';

import { Box, Button, Link, Paper, Toolbar, Avatar } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';

import { CloudUpload } from '@mui/icons-material';
import ShopForm from 'features/shop/shop/components/ShopForm';
import AlertDialog from 'common/components/feedback/AlertDialog';
import { isAddressValid } from 'features/shop/shop/utils';

function Shop({ name }) {
  const dispatch = useDispatch();
  const { shopData, changed } = useSelector((state) => ({ shopData: state.shop.shop, changed: state.mode.changed }));
  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [locationInvalidDialogOpen, setLocationInvalidDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { handleSubmit, reset, formState, ...methods } = useForm({
    mode: 'onChange',
    defaultValues: JSON.parse(JSON.stringify(shopData)),
    delayError: 300,
    resolver: yupResolver(ShopSchema),
  });

  useEffect(() => {
    const promise = dispatch(fetchShop());
    promise.then(() => {
      setDataLoaded(true);
    });
  }, [dispatch]);

  const handleRejectDialog = (event) => {
    setLocationInvalidDialogOpen(false);
    setDialogOpen(false);
  };

  const handleAcceptDialog = async (event) => {
    setDialogOpen(false);
    setLocationInvalidDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    setSaving(true);
    const result = await dispatch(updateShop(data));
    if (!result.error) {
      reset(result.payload.data);
    }
    setSaving(false);
  };

  const error = formState.errors.openingHoursError?.message;
  const isValid = formState.isValid;

  return dataLoaded ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3, pt: 0 }}>
      <Toolbar />
      <FormProvider {...{ handleSubmit, reset, formState, ...methods }}>
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
              onClick={async () => {
                if (changed) {
                  const { location } = methods.getValues();
                  const isValid = await isAddressValid(location);

                  if (isValid) {
                    setDialogOpen(true);
                  } else {
                    setLocationInvalidDialogOpen(true);
                  }
                }
              }}
              disabled={!changed || !isValid || error}
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
              {methods.getValues('location.street')}&nbsp;
              {methods.getValues('location.number')} <br />
              {methods.getValues('location.postCode')}&nbsp;
              {methods.getValues('location.city')} <br />
            </Box>
            Die angegebene Adresse scheint ungültig zu sein. Sind sie sicher, dass die Angaben korrekt sind?
          </Box>
        }
        rejectText={'Zurück'}
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
