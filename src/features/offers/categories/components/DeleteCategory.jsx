import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedOffers } from 'features/offers/offers/slice';
import { deleteCategory } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteCategory({ trigger, setTrigger, categoryId }) {
  const dispatch = useDispatch();
  const selectAffectedOffers = useMemo(makeSelectAffectedOffers, []);
  let affectedOffers = useSelector((state) => selectAffectedOffers(state, categoryId));

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
    await dispatch(deleteCategory(categoryId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedOffers = affectedOffers.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Kategorie löschen?"
        message={
          affectedOffers.length > 0
            ? 'Entferne Sie die Kategorie aus sämtlichen Speisekarten, um sie löschen zu können. Betroffene Speisekarten: ' +
              affectedOffers.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Kategorie löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedOffers.length > 0}
        loading={loading}
        warning
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </React.Fragment>
  );
}

export default DeleteCategory;
