import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/menus/categories/categoriesSlice';

import WarningDialog from 'common/components/dialogs/WarningDialog';
import DishModal from './DishModal';

function EditDish({ open, setOpen, dish }) {
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  let affectedCategories = useSelector((state) => selectAffectedCategories(state, dish.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setOpen(false);
      if (affectedCategories.length > 0) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedCategories, setOpen]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedCategories = affectedCategories.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <DishModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        dish={dish}
      />
      <WarningDialog
        open={dialogOpen}
        title="Speise bearbeiten?"
        message={
          'Das Bearbeiten der Speise ändert die Speise in sämtlichen Kategorien. Betroffene Kategorien: ' +
          affectedCategories.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default EditDish;
