import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShopDelivery, updateShopOpen, updateShopPickup } from 'features/shop/shop/actions';

import { Stack } from '@mui/material';
import StatusSwitch from '../StatusSwitch';
import AlertDialog from 'common/components/feedback/AlertDialog';

function ShopStatus() {
  const dispatch = useDispatch();
  const { isOpen, isDelivery, isPickup, isActive } = useSelector((state) => ({
    isOpen: state.shop.shop.isOpen,
    isDelivery: state.shop.shop.isDelivery,
    isPickup: state.shop.shop.isPickup,
    isActive: state.shop.shop.isActive,
  }));

  const [loading, setLoading] = useState(false);
  const [activateIsOpenDialog, setActivateIsOpenDialog] = useState(false);
  const [deactivateIsOpenDialog, setDeactivateIsOpenDialog] = useState(false);
  const [activateIsDeliveryDialog, setActivateIsDeliveryDialog] = useState(false);
  const [deactivateIsDeliveryDialog, setDeactivateIsDeliveryDialog] = useState(false);
  const [activateIsPickupDialog, setActivateIsPickupDialog] = useState(false);
  const [deactivateIsPickupDialog, setDeactivateIsPickupDialog] = useState(false);
  const setActiveRef = useRef(false);

  const handleAcceptOpen = async () => {
    setLoading(true);
    await dispatch(updateShopOpen({ isOpen: setActiveRef.current }));
    handleRejectDialog();
  };

  const handleAcceptDelivery = async () => {
    setLoading(true);
    await dispatch(updateShopDelivery({ isDelivery: setActiveRef.current }));
    handleRejectDialog();
  };

  const handleAcceptPickup = async () => {
    setLoading(true);
    await dispatch(updateShopPickup({ isPickup: setActiveRef.current }));
    handleRejectDialog();
  };

  const handleRejectDialog = (event) => {
    setActivateIsOpenDialog(false);
    setDeactivateIsOpenDialog(false);
    setActivateIsDeliveryDialog(false);
    setDeactivateIsDeliveryDialog(false);
    setActivateIsPickupDialog(false);
    setDeactivateIsPickupDialog(false);
  };

  return isActive ? (
    <Stack spacing={3}>
      <StatusSwitch
        name="Abholung"
        enabled={isPickup}
        onChange={(event, value) => {
          setActiveRef.current = value;
          if (!value) {
            setDeactivateIsPickupDialog(true);
            return;
          }

          setActivateIsPickupDialog(true);
        }}
      />
      <StatusSwitch
        name="Lieferung"
        enabled={isDelivery}
        onChange={(event, value) => {
          setActiveRef.current = value;
          if (!value) {
            setDeactivateIsDeliveryDialog(true);
            return;
          }

          setActivateIsDeliveryDialog(true);
        }}
      />
      <StatusSwitch
        name="Geöffnet"
        enabled={isOpen}
        onChange={(event, value) => {
          setActiveRef.current = value;
          if (!value) {
            setDeactivateIsOpenDialog(true);
            return;
          }

          setActivateIsOpenDialog(true);
        }}
      />
      <AlertDialog
        open={activateIsOpenDialog}
        title="Shop öffnen?"
        message="Wenn Sie ihren Shop öffnen, wird ihr Shop als geöffnet angezeigt."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptOpen}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateIsOpenDialog}
        title="Shop schließen?"
        message="Wenn Sie ihren Shop schließen, kann weder zur Abholung noch zur Lieferung bestellt werden. Außerdem wird ihr Shop als geschlossen angezeigt."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptOpen}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={activateIsDeliveryDialog}
        title="Lieferung aktivieren?"
        message="Wenn Sie die Lieferung aktiveren, kann ab sofort zur Lieferung bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDelivery}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateIsDeliveryDialog}
        title="Lieferung deaktiveren?"
        message="Wenn Sie die Lieferung deaktiveren, kann nicht mehr zur Lieferung bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDelivery}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={activateIsPickupDialog}
        title="Abholung aktivieren?"
        message="Wenn Sie die Abholung aktiveren, kann ab sofort zur Abholung bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptPickup}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateIsPickupDialog}
        title="Abholung deaktivieren?"
        message="Wenn Sie die Abholung deaktiveren, kann nicht mehr zur Abholung bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptPickup}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </Stack>
  ) : null;
}

export default ShopStatus;
