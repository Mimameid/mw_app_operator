import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedChoices } from 'features/offers/choices/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import SubModal from './SubModal';

function EditSub({ open, onClose, sub }) {
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  let affectedChoices = useSelector((state) => selectAffectedChoices(state, sub.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedChoices.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedChoices.length, onClose]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    setModalOpen(true);
  };

  affectedChoices = affectedChoices.map((item, _) => item[1]);
  return (
    <React.Fragment>
      <SubModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        sub={sub}
      />
      <AlertDialog
        open={dialogOpen}
        title="Option bearbeiten?"
        message={
          'Das Bearbeiten der Option ändert die Option in sämtlichen Optiongruppen. Betroffene Optiongruppen: ' +
          affectedChoices.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
    </React.Fragment>
  );
}

export default EditSub;
