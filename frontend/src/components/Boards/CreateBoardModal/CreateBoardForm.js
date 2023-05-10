import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBoard, fetchAllBoards } from '../../../store/boards';
import { getCurrentUser } from "../../../store/session";
import './CreateBoardForm.css';

const CreateBoardForm = ({ onClose }) => {
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [name, setName] = useState("");
  
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

  return (
    <>
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <form className="create-board-modal-content" onSubmit={handleSubmit}>
        <div className="create-board-form-header">Create board</div>
        <div className="create-board-form-body">
          <label className="create-board-modal-label">Name
            <input type="text" onChange={handleNameChange} value={name} className="create-board-modal-input" placeholder="Like 'Places to Go' or 'Recipes to Make'" />
          </label>
        </div>
        <div className="create-board-form-footer">
          <button className={`create-board-form-button ${name ? 'active-button' : ''}`} type="submit">Create</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default CreateBoardForm;
