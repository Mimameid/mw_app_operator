import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from 'features/user/actions';
import { hasShop } from 'features/shop/shop/actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert } from '@material-ui/lab';
import { Grid, IconButton, InputAdornment, Paper, makeStyles, Box, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FormTextField from 'common/components/form/FormTextField';
import LoadingButton from 'common/components/buttons/LoadingButton';

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative', minHeight: '100vh', width: '100vw' },
  loginOuter: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),

    transform: 'translate(-50%, -55%)',
    zIndex: 1000,
  },
  loginContainer: {
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
    width: '100vw',
    pointerEvents: 'none',

    zIndex: -1,
  },
  alert: {
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.up('sm')]: {
    loginOuter: {
      maxWidth: '600px',
    },
  },
}));

const schema = yup.object({
  email: yup.string('Geben Sie Ihren Benutzernamen ein').required('Benutzername ist erforderlich'),
  password: yup
    .string('Geben Sie Ihr Passwort ein.')
    .min(8, 'Passwort muss mind. 8 Zeichen lang sein.')
    .required('Passwort  ist erforderlich'),
});

function Login({ loggedIn }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    dispatch(login(data)).then((data) => {
      if (data.error) {
        setLoading(false);
        return;
      }
      dispatch(hasShop()).then((data) => {
        setLoading(false);
      });
    });
  };

  if (loggedIn & !loading) {
    return <Redirect to="/" />;
  }
  return (
    <div classes={classes.root}>
      <div className={classes.loginOuter}>
        <Paper className={classes.loginContainer}>
          <Box className={classes.headerContainer}>
            <div>
              <Typography className={classes.loginText} variant="h4">
                Log in
              </Typography>
              <Typography variant="body2">Loggen Sie sich in Ihre persönliche Plattform ein</Typography>
            </div>
          </Box>
          <form onSubmit={handleSubmit(submit)}>
            <Grid container className={classes.form} spacing={2} direction="column">
              <Grid item>
                <FormTextField fullWidth name="email" variant="outlined" label="Email" control={control} />
              </Grid>
              <Grid item>
                <FormTextField
                  fullWidth
                  name="password"
                  label="Passwort"
                  autoComplete="new-password"
                  variant="outlined"
                  type={showPassword ? 'password' : 'text'}
                  control={control}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <LoadingButton
                  className={classes.submitButton}
                  color="primary"
                  variant="contained"
                  type="submit"
                  loading={loading}
                  fullWidth
                >
                  Log in
                </LoadingButton>
              </Grid>
              <Grid item>
                <Alert className={classes.alert} severity="info">
                  Ihre Zugangsdaten haben Sie von uns erhalten.
                </Alert>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
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

export default Login;
