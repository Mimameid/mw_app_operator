import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { createShop } from 'features/shop/shop/actions';
import { CUISINE_TYPES, CUISINE_LABELS, SERVICE_TYPES } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert } from '@material-ui/lab';
import { Grid, Paper, makeStyles, Box, Typography } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import LoadingButton from 'common/components/buttons/LoadingButton';
import Autocomplete from 'features/shop/location/components/Autocomplete';
import FormMultiSelect from 'common/components/form/FormMultiSelect';
import FormSwitch from 'common/components/form/FormSwitch';
import BusinessHours from 'features/shop/shop/components/BusinessHours';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
  },
  signupContainerInner: {
    margin: 'auto',
    borderRadius: 0,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  headerContainer: {
    marginBottom: theme.spacing(8),
  },
  loginText: {
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    height: '46px',
    marginTop: theme.spacing(2),

    fontWeight: 'bold',
  },
  bottomWave: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100vw',
    pointerEvents: 'none',

    zIndex: -1,
  },
  alert: {
    marginTop: theme.spacing(-1),
  },
  [theme.breakpoints.up(600)]: {
    signupContainerInner: {
      maxWidth: '600px',
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      borderRadius: theme.shape.borderRadius,
    },
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

function SignUp({ shopRegistered }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shopData = useSelector((state) => state.shop.shop);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const { handleSubmit, control, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      url: '',
      serviceTypes: [],
      cuisineTypes: [],
      cuisineLabels: [],
      isActive: true,
      isKosher: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (shopData.location.address) {
      setValue('address', shopData.location.address);
    }
    setSelected(false);
  }, [shopData.location.address, setValue, selected]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(createShop(data));
    setLoading(false);
  };

  if (shopRegistered) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.signupContainerInner}>
        <Box className={classes.headerContainer}>
          <div>
            <Typography className={classes.loginText} variant="h4">
              Shop erstellen
            </Typography>
            <Typography variant="body2">Erstellen Sie Ihr Shop.</Typography>
          </div>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box m="auto" pb={3}>
            <Grid container direction="column" spacing={4}>
              <Grid item xs={12}>
                <Box>
                  <FormTextField name="name" label="Name*" control={control} variant="outlined" fullWidth />
                </Box>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Box>
                  <FormTextField name="url" label="URL" control={control} variant="outlined" fullWidth />
                </Box>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Box pb={1}>
                  <FormMultiSelect
                    name="cuisineLabels"
                    label="Labels"
                    items={CUISINE_LABELS}
                    control={control}
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box py={1}>
                  <FormSwitch
                    name="isKosher"
                    label="Koscher"
                    control={control}
                    desc="Geben Sie an, ob Ihre Gastronomie das Essen Koscher zubereitet."
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box pt={1}>
                  <FormSwitch
                    name="isActive"
                    label="Aktiv"
                    control={control}
                    desc="Geben Sie an, ob Ihre Gastronomie online gehen soll."
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box pt={1}>
                  <BusinessHours />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  className={classes.submitButton}
                  color="primary"
                  variant="contained"
                  type="submit"
                  loading={loading}
                  fullWidth
                >
                  Erstellen
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Alert className={classes.alert} severity="info">
                  Bitte geben Sie Ihre Shop Daten ein. Felder, die mit einem * markiert sind, sind erforderlich.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>

      <div className={classes.bottomWave}>
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
      </div>
    </div>
  );
}

export default SignUp;
