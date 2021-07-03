import React from 'react';

import { useDispatch } from 'react-redux';
import { editChoice } from '../choicesSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
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

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  description: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
  minRequired: yup
    .string('Geben Sie an, wieviele Auswahlmöglichkeiten verpflichtend sind.')
    .required('Angabe ist erforderlich.'),
  maxAllowed: yup
    .string('Geben Sie an, wieviele Auswahlmöglichkeiten erlaubt sind.')
    .test(
      'maxAllowed',
      'Die maximal erlaubten Auswahlmöglichkeiten muss mindestens so groß sein wie die minimal erlaubten Auswahlmöglichkeiten.',
      function (value) {
        return value >= this.parent.minRequired;
      },
    )
    .required('Angabe ist erforderlich.'),
});

function EditChoiceModal({ open, setOpen, choice }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: choice.name,
      description: choice.desc,
      minRequired: choice.minRequired,
      maxAllowed: choice.maxAllowed,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    data.id = choice.id;
    dispatch(editChoice(data));
    handleClose();
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Extra bearbeiten
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

export default EditChoiceModal;
