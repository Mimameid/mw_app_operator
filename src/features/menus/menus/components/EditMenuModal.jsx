import React from 'react';

import { useDispatch } from 'react-redux';
import { editMenu } from '../menusSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
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
    padding: '20px',
  },
  buttonLayout: {
    marginTop: '30px',
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  description: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
});

function EditMenuModal({ open, setOpen, menu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: menu.name,
      description: menu.desc,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    dispatch(editMenu(data));
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={handleClose}>
      <Paper className={classes.formContainer}>
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

export default EditMenuModal;
