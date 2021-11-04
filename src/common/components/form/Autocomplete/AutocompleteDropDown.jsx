/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { queryPlace } from 'features/shop/slices/location/actions';

import { Grid, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

function AutocompleteDropDown({ open, onSelect }) {
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state.shop.location.predictions);

  const handleClickPrediction = (item) => {
    dispatch(queryPlace(item));
    onSelect();
  };

  let content = null;

  if (open) {
    content = (
      <div
        sx={{
          width: '100%',
          position: 'absolute',
          zIndex: '2000',

          borderRadius: '0 0 4px 4px !important',
          borderTop: (theme) => `2px solid ${theme.palette.primary.main}`,
          boxShadow:
            '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
          background: 'white',
          '& ul': {
            listStyleType: 'none',
            margin: 0,
            padding: '0',
            borderRadius: '0 0 4px 4px',
          },
          '& li': {
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            cursor: 'pointer',
            overflow: 'hidden',

            '&:last-child': {
              borderBottom: 'none',
            },
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
            '& > div': {
              padding: '4px 10px 4px 10px',
            },
          },
        }}
      >
        <ul>
          {predictions.length && predictions
            ? predictions.map((item, index) => {
                return (
                  <li key={index} onClick={() => handleClickPrediction(item)}>
                    <Grid container alignItems="center" wrap="nowrap">
                      <Grid item style={{ marginRight: '14px' }}>
                        <RoomIcon />
                      </Grid>
                      <Grid sx={{ overflow: 'hidden' }} item style={{ maxWidth: '90%' }}>
                        <Typography
                          variant="body1"
                          style={{ fontSize: '1rem', wordBreak: 'normal', whiteSpace: 'normal' }}
                        >
                          {item.structured_formatting.main_text}
                        </Typography>
                        <Typography
                          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                          variant="body2"
                          color="textSecondary"
                        >
                          {item.structured_formatting.secondary_text.substring(
                            0,
                            item.structured_formatting.secondary_text.lastIndexOf(','),
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }

  return content;
}

export default AutocompleteDropDown;
