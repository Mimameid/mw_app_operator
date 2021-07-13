import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedDishes } from 'features/menus/dishes/dishesSlice';

import WarningDialog from 'common/components/dialogs/WarningDialog';
import ChoiceModal from './ChoiceModal';

function EditChoice({ open, setOpen, choice }) {
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  let affectedDishes = useSelector((state) => selectAffectedDishes(state, choice.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setOpen(false);
      if (affectedDishes.length > 0) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedDishes, setOpen]);

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
      <WarningDialog
        open={dialogOpen}
        title="Optiongruppe bearbeiten?"
        message={
          'Das Bearbeiten der Optiongruppe ändert die Optiongruppe in sämtlichen Speisen. Betroffene Speisen: ' +
          affectedDishes.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default EditChoice;
