import React from 'react';
import { useController } from 'react-hook-form';
import { weekdays } from 'common/constants';

import { Box, makeStyles } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    margin: theme.spacing(0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),

    border: 'none',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.9,
      color: theme.palette.common.white,
    },
    '&:hover': {
      background: 'none',
    },
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function FormWeekdayField({ name, control, setValue }) {
  const classes = useStyles();
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
                <ToggleButton key={index} className={classes.toggleButton} value={day} disableRipple disableFocusRipple>
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
