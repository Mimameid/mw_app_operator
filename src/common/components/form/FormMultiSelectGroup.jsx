import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, makeStyles, TextField } from '@material-ui/core';
import TruncatedChip from 'features/menus/common/components/TruncatedChip';

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
  inputProps.value = inputProps.value.map((item) => {
    for (let menuIdToName of items) {
      if (item[0] === menuIdToName[0]) {
        return menuIdToName;
      }
    }
  });

  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        value: inputProps.value,
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        },
        renderValue: (selected) => {
          return (
            <div className={classes.chips}>
              {selected.map((item, _) => {
                return <TruncatedChip className={classes.chip} key={item[0]} label={item[1]} size="small" />;
              })}
            </div>
          );
        },
      }}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
      fullWidth
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
    </TextField>
  );
}

export default FormMultiSelectGroup;
