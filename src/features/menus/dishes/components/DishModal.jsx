import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories, selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { createDish, updateDish } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormSelectField from 'common/components/form/FormSelectField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import FormMultiSelectLabel from 'common/components/form/FormMultiSelectLabel';

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

const types = [
  'Fleischgericht',
  'Fischgericht',
  'Burger',
  'Pizza',
  'Asiatisch',
  'Sushi',
  'Mexikanisch',
  'Indisch',
  'Suppe',
  'Backware',
  'Wrap',
  'Salat',
  'Döner',
  'Vorspeise',
  'Nudelgericht',
  'Finger Food',
  'Süßspeise',
  'Kartoffelgericht',
  'Humus',
  'Falafel',
  'BBQ',
];
const labels = ['Vegetarisch', 'Vegan', 'Halal', 'Glutenfrei'];

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  price: yup
    .string('Geben Sie einen Preis ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')
    .required('Preis ist erforderlich.'),
  type: yup
    .string('Wählen Sie einen Typen aus.')
    .oneOf(types, 'Type muss aus der vorgegeben Liste ausgewählt werden')
    .required('Typ ist erforderlich'),
  available: yup
    .boolean('Geben Sie an, ob die Speise verfügbar ist.')
    .required('Angabe der Verfügbarkeit ist erforderlich'),
});

function DishModal({ open, onClose, dish }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  const affectedCategories = useSelector((state) => selectAffectedCategories(state, dish ? dish.id : null));
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      desc: '',
      type: 'Burger',
      available: true,
      price: '0,00',
      categories: [],
      tags: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (dish) {
      setValue('name', dish.name);
      setValue('desc', dish.desc);
      setValue('type', dish.type);
      setValue('available', dish.available);
      setValue('price', dish.price);
      setValue('categories', affectedCategories);
      setValue('tags', dish.tags);
    }
  }, [open, dish, affectedCategories, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    data.categories = data.categories.map((item) => item[0]);
    if (!dish) {
      data.id = nanoid();
      dispatch(createDish(data));
    } else {
      dispatch(updateDish({ ...dish, ...data }));
    }

    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Speise erstellen
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormSelectField name="type" label="Typ" items={types} control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormPriceField name="price" label="Preis" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormMultiSelectLabel name="tags" label="Tag" items={labels} control={control} />
            </Grid>
            <Grid item>
              <FormMultiSelectGroup
                name="categories"
                group="Kategorien"
                label="Zur Kategorie hinzufügen"
                items={categoryIdsToNames}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormCheckboxField name="available" label="Verfügbar" control={control} />
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

export default DishModal;
