import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/products/categories/slice';

import AlertDialog from 'common/components/feedback/AlertDialog';
import ProductModal from './ProductModal';

function EditProduct({ open, onClose, product }) {
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  let affectedCategories = useSelector((state) => selectAffectedCategories(state, product.id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onClose();
      if (affectedCategories.length) {
        setDialogOpen(true);
        return;
      }
      setModalOpen(true);
    }
  }, [open, affectedCategories.length, onClose]);

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
      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        product={product}
      />
      <AlertDialog
        open={dialogOpen}
        title="Angebot bearbeiten?"
        message={
          'Das Bearbeiten des Angebots ändert das Angebot in sämtlichen Kategorien. Betroffene Kategorien: ' +
          affectedCategories.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
    </React.Fragment>
  );
}

export default EditProduct;
