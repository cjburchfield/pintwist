import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

const EditPinForm = ({ pinId }) => {
  const [showModal, setShowModal] = useState(false);

  console.log("you hit the editpinformmodal index page")

  return (
    <>
      <button className="edit-pin-button" onClick={() => setShowModal(true)}>Edit Pin</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPinForm pinId={pinId} onClose={() => setShowModal(false)}/>
        </Modal>
      )}
</>
)
      }

export default EditPinForm;
