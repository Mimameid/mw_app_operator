import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedProducts } from 'features/products/products/slice';
import { deleteChoice } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteChoice({ trigger, setTrigger, choiceId }) {
  const dispatch = useDispatch();
  const selectAffectedProducts = useMemo(makeSelectAffectedProducts, []);
  let affectedProducts = useSelector((state) => selectAffectedProducts(state, choiceId));

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
    await dispatch(deleteChoice(choiceId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedProducts = affectedProducts.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Optiongruppe löschen?"
        message={
          affectedProducts.length > 0
            ? 'Entfernen Sie die Optiongruppe aus sämtlichen Angeboten, um sie löschen zu können. Betroffene Angebote: ' +
              affectedProducts.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Optiongruppe löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedProducts.length > 0}
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

export default DeleteChoice;
