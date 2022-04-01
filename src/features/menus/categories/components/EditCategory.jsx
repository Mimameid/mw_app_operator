import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedMenus } from 'features/menus/menus/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import CategoryModal from './CategoryModal';

function EditCategory({ open, onClose, category }) {
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  let affectedMenus = useSelector((state) => selectAffectedMenus(state, category.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedMenus.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedMenus.length, onClose]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedMenus = affectedMenus.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <CategoryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        category={category}
      />
      <AlertDialog
        open={dialogOpen}
        title="Kategorie bearbeiten?"
        message={
          'Das Bearbeiten der Kategorie ändert die Kategorie in sämtlichen Speisekarten. Betroffene Speisekarten: ' +
          affectedMenus.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
    </React.Fragment>
  );
}

export default EditCategory;
