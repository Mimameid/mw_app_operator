import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/menus/categories/slice';
import { deleteDish } from '../actions';

import WarningDialog from 'common/components/feedback/WarningDialog';

function DeleteDish({ trigger, setTrigger, dishId }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  let affectedCategories = useSelector((state) => selectAffectedCategories(state, dishId));

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

  const handleAcceptDialog = (event) => {
    dispatch(deleteDish(dishId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedCategories = affectedCategories.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <WarningDialog
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
      />
    </React.Fragment>
  );
}

export default DeleteDish;
