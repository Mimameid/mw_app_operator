import React, { useEffect, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChoice,
  makeSelectAffectedDishes,
  removeChoice,
  selectDishIdsToNames,
} from 'features/menus/dishes/dishesSlice';
import { createChoice, editChoice } from '../choicesSlice';
import { selectSubIdsToNames } from 'features/menus/subs/subsSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormSelectField from 'common/components/form/FormSelectField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';

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
  header: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  buttonLayout: {
    marginTop: '30px',
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
  minRequired: yup.string('Geben Sie an, wieviele Optionen verpflichtend sind.').required('Angabe ist erforderlich.'),
  maxAllowed: yup
    .string('Geben Sie an, wieviele Optionen erlaubt sind.')
    .test(
      'maxAllowed',
      'Die maximal erlaubten Optionen muss mindestens so groß sein wie die minimal erlaubten Optionen.',
      function (value) {
        return value >= this.parent.minRequired;
      },
    )
    .required('Angabe ist erforderlich.'),
});

function ChoiceModal({ open, onClose, choice }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  const affectedDishes = useSelector((state) => selectAffectedDishes(state, choice ? choice.id : null));
  const dishIdsToNames = useSelector(selectDishIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      minRequired: 1,
      maxAllowed: 1,
      dishes: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (choice) {
      setValue('name', choice.name);
      setValue('desc', choice.desc);
      setValue('minRequired', choice.minRequired);
      setValue('maxAllowed', choice.maxAllowed);
      setValue('dishes', affectedDishes);
    }
  }, [open, choice, affectedDishes, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!choice) {
      data.id = nanoid(12);
      dispatch(createChoice(data));
    } else {
      data.id = choice.id;
      dispatch(editChoice(data));

      for (let dishIdToName of affectedDishes) {
        dispatch(removeChoice({ choiceId: data.id, dishId: dishIdToName[0] }));
      }
    }

    for (let dishIdToName of data.dishes) {
      dispatch(addChoice({ choiceId: data.id, dishId: dishIdToName[0] }));
    }
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Optiongruppe erstellen
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container className={classes.form} spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormSelectField
                name="minRequired"
                label="Minimal Erforderlich"
                items={['0', '1', '2', '3', '4', '5', '6']}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormSelectField
                name="maxAllowed"
                label="Maximal Erlaubt"
                items={['1', '2', '3', '4', '5', '6', 'Keine Einschränkung']}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormMultiSelectGroup
                name="dishes"
                group="Speisen"
                label="Zur Speise hinzufügen"
                items={dishIdsToNames}
                control={control}
                fullWidth
              />
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

export default ChoiceModal;
