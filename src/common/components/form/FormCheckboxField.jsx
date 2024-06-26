import React from 'react';
import { useController } from 'react-hook-form';

import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';

function FormCheckboxField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <FormControlLabel
        control={<Checkbox color="primary" checked={inputProps.value} {...inputProps} {...props} />}
        {...props}
      />
      <FormHelperText error={error}>{error ? error.message : null}</FormHelperText>
    </FormControl>
  );
}

export default FormCheckboxField;
