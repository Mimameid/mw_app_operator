import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedOffers } from 'features/offers/offers/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import CategoryModal from './CategoryModal';

function EditCategory({ open, onClose, category }) {
  const selectAffectedOffers = useMemo(makeSelectAffectedOffers, []);
  let affectedOffers = useSelector((state) => selectAffectedOffers(state, category.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedOffers.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedOffers.length, onClose]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedOffers = affectedOffers.map((item, _) => item[1]);
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
          affectedOffers.toString() +
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
