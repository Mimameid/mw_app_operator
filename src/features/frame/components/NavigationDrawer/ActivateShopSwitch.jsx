import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCanActivate } from 'features/frame';
import { setActive } from 'features/shop/shop/actions';
import { setDrawerOpen } from 'features/frame/actions';

import { Box, Fade, Switch } from '@mui/material';

function ActivateShopSwitch({ control, name, label, desc, ...props }) {
  const dispatch = useDispatch();
  const { hasOpeningHours, hasActiveMenu } = useSelector(selectCanActivate);
  const isShopActive = useSelector((state) => state.shop.isActive);

  useEffect(() => {}, [dispatch]);

  const open = useSelector((state) => state.frame.drawerOpen);

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
        <Fade in={open}>
          <Box>
            <Box
              sx={{
                typography: 'subtitle1',
                fontWeight: 'bold',
              }}
            >
              Shop
            </Box>
            <Box sx={{ position: 'absolute', right: 0, top: -7, transition: 'all 1s linear' }}>
              <Switch
                sx={{
                  '& .MuiSwitch-thumb': {
                    ml: open ? 0 : 2,
                    transition: 'all 0.1s linear',
                    height: '20px',
                    width: '20px',
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: 'grey.600',
                  },
                  '& .MuiSwitch-colorPrimary': {
                    // color: '#ff0033',
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
                    ml: open ? 0 : -2.5,
                    transition: 'all 0.1s linear',
                    color: 'success.light',
                    '&+.MuiSwitch-track': {
                      bgcolor: open ? 'success.light' : 'transparent',
                    },
                    '&.Mui-disabled': {
                      color: 'success.light',
                      '&+.MuiSwitch-track': {
                        bgcolor: 'transparent',
                      },
                    },
                  },
                }}
                name={name}
                checked={isShopActive}
                label="Shop aktivieren"
                onChange={(value) => {
                  dispatch(setActive(value));
                }}
                edge="start"
                disabled={!open}
              />
            </Box>
          </Box>
        </Fade>
        <Box
          sx={{
            typography: 'caption',
            color: 'grey.600',
            cursor: open ? 'default' : 'pointer',
          }}
          onClick={() => {
            dispatch(setDrawerOpen(true));
          }}
        >
          Offline
        </Box>
      </Box>
    </Box>
  );
}

export default ActivateShopSwitch;
