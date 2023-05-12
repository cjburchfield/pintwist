import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditBoardForm from './EditBoardForm';


const EditBoardFormModal = ({ board, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal} className="edit-board-modal-bg">
          <EditBoardForm board={board} onClose={handleCloseModal}/>
          {/* <EditBoardForm  onClose={handleCloseModal}/> */}

        </Modal>
      )}
    </>
  );
};

export default EditBoardFormModal;

