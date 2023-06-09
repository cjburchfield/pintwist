import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
