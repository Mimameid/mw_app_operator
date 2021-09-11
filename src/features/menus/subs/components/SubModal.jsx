import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices, selectChoiceIdsToNames } from 'features/menus/choices/slice';
import { createSub, updateSub } from '../actions';

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
      name: '',
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
    data.choices = data.choices.map((item) => item[0]);
    if (!sub) {
      dispatch(createSub(data));
    } else {
      dispatch(updateSub({ ...sub, ...data }));
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
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormPriceField name="price" label="Preis" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormMultiSelectGroup
                name="choices"
                group="Optiongruppen"
                label="Zur Optiongruppe hinzufügen"
                items={choiceIdsToNames}
                control={control}
                fullWidth
              />
            </Grid>
            <Grid className={classes.buttonLayout} container item justifyContent="flex-end" spacing={2}>
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
