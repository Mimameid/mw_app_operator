import React from 'react';

import { TextField, InputAdornment } from '@mui/material';
import DeliveryIcon from 'assets/delivery_icon.png';

function DeliveryFeeInput({ onChangeDeliveryFee, deliveryFee }) {
  return (
    <React.Fragment>
      <img src={DeliveryIcon} alt="Delivery Icon" width="18" height="18" />
      <TextField
        sx={{
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
              borderColor: (theme) => theme.palette.primary.main,

              border: '1px solid',
              borderRadius: '2px',
            },
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.primary.main,
              border: '1px solid',
              borderRadius: '2px',
            },
          },
        }}
        size="small"
        value={deliveryFee}
        onChange={onChangeDeliveryFee}
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
    </React.Fragment>
  );
}

export default DeliveryFeeInput;
