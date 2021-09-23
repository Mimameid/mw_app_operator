import React from 'react';

import { TextField, InputAdornment, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  minOrderValueInput: {
    maxWidth: '36px',
    padding: '2px',
    marginLeft: 'auto',
    fontSize: '0.8rem',
    '& .MuiInputBase-input': {
      padding: '1px 2px',
    },
    '& .MuiOutlinedInput-root': {
      fontSize: '0.8rem',
      padding: '2px',

      '& fieldset': {},
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,

        border: '1px solid',
        borderRadius: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        border: '1px solid',
        borderRadius: '2px',
      },
    },
  },
}));

function MinimumOrderValueInput({ onChangeOrderValue, minOrderValue }) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.minOrderValueInput}
      size="small"
      value={minOrderValue}
      onChange={onChangeOrderValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end" style={{ marginLeft: 0 }}>
            €
          </InputAdornment>
        ),
      }}
      inputProps={{
        maxLength: 2,
        style: { textAlign: 'right' },
      }}
    />
  );
}

export default MinimumOrderValueInput;
