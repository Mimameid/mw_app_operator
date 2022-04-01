import React from 'react';

import { useFormContext } from 'react-hook-form';
import { weekdays } from 'common/constants';
import { sortWeekdayRanges, getOpeningHoursErrorMessage } from '../utils';

import { Box, Button, Grid, Divider, Dialog, Alert, Collapse } from '@mui/material';
import Weekday from './Weekday';

function OpeningHoursModal({ open, onClose }) {
  const { formState, getValues, trigger } = useFormContext();

  const openingHours = getValues('openingHours');
  const error = getOpeningHoursErrorMessage(formState.errors.openingHours);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '460px',
          p: 4,
        },
      }}
      scroll="body"
      open={open}
      onClose={null}
      TransitionProps={{
        onExited: () => {
          sortWeekdayRanges(openingHours);
          trigger('openingHours');
        },
      }}
    >
      <Box sx={{ pb: 2 }} fontSize={'h5.fontSize'} color="primary.main">
        Öffnungszeiten
      </Box>
      <Box>
        {Object.keys(weekdays).map((weekday) => (
          <React.Fragment key={weekday}>
            <Weekday weekday={weekday} weekdayName={weekdays[weekday]} />
            {weekday === 'sunday' ? null : <Divider />}
          </React.Fragment>
        ))}

        <Alert
          sx={{
            mt: 2,
          }}
          severity={error ? 'error' : 'info'}
        >
          <Collapse in={true}>
            {error
              ? 'Zeiten fehlerhaft: ' + error
              : 'Achten Sie bitte darauf, dass die Zeiten sich nicht überschneiden.'}
          </Collapse>
        </Alert>
        <Grid sx={{ mt: 2 }} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                onClose();
              }}
            >
              Übernehmen
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default OpeningHoursModal;
