import React from 'react';

import { useDispatch } from 'react-redux';
import { editDish } from '../dishesSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormSelectField from 'common/components/form/FormSelectField';

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

const types = [
  'Burger',
  'Pizza',
  'Fleischgericht',
  'Fischgericht',
  'Salat',
  'Döner',
  'Vorspeise',
  'Nudelgericht',
  'Finger Food',
  'Süßspeisen',
  'Kartoffelgericht',
  'Humus',
];
const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  description: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
  price: yup
    .string('Geben Sie einen Preis ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')

    .required('Preis ist erforderlich.'),
  type: yup
    .string('Wählen Sie einen Typen aus.')
    .oneOf(types, 'Type muss aus der vorgegeben Liste ausgewählt werden')
    .required('Typ ist erforderlich'),
});

function EditDishModal({ open, setOpen, dish }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: dish.name,
      description: dish.desc,
      type: dish.type,
      price: dish.price,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    data.id = dish.id;
    dispatch(editDish(data));
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Speise bearbeiten
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.form} spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormTextField name="description" label="Beschreibung" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormSelectField name="type" label="Typ" items={types} control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormPriceField name="price" label="Preis" control={control} fullWidth />
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

export default EditDishModal;
