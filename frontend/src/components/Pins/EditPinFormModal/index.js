import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPinForm from './EditPinForm';

const EditPinFormModal = ({ pin, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal} className="edit-pin-modal-bg">
          <EditPinForm pinId={pin.id} onClose={handleCloseModal}/>
        </Modal>
      )}
    </>
  );
};

export default EditPinFormModal;




