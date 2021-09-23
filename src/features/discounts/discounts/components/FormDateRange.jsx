import React, { useRef, useState } from 'react';

import { Box, ClickAwayListener, Collapse, makeStyles, Paper, useTheme } from '@material-ui/core';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormDateField from 'common/components/form/FormDateField';

const useStyles = makeStyles((theme) => ({
  calendarRoot: {
    position: 'absolute',
    left: '50%',

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
  },
}));

function FormDateRange({ control, repeating, setValue }) {
  const classes = useStyles();
  const theme = useTheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const [rangeSelection, setRangeSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
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
      <Box display="flex" flexDirection="column" p={2} justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" fontWeight={600}>
            Zeitraum
          </Box>
          <Box display="flex" mr={-2}>
            <FormCheckboxField name="repeating" label="Wiederkehrend" control={control} size="small" />
          </Box>
        </Box>

        <Collapse in={!repeating}>
          <Box display="flex" pt={1} justifyContent="flex-end">
            <Box width={90} px={1}>
              <FormDateField
                className={classes.textField}
                name={'date.startDate'}
                label="Start"
                control={control}
                inputProps={{ className: classes.inputStyle }}
                size="small"
                onClick={(e) => {
                  setShowCalendar(!showCalendar);
                }}
                disabled
              />
            </Box>
            <Box alignSelf="flex-end" pb={1}>
              -
            </Box>
            <Box width={82} pl={1}>
              <FormDateField
                className={classes.textField}
                name={'date.endDate'}
                label="Ende"
                control={control}
                inputProps={{ className: classes.inputStyle }}
                size="small"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                }}
                disabled
              />
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
                    minDate={new Date()}
                    showDateDisplay={false}
                    rangeColors={[theme.palette.primary.main]}
                    color={theme.palette.primary.main}
                  />
                </Paper>
              </Box>
            </ClickAwayListener>
          ) : null}
        </Collapse>
      </Box>
    </React.Fragment>
  );
}

export default FormDateRange;
