import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteDiscount } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteDiscount({ trigger, setTrigger, discountId }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (trigger) {
      setDialogOpen(true);
    }
  }, [trigger]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
    setTrigger(false);
  };

  const handleAcceptDialog = async (event) => {
    setLoading(true);
    await dispatch(deleteDiscount(discountId));
    setDialogOpen(false);
    setTrigger(false);
  };

  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Rabattaktion löschen?"
        message="Dieser Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </React.Fragment>
  );
}

export default DeleteDiscount;
