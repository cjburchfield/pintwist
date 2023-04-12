// import React, { useState } from 'react';
// import { Modal } from '../../../context/Modal';
// import EditPinForm from './EditPinForm';

// const EditPinFormModal = ({ pin }) => {
//   const [showModal, setShowModal] = useState(false);

//   console.log("you hit the editpinformmodal index page")

//   return (
//     <>
//       <button className="edit-pin-button" onClick={() => setShowModal(true)}>Edit Pin</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EditPinForm pinId={pin.id} onClose={() => setShowModal(false)}/>
//         </Modal>
//       )}
// </>
// )
//       }

// export default EditPinFormModal;

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




