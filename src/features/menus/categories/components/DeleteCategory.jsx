import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedMenus } from 'features/menus/menus/slice';
import { deleteCategory } from '../actions';

import WarningDialog from 'common/components/dialogs/WarningDialog';

function DeleteCategory({ trigger, setTrigger, categoryId }) {
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  let affectedMenus = useSelector((state) => selectAffectedMenus(state, categoryId));

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
    dispatch(deleteCategory(categoryId));
    setDialogOpen(false);
    setTrigger(false);
  };

  affectedMenus = affectedMenus.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <WarningDialog
        open={dialogOpen}
        title="Kategorie löschen?"
        message={
          affectedMenus.length > 0
            ? 'Entferne Sie die Kategorie aus sämtlichen Menüs, um sie löschen zu können. Betroffene Menüs: ' +
              affectedMenus.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Kategorie löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedMenus.length > 0}
      />
    </React.Fragment>
  );
}

export default DeleteCategory;
