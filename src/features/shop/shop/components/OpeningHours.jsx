import React, { useState } from 'react';
import { weekdays } from 'common/constants';

import { Box, makeStyles } from '@material-ui/core';
import OpeningHoursModal from './OpeningHoursModal';
import { useController } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: theme.spacing(2),

    border: '1px solid #00000023',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
  },
  label: {
    position: 'absolute',
    top: '-10px',
    left: '10px',
    padding: '0 4px',

    backgroundColor: 'white',
  },
}));

function OpeningHours({ control, name }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Box className={classes.container} display="flex" flexDirection="column">
      <Box color="text.secondary" fontSize="caption.fontSize" className={classes.label}>
        Öffnungszeiten
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {Object.keys(weekdays).map((key) => (
          <Box key={key} display="flex" p={0.5}>
            <Box flexBasis="50%" fontSize="h6.fontSize">
              {weekdays[key]}
            </Box>
            <Box display="flex" flexDirection="column" fontSize="body1.fontSize">
              {inputProps.value[key].length > 0 ? (
                inputProps.value[key].map((range, index) => (
                  <Box key={index} display="flex" justifyContent="space-around" px={1} pt={0.6}>
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
      <OpeningHoursModal open={modalOpen} onClose={() => setModalOpen(false)} onChange={inputProps.onChange} />
    </Box>
  );
}

export default OpeningHours;
