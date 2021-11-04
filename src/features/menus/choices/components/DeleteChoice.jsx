import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedDishes } from 'features/menus/dishes/slice';
import { deleteChoice } from '../actions';

import WarningDialog from 'common/components/feedback/WarningDialog';

function DeleteChoice({ trigger, setTrigger, choiceId }) {
  const dispatch = useDispatch();
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  let affectedDishes = useSelector((state) => selectAffectedDishes(state, choiceId));

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
    dispatch(deleteChoice(choiceId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedDishes = affectedDishes.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <WarningDialog
        open={dialogOpen}
        title="Optiongruppe löschen?"
        message={
          affectedDishes.length > 0
            ? 'Entfernen Sie die Optiongruppe aus sämtlichen Speisen, um es löschen zu können. Betroffene Speisen: ' +
              affectedDishes.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Optiongruppe löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedDishes.length > 0}
      />
    </React.Fragment>
  );
}

export default DeleteChoice;
