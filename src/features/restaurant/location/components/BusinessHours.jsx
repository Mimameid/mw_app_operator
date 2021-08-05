import React, { useState } from 'react';
import { weekdays } from '../constants';

import { Box, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import BusinessHoursModal from './BusinessHoursModal';

function BusinessHours({ openingHours, edit = true }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column">
        {Object.entries(openingHours).map(([key, value]) => (
          <Box display="flex" key={key} p={0.5}>
            <Box flexBasis="40%" fontSize="h6.fontSize">
              {weekdays[key]}
            </Box>
            <Box fontSize="body1.fontSize">
              {value.length > 0 ? (
                value.map((range) => (
                  <Box display="flex" justifyContent="space-around" px={1}>
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
      {edit ? (
        <React.Fragment>
          <Box>
            <IconButton onClick={() => setModalOpen(true)}>
              <Edit />
            </IconButton>
          </Box>
          <BusinessHoursModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </React.Fragment>
      ) : null}
    </Box>
  );
}

export default BusinessHours;
