import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/products/categories/slice';
import { deleteProduct } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteProduct({ trigger, setTrigger, productId }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  let affectedCategories = useSelector((state) => selectAffectedCategories(state, productId));

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
    dispatch(deleteProduct(productId));
    await setDialogOpen(false);
    setTrigger(false);
  };

  affectedCategories = affectedCategories.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Angebot löschen?"
        message={
          affectedCategories.length > 0
            ? 'Entfernen Sie das Angebot aus sämtlichen Kategorien, um es löschen zu können. Betroffene Kategorien: ' +
              affectedCategories.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie das Angebot löschen wollen?'
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

export default DeleteProduct;
