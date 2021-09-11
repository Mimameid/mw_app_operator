import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedDishes, selectDishIdsToNames } from 'features/menus/dishes/slice';
import { createChoice, updateChoice } from '../actions';

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
  minRequired: yup.string('Geben Sie an, wieviele Optionen verpflichtend sind.').required('Angabe ist erforderlich.'),
  maxAllowed: yup
    .string('Geben Sie an, wieviele Optionen erlaubt sind.')
    .transform((value) => (isNaN(value) ? '-1' : value))
    .test(
      'maxAllowed',
      'Die maximal erlaubten Optionen muss mindestens so groß sein wie die minimal erlaubten Optionen.',
      function (value) {
        const valid = value > -1 ? value >= this.parent.minRequired : true;
        return valid;
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
      name: '',
      desc: '',
      minRequired: 0,
      maxAllowed: 'Keine Einschränkung',
      dishes: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (choice) {
      setValue('name', choice.name);
      setValue('desc', choice.desc);
      setValue('minRequired', choice.minRequired);
      setValue('maxAllowed', choice.maxAllowed === -1 ? 'Keine Einschränkung' : choice.maxAllowed);
      setValue('dishes', affectedDishes);
    }
  }, [open, choice, affectedDishes, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    data.dishes = data.dishes.map((item) => item[0]);
    if (!choice) {
      dispatch(createChoice(data));
    } else {
      dispatch(updateChoice({ ...choice, ...data }));
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
          <Grid container spacing={2} direction="column">
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
                items={['Keine Einschränkung', '1', '2', '3', '4', '5', '6']}
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

export default ChoiceModal;
