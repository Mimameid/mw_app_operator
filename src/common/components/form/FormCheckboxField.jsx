import React from 'react';
import { useController } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@material-ui/core';

function FormCheckboxField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return (
    <FormControlLabel control={<Checkbox color="primary" checked={inputProps.value} {...inputProps} />} {...props} />
  );
}

export default FormCheckboxField;
