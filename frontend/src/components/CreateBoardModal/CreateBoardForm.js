import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBoard, fetchAllBoards } from '../../store/boards';
import { getCurrentUser } from "../../store/session";
import './CreateBoardForm.css';

const CreateBoardForm = ({ onClose }) => {
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [name, setName] = useState('Places to go');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      user_id: user.id,
      name,
    };
    dispatch(createBoard(newBoard))
      .then(() => dispatch(fetchAllBoards()))
      .then(onClose);
  };

  // This function will close the modal when clicking outside
  const closeOnOutsideClick = (e) => {
    if (e.target.id === 'create-board-modal-bg') {
      onClose();
    }
  };

  return (
    <div id="create-board-modal-bg" onClick={closeOnOutsideClick}>
      <form className="create-board-form" onSubmit={handleSubmit}>
        <div className="create-board-form-header">Create Board</div>
        <div className="create-board-form-body">
          <label className="modal-label">Name
            <input type="text" onChange={handleNameChange} value={name} className="modal-input" />
          </label>
        </div>
        <div className="create-board-form-footer">
        <button className={`create-board-form-button ${name ? 'active-button' : ''}`} type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBoardForm;
