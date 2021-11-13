import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';

function FormTextField({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField inputRef={ref} {...inputProps} error={!!error} helperText={error ? error.message : null} {...props} />
  );
}

export default FormTextField;
