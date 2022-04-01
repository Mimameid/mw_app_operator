import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, IconButton, Switch } from '@mui/material';
import FormTimeField from 'common/components/form/FormTimeField';
import { Add, Delete } from '@mui/icons-material';

function Weekday({ weekday, weekdayName }) {
  const { control, formState, trigger } = useFormContext();

  const fieldArray = useFieldArray({
    control,
    name: 'openingHours.' + weekday,
  });

  const error = formState.errors.openingHours?.[weekday];
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          minHeight: 64,
          p: 2,
        }}
      >
        <Box
          sx={{
            flexBasis: '28%',
            flexGrow: 0,
            flexShrink: 0,
            fontSize: 'h6.fontSize',
            color: error ? 'error.main' : 'text.primary',
          }}
        >
          {weekdayName}
        </Box>
        <Box sx={{ pt: 0.5 }}>
          <Switch
            size="small"
            color="primary"
            name={weekday}
            checked={fieldArray.fields.length > 0}
            onChange={async (event) => {
              if (event.target.checked) {
                fieldArray.append({ start: '10:00', end: '18:00' });
              } else {
                fieldArray.replace([]);
              }
              trigger('openingHours');
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" alignSelf="center">
          {fieldArray.fields.length > 0 ? (
            fieldArray.fields.map((field, index) => (
              <Box key={field.id}>
                <Box display="flex" justifyContent="space-between">
                  <Box
                    sx={{
                      display: 'flex',
                      flexBasis: '80%',
                      flexGrow: 0,
                      flexShrink: 0,
                      justifyContent: 'space-between',
                      pr: 1,
                      pl: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexBasis: '38%',
                        flexGrow: 0,
                        flexShrink: 0,

                        pr: 1,
                        pl: 1,

                        fontSize: 'body1.fontSize',
                      }}
                    >
                      <FormTimeField
                        name={`openingHours.${weekday}[${index}].start`}
                        control={control}
                        onChange={() => {
                          trigger('openingHours.' + weekday);
                        }}
                      />
                    </Box>
                    <Box alignSelf="center" fontSize="body1.fontSize" pr={1} pl={1}>
                      -
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexBasis: '38%',
                        flexGrow: 0,
                        flexShrink: 0,

                        pr: 1,
                        pl: 1,

                        fontSize: 'body1.fontSize',
                      }}
                    >
                      <FormTimeField
                        name={`openingHours.${weekday}[${index}].end`}
                        control={control}
                        onChange={() => {
                          trigger('openingHours.' + weekday);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexBasis="20%" flexGrow={0} flexShrink={0}>
                    <Box alignSelf="center" fontSize="body1.fontSize">
                      <IconButton
                        size="small"
                        onClick={() => {
                          fieldArray.remove(index);
                          trigger('openingHours.' + weekday);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    {index === fieldArray.fields.length - 1 && fieldArray.fields.length < 3 ? (
                      <Box alignSelf="center" fontSize="body1.fontSize">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            fieldArray.append({ start: '10:00', end: '18:00' });
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box>Geschlossen</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Weekday;
