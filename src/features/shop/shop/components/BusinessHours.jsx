import React, { useState } from 'react';
import { weekdays } from '../constants';

import { Box, makeStyles } from '@material-ui/core';
import BusinessHoursModal from './BusinessHoursModal';
import { useSelector } from 'react-redux';

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

function OpeningHours() {
  const classes = useStyles();
  const openingHours = useSelector((state) => state.shop.shop.openingHours);
  const [modalOpen, setModalOpen] = useState(false);

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
            <Box fontSize="body1.fontSize">
              {openingHours[key].length > 0 ? (
                openingHours[key].map((range, index) => (
                  <Box key={index} display="flex" justifyContent="space-around" px={1}>
                    <Box>{range.start}</Box>
                    <Box px={1}>-</Box>
                    <Box>{range.end}</Box>
                  </Box>
                ))
              ) : (
                <Box px={1}>Geschlossen</Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <BusinessHoursModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}

export default OpeningHours;
