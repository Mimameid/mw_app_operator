import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveBusinessHours } from 'features/restaurant/slices/restaurant';

import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, IconButton, Modal, Paper, Switch, makeStyles, Button, Grid, Divider, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import TimeField from 'react-simple-timefield';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: 'absolute',
    width: '460px',
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

const weekdays = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
};

const weekdaySchema = yup
  .array(yup.object({ open: yup.string().required(), close: yup.string().required() }))
  .test('business hours test', 'Die angegebenen Zeiten überschneiden sich.', function () {
    for (let range of this.originalValue) {
      const timeOpen = range.open.substring(0, 2) + range.open.substring(3, 5);
      const timeClose = range.close.substring(0, 2) + range.close.substring(3, 5);
      if (timeOpen >= timeClose) {
        console.log(range);

        return false;
      }
      for (let otherRange of this.originalValue) {
        const otherTimeOpen = otherRange.open.substring(0, 2) + otherRange.open.substring(3, 5);
        const otherTimeClose = otherRange.close.substring(0, 2) + otherRange.close.substring(3, 5);
        if (
          (timeOpen > otherTimeOpen && timeOpen < otherTimeClose) ||
          (timeClose > otherTimeOpen && timeClose < otherTimeClose)
        ) {
          console.log(range);
          return false;
        }
      }
    }
    return true;
  });
const schema = yup.object({
  monday: weekdaySchema,
  tuesday: weekdaySchema,
  wednesday: weekdaySchema,
  thursday: weekdaySchema,
  friday: weekdaySchema,
  saturday: weekdaySchema,
  sunday: weekdaySchema,
});

function BusinessHoursModal({ open, onClose, businessHours }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState(
    businessHours ?? {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues: businessHours ?? {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  });

  const fieldArrays = {};
  for (let weekday of Object.keys(weekdays)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fieldArrays[weekday] = useFieldArray({
      control,
      name: weekday,
    });
  }

  const onActivate = (event) => {
    if (event.target.checked) {
      state[event.target.name].push({ open: '00:00', close: '00:00' });
    } else {
      state[event.target.name] = [];
    }

    setState({ ...state });
  };

  const addBusinessHours = (weekday) => {
    state[weekday].push({ open: Date.now(), close: Date.now() });
    setState({ ...state });
  };
  const removeBusinessHours = (weekday, index) => {
    state[weekday].splice(index, 1);
    setState({ ...state });
  };

  const onTimeChange = (weekday, index, time, open) => {
    open = open ? 'open' : 'close';
    state[weekday][index][open] = time;
    setState({ ...state });
  };

  const onSubmit = () => {
    // check validity
    schema.validate(state).catch(function (err) {
      console.log(err);
    });
    dispatch(saveBusinessHours(state));
  };

  return (
    <Modal className={classes.backdrop} open={open} onClose={onClose}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Öffnungszeiten
        </Box>
        <Box className={classes.listContainer}>
          {Object.keys(weekdays).map((weekday) => (
            <React.Fragment key={weekday}>
              <Box display="flex" p={1}>
                <Box flexBasis="28%" flexGrow={0} flexShrink={0} fontSize="h6.fontSize">
                  {weekdays[weekday]}
                </Box>
                <Box pr={1} pl={1}>
                  <Switch
                    size="small"
                    color="primary"
                    name={weekday}
                    checked={state[weekday].length > 0}
                    onChange={onActivate}
                  />
                </Box>
                <Box display="flex" flexDirection="column" alignSelf="center">
                  {state[weekday].length > 0 ? (
                    state[weekday].map((opening_hours, index) => (
                      <Box key={weekday + index} display="flex" justifyContent="space-between">
                        <Box
                          display="flex"
                          flexBasis="80%"
                          flexGrow={0}
                          flexShrink={0}
                          justifyContent="space-between"
                          pr={1}
                          pl={1}
                        >
                          <Box
                            flexBasis="38%"
                            flexGrow={0}
                            flexShrink={0}
                            alignSelf="center"
                            fontSize="body1.fontSize"
                            pr={1}
                            pl={1}
                          >
                            <TimeField
                              value={0}
                              onChange={(event, value) => onTimeChange(weekday, index, value, true)}
                              input={
                                <TextField
                                  value={state[weekday][index].open}
                                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                />
                              }
                            />
                          </Box>
                          <Box alignSelf="center" fontSize="body1.fontSize" pr={1} pl={1}>
                            -
                          </Box>
                          <Box
                            flexBasis="38%"
                            flexGrow={0}
                            flexShrink={0}
                            alignSelf="center"
                            fontSize="body1.fontSize"
                            pr={1}
                            pl={1}
                          >
                            <TimeField
                              value={0}
                              onChange={(event, value) => onTimeChange(weekday, index, value, false)}
                              input={
                                <TextField
                                  value={state[weekday][index].close}
                                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                />
                              }
                            />
                          </Box>
                        </Box>
                        <Box display="flex" flexBasis="20%" flexGrow={0} flexShrink={0}>
                          <Box alignSelf="center" fontSize="body1.fontSize">
                            <IconButton size="small" onClick={() => removeBusinessHours(weekday, index)}>
                              <Delete />
                            </IconButton>
                          </Box>
                          {index === state[weekday].length - 1 && state[weekday].length < 3 ? (
                            <Box alignSelf="center" fontSize="body1.fontSize">
                              <IconButton size="small" color="primary" onClick={() => addBusinessHours(weekday)}>
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box>Geschlossen</Box>
                  )}
                </Box>
              </Box>
              <Divider />
            </React.Fragment>
          ))}

          <Grid className={classes.buttonLayout} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={onClose}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" onClick={onSubmit}>
                Speichern
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
}

export default BusinessHoursModal;
