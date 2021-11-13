import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedDishes } from 'features/menus/dishes/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import ChoiceModal from './ChoiceModal';

function EditChoice({ open, onClose, choice }) {
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  let affectedDishes = useSelector((state) => selectAffectedDishes(state, choice.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedDishes.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedDishes.length, onClose]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedDishes = affectedDishes.map((item, _) => item[1]);
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
          affectedDishes.toString() +
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
