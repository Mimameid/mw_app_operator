import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  minimumOrderValueInput: {
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

function MinimumOrderValueInput({ setMinimumOrderValue, minimumOrderValue }) {
  const classes = useStyles();
  const [orderValue, setOrderValue] = useState(minimumOrderValue);

  const onChangeOrderValue = (event) => {
    let value = event.target.value;
    if (!value) {
      setOrderValue(0);
      setMinimumOrderValue(0);
    }

    value = Number(value);
    if (value > -1 && value < 100) {
      setOrderValue(value);
      setMinimumOrderValue(value);
    }
  };

  return (
    <TextField
      className={classes.minimumOrderValueInput}
      size="small"
      value={orderValue}
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
