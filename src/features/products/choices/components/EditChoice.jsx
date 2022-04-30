import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedProducts } from 'features/products/products/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import ChoiceModal from './ChoiceModal';

function EditChoice({ open, onClose, choice }) {
  const selectAffectedProducts = useMemo(makeSelectAffectedProducts, []);
  let affectedProducts = useSelector((state) => selectAffectedProducts(state, choice.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedProducts.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedProducts.length, onClose]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedProducts = affectedProducts.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <ChoiceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        choice={choice}
      />
      <AlertDialog
        open={dialogOpen}
        title="Optiongruppe bearbeiten?"
        message={
          'Das Bearbeiten der Optiongruppe ändert die Optiongruppe in sämtlichen Speisen. Betroffene Speisen: ' +
          affectedProducts.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
    </React.Fragment>
  );
}

export default EditChoice;
