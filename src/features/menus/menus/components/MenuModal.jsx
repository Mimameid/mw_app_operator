import React, { useEffect } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch } from 'react-redux';
import { createMenu, updateMenu } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },

  formContainer: {
    position: 'absolute',
    width: '432px',
    left: '50%',
    top: '50%',
    padding: theme.spacing(4),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },

  header: {
    paddingBottom: theme.spacing(2),
  },

  buttonLayout: {
    marginTop: theme.spacing(3),
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
});

function MenuModal({ open, onClose, menu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      desc: '',
      active: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (menu) {
      setValue('name', menu.name);
      setValue('desc', menu.desc);
    }
  }, [open, menu, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!menu) {
      dispatch(createMenu(data));
    } else {
      dispatch(updateMenu({ ...menu, ...data }));
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
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormTextField fullWidth name="name" label="Name" control={control} />
            </Grid>
            <Grid item>
              <FormTextField fullWidth name="desc" label="Beschreibung" control={control} />
            </Grid>
            <Grid className={classes.buttonLayout} container item justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleClose}>
                  Abbrechen
                </Button>
              </Grid>
              <Grid item>
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
