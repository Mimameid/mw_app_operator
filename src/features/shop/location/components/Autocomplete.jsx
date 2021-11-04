import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useController } from 'react-hook-form';
import { queryPredictions } from 'features/shop/location/actions';

import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from '@mui/material';
import AutocompleteDropdown from './AutocompleteDropdown';
import { Close } from '@mui/icons-material';

function Autocomplete({ control, name, onSelect, ...props }) {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = useState(false);
  const onChange = (event) => {
    inputProps.onChange(event);
    dispatch(queryPredictions(event.target.value));
  };

  const onBlur = (e) => {
    onSelect();
    setOpen(false);
  };

  const selectHandler = () => {
    onSelect();
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onBlur} mouseEvent="onMouseDown">
      <Box ref={containerRef} style={{ position: 'relative' }} width={'100%'}>
        <TextField
          inputRef={ref}
          inputProps={{ spellCheck: 'false', style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }}
          autoComplete="new-password"
          {...inputProps}
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
          fullWidth
        />
        <AutocompleteDropdown open={open} onSelect={selectHandler} />
      </Box>
    </ClickAwayListener>
  );
}

export default Autocomplete;
