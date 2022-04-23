import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveOffer } from 'features/offers/offers/slice';
import { updateShopActive } from 'features/shop/shop/actions';
import { setDeactivatedShopNotification, setDrawerOpen } from 'features/frame/actions';

import { Box, Fade, Switch } from '@mui/material';
import AlertDialog from 'common/components/feedback/AlertDialog';

function ActivateShopSwitch({ control, name, label, desc }) {
  const dispatch = useDispatch();
  const activeOffer = useSelector(selectActiveOffer);
  const isShopActive = useSelector((state) => state.shop.shop.isActive);
  const drawerOpen = useSelector((state) => state.frame.drawerOpen);

  const setActiveRef = useRef(false);
  const [enabled, setEnabled] = useState(isShopActive);
  const [loading, setLoading] = useState(false);
  const [activateShopDialogOpen, setActivateShopDialogOpen] = useState(false);
  const [deactivateShopDialogOpen, setDeactivateShopDialogOpen] = useState(false);

  useEffect(() => {
    setEnabled(isShopActive);
  }, [isShopActive]);

  const handleChange = (event, value) => {
    setActiveRef.current = value;
    if (!activeOffer) {
      dispatch(setDeactivatedShopNotification(true));
      return;
    }

    if (!value) {
      setDeactivateShopDialogOpen(true);
      return;
    }

    setActivateShopDialogOpen(true);
  };

  const handleUpdateShopActive = async () => {
    setLoading(true);
    await dispatch(updateShopActive({ isActive: setActiveRef.current }));
    if (!setActiveRef.current) {
      dispatch(setDeactivatedShopNotification(true));
    }

    handleRejectDialog();
  };

  const handleRejectDialog = (event) => {
    setActivateShopDialogOpen(false);
    setDeactivateShopDialogOpen(false);
  };

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
              Shop
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
                onChange={handleChange}
                edge="start"
                disabled={!drawerOpen}
              />
            </Box>
          </Box>
        </Fade>
        <Box
          sx={{
            typography: 'caption',
            color: isShopActive ? 'success.light' : 'grey.600',
            cursor: drawerOpen ? 'default' : 'pointer',
          }}
          onClick={() => {
            dispatch(setDrawerOpen(true));
          }}
        >
          {isShopActive ? 'Online' : 'Offline'}
        </Box>
      </Box>

      <AlertDialog
        open={activateShopDialogOpen}
        title="Shop aktivieren?"
        message="Wenn Sie ihren Shop aktivieren, geht ihr Shop mit den angegebenen Daten online und kann gesucht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleUpdateShopActive}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateShopDialogOpen}
        title="Shop deaktivieren?"
        message="Wenn Sie ihren Shop deaktiveren, geht ihr Shop offline und kann nicht mehr gesucht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleUpdateShopActive}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </Box>
  );
}

export default ActivateShopSwitch;
