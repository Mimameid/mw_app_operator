import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useController } from 'react-hook-form';
import { queryPredictions } from 'features/shop/location/actions';

import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from '@mui/material';
import AutocompleteDropdown from './AutocompleteDropdown';
import { Close } from '@mui/icons-material';

function Autocomplete({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [value, setValue] = useState(inputProps.value.address);
  const [open, setOpen] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
    dispatch(queryPredictions(event.target.value));
  };

  const onBlur = (e) => {
    setValue(inputProps.value.address);
    setOpen(false);
  };

  const selectHandler = (data) => {
    inputProps.onChange(data);
    setValue(data.address);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onBlur} mouseEvent="onMouseDown">
      <Box ref={containerRef} style={{ position: 'relative' }} width={'100%'}>
        <TextField
          inputRef={ref}
          inputProps={{ spellCheck: 'false', style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }}
          autoComplete="new-password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={() => {
            setOpen(true);
          }}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton
          //         aria-label="toggle password visibility"
          //         // onClick={handleClickShowPassword}
          //         // onMouseDown={handleMouseDownPassword}s

          //         edge="end"
          //       >
          //         <Close />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
        <AutocompleteDropdown open={open} onSelect={selectHandler} />
      </Box>
    </ClickAwayListener>
  );
}

export default Autocomplete;
