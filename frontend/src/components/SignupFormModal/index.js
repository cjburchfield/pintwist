import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

// function LoginFormModal() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button className="login-button" onClick={() => setShowModal(true)}>Log in</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <LoginForm onClose={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default LoginFormModal;