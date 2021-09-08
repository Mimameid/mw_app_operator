import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOpeningHours } from 'features/shop/shop/actions';
import { weekdays } from '../constants';

import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Collapse, IconButton, Modal, Paper, Switch, makeStyles, Button, Grid, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FormTimeField from 'common/components/form/FormTimeField';
import { Add, Delete } from '@material-ui/icons';

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

const weekdaySchema = yup
  .array(yup.object({ start: yup.string().required(), end: yup.string().required() }))
  .test('overlap test', 'Die angegebenen Zeiten überschneiden sich.', function () {
    for (let range of this.originalValue) {
      const timeStart = range.start.substring(0, 2) + range.start.substring(3, 5);
      let timeEnd = range.end.substring(0, 2) + range.end.substring(3, 5);

      if (timeStart >= timeEnd) {
        timeEnd = parseInt(timeEnd) + 2400;
      }

      for (let otherRange of this.originalValue) {
        const otherTimeStart = otherRange.start.substring(0, 2) + otherRange.start.substring(3, 5);
        let otherTimeEnd = otherRange.end.substring(0, 2) + otherRange.end.substring(3, 5);
        if (otherTimeStart > otherTimeEnd) {
          otherTimeEnd = parseInt(otherTimeEnd) + 2400;
        }

        if (
          (timeStart > otherTimeStart && timeStart < otherTimeEnd) ||
          (timeEnd > otherTimeStart && timeEnd < otherTimeEnd)
        ) {
          return false;
        }
      }
    }
    return true;
  })
  .test('same value test', 'Start- und Endzeit dürfen nicht identisch sein.', function () {
    for (let range of this.originalValue) {
      const timeStart = range.start.substring(0, 2) + range.start.substring(3, 5);
      let timeEnd = range.end.substring(0, 2) + range.end.substring(3, 5);
      if (timeStart === timeEnd) {
        return false;
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

function OpeningHoursModal({ open, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const openingHours = useSelector((state) => state.shop.shop.openingHours);

  const { handleSubmit, control, formState, setValue, clearErrors } = useForm({
    mode: 'onBlur',
    defaultValue: openingHours,
    resolver: yupResolver(schema),
  });

  const fieldArrays = {};
  for (let weekday of Object.keys(weekdays)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fieldArrays[weekday] = useFieldArray({
      control,
      name: weekday,
    });
  }

  const onSubmit = (data) => {
    dispatch(saveOpeningHours(data));
    onClose();
  };

  const error = Object.entries(formState.errors)[0];
  return (
    <Modal className={classes.backdrop} open={open} onClose={null}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          Öffnungszeiten
        </Box>
        <Box className={classes.listContainer}>
          {Object.keys(weekdays).map((weekday) => (
            <React.Fragment key={weekday}>
              <Box display="flex" p={2} minHeight={64}>
                <Box
                  flexBasis="28%"
                  flexGrow={0}
                  flexShrink={0}
                  fontSize="h6.fontSize"
                  color={formState.errors[weekday] ? 'error.main' : 'text.primary'}
                >
                  {weekdays[weekday]}
                </Box>
                <Box pr={1} pl={1}>
                  <Switch
                    size="small"
                    color="primary"
                    name={weekday}
                    checked={fieldArrays[weekday].fields.length > 0}
                    onChange={(event) => {
                      if (event.target.checked) {
                        fieldArrays[weekday].append({ start: '00:00', end: '00:00' });
                      } else {
                        setValue(weekday, []);
                      }
                      clearErrors(weekday);
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" alignSelf="center">
                  {fieldArrays[weekday].fields.length > 0 ? (
                    fieldArrays[weekday].fields.map((field, index) => (
                      <Box key={field.id} display="flex" justifyContent="space-between">
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
                            <FormTimeField name={`${weekday}[${index}].start`} control={control} />
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
                            <FormTimeField name={`${weekday}[${index}].end`} control={control} />
                          </Box>
                        </Box>
                        <Box display="flex" flexBasis="20%" flexGrow={0} flexShrink={0}>
                          <Box alignSelf="center" fontSize="body1.fontSize">
                            <IconButton
                              size="small"
                              onClick={() => {
                                clearErrors(weekday);
                                fieldArrays[weekday].remove(index);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                          {index === fieldArrays[weekday].fields.length - 1 &&
                          fieldArrays[weekday].fields.length < 3 ? (
                            <Box alignSelf="center" fontSize="body1.fontSize">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  clearErrors(weekday);
                                  fieldArrays[weekday].append({ start: '00:00', end: '00:00' });
                                }}
                              >
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
              {weekday === 'sunday' ? null : <Divider />}
            </React.Fragment>
          ))}

          <Alert className={classes.alert} severity={error ? 'error' : 'info'}>
            <Collapse in={true}>
              {error
                ? 'Zeiten fehlerhaft: ' + error[1].message
                : 'Achten Sie bitte darauf, dass die Zeiten sich nicht überschneiden.'}
            </Collapse>
          </Alert>

          <Grid className={classes.buttonLayout} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={onClose}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
                Speichern
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
}

export default OpeningHoursModal;
