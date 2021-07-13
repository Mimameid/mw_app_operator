import React, { useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createMenu, editMenu } from '../menusSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  formContainer: {
    position: 'absolute',
    width: '300px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  form: {
    padding: '0 18px 18px 18px',
  },
  buttonLayout: {
    marginTop: '30px',
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  description: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
});

function MenuModal({ open, onClose, menu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, setValue } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });

  useEffect(() => {
    if (menu) {
      setValue('name', menu.name);
      setValue('description', menu.desc);
    }
  }, [open, menu, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!menu) {
      data.id = nanoid(12);
      dispatch(createMenu(data));
    } else {
      data.id = menu.id;
      dispatch(editMenu(data));
    }
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          {menu ? 'Menü bearbeiten' : 'Menü erstellen'}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.form} spacing={2} direction="column">
            <Grid item>
              <FormTextField fullWidth name="name" label="Name" control={control} />
            </Grid>
            <Grid item>
              <FormTextField fullWidth name="description" label="Beschreibung" control={control} />
            </Grid>
            <Grid container item className={classes.buttonLayout}>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleClose}>
                  Abbrechen
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button color="primary" variant="contained" type="submit">
                  Speichern
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
}

export default MenuModal;
