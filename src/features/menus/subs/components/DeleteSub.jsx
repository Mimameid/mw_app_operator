import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices } from 'features/menus/choices/slice';
import { deleteSub } from '../actions';

import WarningDialog from 'common/components/dialogs/WarningDialog';

function DeleteSub({ trigger, setTrigger, subId }) {
  const dispatch = useDispatch();
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  let affectedChoices = useSelector((state) => selectAffectedChoices(state, subId));

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
    dispatch(deleteSub(subId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedChoices = affectedChoices.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <WarningDialog
        open={dialogOpen}
        title="Option löschen?"
        message={
          affectedChoices.length > 0
            ? 'Entfernen Sie die Option aus sämtlichen Optiongruppe, um sie löschen zu können. Betroffene Optiongruppe: ' +
              affectedChoices.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Option löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedChoices.length > 0}
      />
    </React.Fragment>
  );
}

export default DeleteSub;
