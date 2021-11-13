import React from 'react';
import { useController } from 'react-hook-form';

import { Box, Collapse } from '@mui/material';
import { Alert } from '@mui/material';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormTimeField from 'common/components/form/FormTimeField';

function FormTimeRange({ control, isAllDay }) {
  const {
    fieldState: { error },
  } = useController({
    name: 'timeRange',
    control,
  });

  return (
    <Box display="flex" flexDirection="column" p={2} justifyContent="space-between">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" fontWeight={600}>
          Uhrzeit*
        </Box>
        <Box display="flex" mr={-2}>
          <FormCheckboxField name="isAllDay" label="Ganztags" control={control} size="small" />
        </Box>
      </Box>
      <Collapse in={!isAllDay}>
        <Box display="flex" pt={1} justifyContent="flex-end">
          <Box width={60} px={1}>
            <FormTimeField name="timeRange.startTime" label="Start" control={control} size="small" />
          </Box>
          <Box alignSelf="flex-end" pb={1}>
            -
          </Box>
          <Box width={52} pl={1}>
            <FormTimeField name="timeRange.endTime" label="Ende" control={control} size="small" />
          </Box>
        </Box>
        <Box pt={2}>
          <Collapse in={error}>
            {error ? <Alert severity="error">{'Zeiten fehlerhaft: ' + error.message} </Alert> : null}
          </Collapse>
        </Box>
      </Collapse>
    </Box>
  );
}

export default FormTimeRange;
