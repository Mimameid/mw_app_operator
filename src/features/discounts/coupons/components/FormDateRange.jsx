import React, { useRef, useState } from 'react';
import { useController } from 'react-hook-form';

import { Box, ClickAwayListener, makeStyles, Paper, TextField, useTheme } from '@material-ui/core';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  calendarRoot: {
    position: 'absolute',
    left: '50%',
    bottom: '10%',

    transform: 'translateX(-50%)',
    zIndex: 1000,
    border: '1px solid grey',

    '& > div': {
      borderRadius: theme.spacing(4),
    },
    '&  .rdrDayToday > span': {
      '& :after': {
        background: theme.palette.primary.main,
      },
    },
  },
  textField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 1)',
      cursor: 'pointer',
    },
  },
  inputStyle: {
    cursor: 'pointer',
    textAlign: 'center',
  },
}));

function FormDateRange({ control, setValue }) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    field: { ref: startRef, ...startInputProps },
    fieldState: { startError },
  } = useController({
    name: 'date.startDate',
    control,
  });

  const {
    field: { ref: endRef, ...endInputProps },
    fieldState: { endError },
  } = useController({
    name: 'date.endDate',
    control,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [rangeSelection, setRangeSelection] = useState({
    startDate: new Date(startInputProps.value),
    endDate: new Date(endInputProps.value),
    key: 'selection',
  });
  const startSelected = useRef(false);

  const handleSelect = (value) => {
    setRangeSelection(value.selection);
    if (startSelected.current) {
      setValue('date.startDate', value.selection.startDate.getTime());
      setValue('date.endDate', value.selection.endDate.getTime());

      setShowCalendar(false);
      startSelected.current = false;
    }
    if (value.selection.startDate === value.selection.endDate) {
      startSelected.current = true;
    }
  };

  return (
    <React.Fragment>
      <Box className={classes.root} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" fontSize="subtitle1.fontSize" fontWeight={400}>
          Zeitraum
        </Box>
        <Box display="flex" pt={1}>
          <Box width={96} px={1}>
            <TextField
              className={classes.textField}
              label="Start"
              inputProps={{ className: classes.inputStyle }}
              size="small"
              onClick={(e) => {
                setShowCalendar(!showCalendar);
              }}
              {...startInputProps}
              error={!!startError}
              helperText={startError ? startError.message : null}
              value={new Intl.DateTimeFormat('de-DE').format(startInputProps.value)}
              disabled
            />
          </Box>
          <Box alignSelf="flex-end" pb={1}>
            -
          </Box>
          <Box width={88} pl={1}>
            <TextField
              className={classes.textField}
              label="Ende"
              inputProps={{ className: classes.inputStyle }}
              size="small"
              onClick={(e) => {
                setShowCalendar(!showCalendar);
              }}
              {...endInputProps}
              error={!!endError}
              helperText={endError ? endError.message : null}
              value={new Intl.DateTimeFormat('de-DE').format(endInputProps.value)}
              disabled
            />
          </Box>
        </Box>
      </Box>
      {showCalendar ? (
        <ClickAwayListener
          onClickAway={(e) => {
            setShowCalendar(false);
          }}
          mouseEvent="onMouseDown"
        >
          <Box>
            <Paper className={classes.calendarRoot}>
              <DateRange
                ranges={[rangeSelection]}
                onChange={handleSelect}
                showDateDisplay={false}
                rangeColors={[theme.palette.primary.main]}
                color={theme.palette.primary.main}
              />
            </Paper>
          </Box>
        </ClickAwayListener>
      ) : null}
    </React.Fragment>
  );
}

export default FormDateRange;
