import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedMenus } from 'features/products/menus/slice';
import { deleteCategory } from '../actions';

import AlertDialog from 'common/components/feedback/AlertDialog';

function DeleteCategory({ trigger, setTrigger, categoryId }) {
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  let affectedMenus = useSelector((state) => selectAffectedMenus(state, categoryId));

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

  affectedMenus = affectedMenus.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <AlertDialog
        open={dialogOpen}
        title="Kategorie löschen?"
        message={
          affectedMenus.length > 0
            ? 'Entferne Sie die Kategorie aus sämtlichen Angeboten, um sie löschen zu können. Betroffene Angebote: ' +
              affectedMenus.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Kategorie löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={affectedMenus.length > 0}
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
