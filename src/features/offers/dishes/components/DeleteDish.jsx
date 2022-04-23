import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/offers/categories/slice';
import { deleteDish } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteDish({ trigger, setTrigger, dishId }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  let affectedCategories = useSelector((state) => selectAffectedCategories(state, dishId));

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
    dispatch(deleteDish(dishId));
    await setDialogOpen(false);
    setTrigger(false);
  };

  affectedCategories = affectedCategories.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Speise löschen?"
        message={
          affectedCategories.length > 0
            ? 'Entfernen Sie die Speise aus sämtlichen Kategorien, um sie löschen zu können. Betroffene Kategorien: ' +
              affectedCategories.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Speise löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedCategories.length > 0}
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

export default DeleteDish;
