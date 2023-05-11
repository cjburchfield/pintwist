
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBoards, getBoards } from '../../../store/boards';
import { createBoardPin, deleteBoardPin, fetchBoardPins } from '../../../store/board_pins';
import './AddPinToBoard.css';

const AddPinToBoard = ({ pinId }) => {
  const dispatch = useDispatch();
  const [boardPins, setBoardPins] = useState([]);
  const userId = useSelector(state => state.session.user.id);
  const allBoards = useSelector(state => state.boards);
  const userBoards = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === (parseInt(userId))) : [];

  useEffect(() => {
    dispatch(fetchAllBoards());
    dispatch(fetchBoardPins(pinId)).then((fetchedBoardPins) => {
      console.log('fetchedBoardPins:', fetchedBoardPins);  // add this line
      setBoardPins(fetchedBoardPins);
    });
  }, [dispatch, pinId]);


  const handleTogglePinOnBoard = async (boardId) => {
    const boardPin = boardPins.find((bp) => bp && bp.board_id === boardId);
    const board = userBoards.find(b => b.id === boardId);
    let successMessage;
    if (boardPin) {
      await dispatch(deleteBoardPin(boardPin.id));
      setBoardPins(boardPins.filter((bp) => bp && bp.id !== boardPin.id));
      successMessage = `Removed from ${board.name}`;
    } else {
      const newBoardPin = await dispatch(createBoardPin({ board_id: boardId, pin_id: pinId }));
      setBoardPins([...boardPins, newBoardPin]);
      successMessage = `Saved to ${board.name}`;
    }
    alert(successMessage);
  };

  return (
    <div className="add-pin-to-board">
      <ul>
        {userBoards.map((board) => {
          if (board.name === 'All Pins') return null;
          const isPinInBoard = boardPins.some((bp) => bp && bp.board_id === board.id && bp.pin_id === pinId);
          return (
            <li key={board.id}>
              {board.name}
              <button
                className={`toggle-button`}
                onClick={() => handleTogglePinOnBoard(board.id)}
              >
                {isPinInBoard ? 'Remove' : 'Save'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddPinToBoard;
