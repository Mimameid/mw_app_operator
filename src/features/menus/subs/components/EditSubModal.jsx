import React from 'react';

import { useDispatch } from 'react-redux';
import { editSub } from '../subsSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';

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
    padding: '20px',
  },
  buttonLayout: {
    marginTop: '30px',
  },
}));

const types = ['Extras', 'Menüauswahl', 'Beilage'];
const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  price: yup
    .string('Geben Sie einen Preis ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')
    .required('Preis ist erforderlich.'),
  isSelected: yup.boolean('Geben Sie an, ob die Angabe vorausgewählt ist.').required('Angabe ist erforderlich.'),
});

function EditSubModal({ open, setOpen, sub }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: sub.name,
      price: sub.price,
      isSelected: sub.isSelected,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    data.id = sub.id;
    dispatch(editSub(data));
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Option bearbeiten
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.form} spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormPriceField name="price" label="Preis" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormCheckboxField name="isSelected" label="Vorausgewählt" items={types} control={control} />
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

export default EditSubModal;
