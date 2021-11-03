import React from 'react';
import { useSelector } from 'react-redux';
import { useController } from 'react-hook-form';

import { Box, FormHelperText, Switch } from '@material-ui/core';

function FormSwitchActivateShop({ control, name, label, desc, ...props }) {
  const shop = useSelector((state) => state.shop.shop);
  const menus = useSelector((state) => state.menus.menus.byId);

  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Box>
      <Box color="text.primary" fontSize="h6.fontSize" mb={1}>
        {label}
      </Box>
      <Box color="text.secondary">{desc}</Box>
      <Box ml={-1}>
        <Switch color="primary" name={name} checked={value} {...inputProps} {...props} />
      </Box>
      <FormHelperText error={error}>{error ? error.message : null}</FormHelperText>
    </Box>
  );
}

export default FormSwitchActivateShop;
