import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Fade, Switch } from '@mui/material';
import { setDrawerOpen } from 'features/frame/actions';

function StatusSwitch({ name, enabled, onChange, captionTextOn, captionTextOff, captionTrigger }) {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.frame.drawerOpen);
  return (
    <Box
      sx={{
        position: 'relative',
        px: 0.7,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Fade in={drawerOpen}>
          <Box>
            <Box
              sx={{
                typography: 'subtitle1',
                fontWeight: 'bold',
              }}
            >
              {name}
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: -7, transition: 'all 1s linear' }}>
              <Switch
                sx={{
                  '& .MuiSwitch-thumb': {
                    ml: drawerOpen ? 0 : 2,
                    transition: 'all 0.1s linear',
                    height: '20px',
                    width: '20px',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: 'grey.600',
                  },
                  '& .MuiSwitch-colorPrimary': {
                    // color: '#ff0033',
                    // color: 'primary.main',
                  },

                  '& .MuiSwitch-switchBase': {
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                    '&.Mui-disabled': {
                      '&+.MuiSwitch-track': {
                        bgcolor: 'transparent',
                      },
                    },
                  },

                  '& .Mui-checked': {
                    ml: drawerOpen ? 0 : -2.5,
                    transition: 'all 0.1s linear',
                    color: 'primary.main',
                    '&+.MuiSwitch-track': {
                      bgcolor: drawerOpen ? 'primary.light' : 'transparent',
                    },
                    '&.Mui-disabled': {
                      color: 'primary.light',
                      '&+.MuiSwitch-track': {
                        bgcolor: 'transparent',
                      },
                    },
                  },
                }}
                name={name}
                checked={enabled}
                label="Shop aktivieren"
                onChange={onChange}
                edge="start"
                disabled={!drawerOpen}
              />
            </Box>
          </Box>
        </Fade>
        <Box
          sx={{
            typography: 'caption',
            color: captionTrigger ? 'primary.light' : 'grey.600',
            cursor: drawerOpen ? 'default' : 'pointer',
          }}
          onClick={() => {
            dispatch(setDrawerOpen(true));
          }}
        >
          {captionTrigger ? captionTextOn : captionTextOff}
        </Box>
      </Box>
    </Box>
  );
}

export default StatusSwitch;
