import React from 'react';
import { useSelector } from 'react-redux';
import { weekdays } from 'common/constants';
import { sortWeekdayRanges } from '../utils';

import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Collapse, IconButton, Modal, Paper, Switch, Button, Grid, Divider } from '@mui/material';
import { Alert } from '@mui/material';
import FormTimeField from 'common/components/form/discount/FormTimeField';
import { Add, Delete } from '@mui/icons-material';

const weekdaySchema = yup
  .array(yup.object({ start: yup.string().required(), end: yup.string().required() }))
  .test('same value test', 'Start- und Endzeit dürfen nicht identisch sein.', function () {
    for (let range of this.originalValue) {
      const timeStart = parseInt(range.start.replace(':', ''));
      const timeEnd = parseInt(range.end.replace(':', ''));
      if (timeStart === timeEnd) {
        return false;
      }
    }

    return true;
  })
  .test('overlap test', 'Die angegebenen Zeiten überschneiden sich.', function () {
    for (let range of this.originalValue) {
      const timeStart = parseInt(range.start.replace(':', ''));
      let timeEnd = parseInt(range.end.replace(':', ''));

      if (timeStart > timeEnd) {
        timeEnd = timeEnd + 2400;
      }
      for (let otherRange of this.originalValue) {
        if (range === otherRange) {
          continue;
        }
        const otherTimeStart = parseInt(otherRange.start.replace(':', ''));
        let otherTimeEnd = parseInt(otherRange.end.replace(':', ''));

        if (otherTimeStart > otherTimeEnd) {
          otherTimeEnd = otherTimeEnd + 2400;
        }

        if (
          (timeStart >= otherTimeStart && timeStart < otherTimeEnd) ||
          (timeEnd > otherTimeStart && timeEnd <= otherTimeEnd)
        ) {
          return false;
        }
      }
    }
    return true;
  });
// .test('overlap day', 'Zwei Tage überschneiden sich.', function () {
//   const before = dayBeforeMap[this.path];
//   let overlappingDay = null;
//   for (let range of this.parent[before]) {
//     if (range.end < range.start) {
//       overlappingDay = { start: 0, end: parseInt(range.end.replace(':', '')) };
//       break;
//     }
//   }

//   if (overlappingDay) {
//     for (let range of this.originalValue) {
//       const timeStart = parseInt(range.start.replace(':', ''));
//       let timeEnd = parseInt(range.end.replace(':', ''));

//       if (timeStart >= timeEnd) {
//         timeEnd = timeEnd + 2400;
//       }

//       if (
//         (timeStart >= overlappingDay.start && timeStart < overlappingDay.end) ||
//         (timeEnd > overlappingDay.start && timeEnd <= overlappingDay.end)
//       ) {
//         return false;
//       }
//     }
//   }
//   return true;
// });

const schema = yup.object({
  monday: weekdaySchema,
  tuesday: weekdaySchema,
  wednesday: weekdaySchema,
  thursday: weekdaySchema,
  friday: weekdaySchema,
  saturday: weekdaySchema,
  sunday: weekdaySchema,
});

function OpeningHoursModal({ open, onClose, onChange }) {
  const openingHours = useSelector((state) => state.shop.shop.openingHours);

  const { handleSubmit, control, formState, setValue } = useForm({
    mode: 'onChange',
    defaultValues: openingHours,
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
    onChange(data);
    onClose();
  };

  const error = Object.entries(formState.errors)[0];
  return (
    <Modal open={open} onClose={null}>
      <Paper
        sx={{
          position: 'absolute',
          width: '460px',
          left: '50%',
          top: '50%',
          p: 4,

          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
      >
        <Box sx={{ pb: 2 }} fontSize={'h5.fontSize'} color="primary.main">
          Öffnungszeiten
        </Box>
        <Box>
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
                <Box sx={{ pt: 0.5 }}>
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
                      // clearErrors(weekday);
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
                            <FormTimeField
                              name={`${weekday}[${index}].start`}
                              control={control}
                              onChange={sortWeekdayRanges.bind({}, fieldArrays, weekday, index)}
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
                            <FormTimeField name={`${weekday}[${index}].end`} control={control} />
                          </Box>
                        </Box>
                        <Box display="flex" flexBasis="20%" flexGrow={0} flexShrink={0}>
                          <Box alignSelf="center" fontSize="body1.fontSize">
                            <IconButton
                              size="small"
                              onClick={() => {
                                // clearErrors(weekday);
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
                                  // clearErrors(weekday);
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

          <Alert severity={error ? 'error' : 'info'}>
            <Collapse in={true}>
              {error
                ? 'Zeiten fehlerhaft: ' + error[1].message
                : 'Achten Sie bitte darauf, dass die Zeiten sich nicht überschneiden.'}
            </Collapse>
          </Alert>

          <Grid sx={{ mt: 3 }} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={onClose}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
                Übernehmen
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
}

export default OpeningHoursModal;
