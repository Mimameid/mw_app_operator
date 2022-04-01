import React, { useState } from 'react';
import { weekdays } from 'common/constants';
import { useFormContext } from 'react-hook-form';
import { getOpeningHoursErrorMessage } from '../utils';

import { Box, FormControl, FormHelperText } from '@mui/material';
import OpeningHoursModal from './OpeningHoursModal';

function OpeningHours() {
  const [modalOpen, setModalOpen] = useState(false);
  const { getValues, formState } = useFormContext();

  const openingHours = getValues('openingHours');
  const error = getOpeningHoursErrorMessage(formState.errors.openingHours);

  return (
    <React.Fragment>
      <FormControl variant="outlined" fullWidth>
        <Box
          sx={{
            position: 'relative',
            p: 2,

            cursor: 'pointer',
          }}
          display="flex"
          flexDirection="column"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-16px',
              left: 10,
              py: 0,
              px: 0.5,
              color: error ? 'error.main' : modalOpen ? 'primary.main' : 'text.secondary',
              fontSize: '0.75em',
              bgcolor: 'common.white',
              zIndex: 10,
            }}
          >
            Öffnungszeiten*
          </Box>
          <Box display="flex" flexDirection="column">
            {Object.keys(weekdays).map((weekday) => (
              <Box key={weekday} display="flex" p={0.5}>
                <Box flexBasis="50%" fontSize="h6.fontSize">
                  {weekdays[weekday]}
                </Box>

                <Box display="flex" flexDirection="column" fontSize="body1.fontSize">
                  {openingHours[weekday].length > 0 ? (
                    openingHours[weekday].map((range, index) => (
                      <Box key={index} weekday={index} display="flex" justifyContent="space-around" px={1} pt={0.6}>
                        <Box>{range.start}</Box>
                        <Box px={1}>-</Box>
                        <Box>{range.end}</Box>
                      </Box>
                    ))
                  ) : (
                    <Box px={1} pt={0.6}>
                      Geschlossen
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            component="fieldset"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-10px',
              bottom: 0,

              m: 0,
              px: 1,
              py: 0,

              border: (theme) =>
                error
                  ? modalOpen
                    ? '2px solid ' + theme.palette.error.main
                    : '1px solid ' + theme.palette.error.main
                  : modalOpen
                  ? '2px solid ' + theme.palette.primary.main
                  : '1px solid #00000023',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                borderColor: error || modalOpen ? null : 'text.primary',
              },
            }}
          >
            <Box
              component="legend"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75em',
              }}
            ></Box>
          </Box>
        </Box>

        {error ? <FormHelperText error>{error}</FormHelperText> : null}
      </FormControl>
      <OpeningHoursModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </React.Fragment>
  );
}

export default OpeningHours;
