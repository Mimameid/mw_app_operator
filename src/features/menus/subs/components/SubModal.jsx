import React, { useEffect, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSub,
  makeSelectAffectedChoices,
  removeSub,
  selectChoiceIdsToNames,
} from 'features/menus/choices/choicesSlice';
import { createSub, editSub } from '../subsSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';

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

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  price: yup
    .string('Geben Sie einen Preis ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')
    .required('Preis ist erforderlich.'),
});

function SubModal({ open, onClose, sub }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  const affectedChoices = useSelector((state) => selectAffectedChoices(state, sub ? sub.id : null));
  const choiceIdsToNames = useSelector(selectChoiceIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      price: '0,00',
      choices: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (sub) {
      setValue('name', sub.name);
      setValue('price', sub.price);
      setValue('choices', affectedChoices);
    }
  }, [open, sub, affectedChoices, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!sub) {
      data.id = nanoid(12);
      dispatch(createSub(data));
    } else {
      data.id = sub.id;
      dispatch(editSub(data));

      for (let choiceIdToName of affectedChoices) {
        dispatch(removeSub({ subId: data.id, choiceId: choiceIdToName[0] }));
      }
    }

    for (let choiceIdToName of data.choices) {
      dispatch(addSub({ subId: data.id, choiceId: choiceIdToName[0] }));
    }
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Option erstellen
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
              <FormMultiSelectGroup
                name="choices"
                gruppe="Optiongruppen"
                label="Zur Optiongruppe hinzufügen"
                items={choiceIdsToNames}
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

export default SubModal;
