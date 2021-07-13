import React from 'react';
import { useController } from 'react-hook-form';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  ListItemText,
  makeStyles,
  Chip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '2px 2px 0 2px',
  },
}));

function FormMultiSelectGroup({ control, name, items, ...props }) {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // all values and current values have to be identical otherwise it will be shown as distinugish values, even though they have the same value
  inputProps.value = inputProps.value.map((item, _) => {
    for (let menuIdToName of items) {
      if (item[0] === menuIdToName[0]) {
        return menuIdToName;
      }
    }
  });

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        inputRef={ref}
        error={!!error}
        {...inputProps}
        {...props}
        multiple
        multiline
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        renderValue={(selected) => {
          return (
            <div className={classes.chips}>
              {selected.map((item, _) => {
                return <Chip className={classes.chip} key={item[0]} label={item[1]} size="small" />;
              })}
            </div>
          );
        }}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox color="primary" checked={inputProps.value.indexOf(item) > -1} />
              <ListItemText primary={item[1]} />
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            <em>Keine {props.group} vorhanden.</em>
          </MenuItem>
        )}
      </Select>
      <FormHelperText error={error}>{error ? error.message : null}</FormHelperText>
    </FormControl>
  );
}

export default FormMultiSelectGroup;
