import React, { useState, useEffect } from 'react';
import "./EditBoardForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard, getBoard, fetchAllBoards, fetchBoard, deleteBoard } from '../../../store/boards';
import { useHistory } from 'react-router-dom';


const EditBoardForm = ({ board, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(board?.name || "");
  const [description, setDescription] = useState(board?.description || "");

    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

    const boardCreatorID = board ? board.userId : null;

    useEffect(() => {
      if (boardCreatorID) {
        dispatch(fetchBoard(boardCreatorID));
      }
    }, [dispatch, boardCreatorID]);

    const handleDelete = (e) => {
        e.preventDefault(); 
    
        dispatch(deleteBoard(board.id))
        .then(() => {
            history.push({
              pathname: `/users/${boardCreatorID}`,
              state: { successMessage: "Board deleted successfully!" },
            });
          });
      };
    

      useEffect(() => {
        if (!board) {
            dispatch(fetchBoard(board.id));
        } else {
            setName(board.name || "");
            setDescription(board.description || "");
        }
    }, [dispatch, board.id, board]);

    const changeName = (e) => {
        setName(e.target.value);
    };

    const changeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!name || name.length < 1) {
            setNameErrorMessage("Board name cannot be empty");
            return;
        }
        
        if (!name || name.length > 25) {
            setNameErrorMessage("Board name must be less than 25 characters");
            return;
        }
        
        if (!description || description.length > 100) {
            setDescriptionErrorMessage("Board description must be less than 100 characters");
            return;
        }
        

        if (!board) {
            alert("This board no longer exists.")
            return;
        }

        const updatedBoard = {
            id: board.id, 
            user_id: board.user_id,
            name,
            description,
        };

        dispatch(updateBoard(updatedBoard)).then(() => dispatch(fetchBoard(board.id))).then(onClose);
    };


    if (!board) {
        return null;
    }

    return (
        <>
    <form id="edit-pin-modal-bg" onSubmit={handleSave}>
            <div className="edit-pin-form-header">Edit your board</div>
            <div className="edit-pin-form-body">
                <div className="edit-pin-form-content">
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Name
                        <input type="text" onChange={changeName} value={name} className="modal-input" />
                    </label>
                    {nameErrorMessage && <div className="error-message">{nameErrorMessage}</div>}

                </div>
                <div className="edit-pin-form-divider"></div>
                <div className="edit-pin-text-holder">
                    <label className="modal-label">Description
                        <input type="text" onChange={changeDescription} value={description} className="modal-input" />
                    </label>
                    {descriptionErrorMessage && <div className="error-message">{descriptionErrorMessage}</div>}

                </div>
                <div className="edit-pin-form-divider"></div>
    
                </div>
            </div>
            <div className="edit-pin-form-footer">
                <div className="edit-pin-form-footer-left">
                <button type="button" className="edit-pin-form-delete-button" onClick={handleDelete}>Delete</button>
                </div>
                <div className="edit-pin-form-footer-right">
                    <button className="edit-pin-form-cancel-button" onClick={onClose}>Cancel</button>
                    <button className="edit-pin-form-save-button" type="submit">Save</button>
                </div>  



            </div>
        </form>
        </>
    )
}

export default EditBoardForm;
