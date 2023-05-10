import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateBoardForm from './CreateBoardForm';

const CreateBoardFormModal = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal} className="create-board-modal-bg">
          <CreateBoardForm onClose={handleCloseModal}/>
        </Modal>
      )}
    </>
  );
};

export default CreateBoardFormModal;
