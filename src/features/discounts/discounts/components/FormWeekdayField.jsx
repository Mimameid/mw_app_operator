import React from 'react';
import { useController } from 'react-hook-form';
import { weekdays } from 'common/constants';

import { Box } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

function FormWeekdayField({ name, control, setValue }) {
  const handleValues = (event, newValues) => {
    setValue('weekdays', newValues);
  };

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" p={2} justifyContent="space-between">
        <Box display="flex" alignItems="center" fontWeight={600}>
          Wochentage
        </Box>
        <Box display="flex" pt={1} justifyContent="flex-end">
          <ToggleButtonGroup value={inputProps.value} onChange={handleValues}>
            {Object.keys(weekdays).map((day, index) => {
              return (
                <ToggleButton
                  key={index}
                  sx={{
                    width: (theme) => theme.spacing(4),
                    height: (theme) => theme.spacing(4),

                    border: 'none',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      opacity: 0.9,
                      color: 'common.white',
                    },
                    '&:hover': {
                      background: 'none',
                    },
                    '&:not(:first-of-type)': {
                      borderRadius: (theme) => theme.shape.borderRadius,
                    },
                    '&:first-of-type': {
                      borderRadius: (theme) => theme.shape.borderRadius,
                    },
                  }}
                  value={day}
                  disableRipple
                  disableFocusRipple
                >
                  {day[0]}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default FormWeekdayField;
