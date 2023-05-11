
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBoards, getBoards } from '../../../store/boards';
import { createBoardPin, deleteBoardPin, fetchBoardPins } from '../../../store/board_pins';
import './AddPinToBoard.css';

const AddPinToBoard = ({ pinId }) => {
  const dispatch = useDispatch();
  const [boardPins, setBoardPins] = useState([]);
  const userId = useSelector(state => state.session.user?.id);
  const allBoards = useSelector(state => state.boards);
  const userBoards = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === (parseInt(userId))) : [];
  const allPinsBoardId = userBoards.find(board => board.name === 'All Pins')?.id;

  useEffect(() => {
    dispatch(fetchAllBoards());
    dispatch(fetchBoardPins(pinId)).then((fetchedBoards) => {
      let allBoardPins = [];
      fetchedBoards.forEach((board) => {
        allBoardPins = [...allBoardPins, ...board.boardPins];
      });
      setBoardPins(allBoardPins);
    });
  }, [dispatch, pinId]);
  
  const handleTogglePinOnBoard = async (boardId) => {
    const boardPin = boardPins.find((bp) => bp.boardId === boardId && bp.pinId === pinId && bp.boardId !== allPinsBoardId);
    const board = userBoards.find(b => b.id === boardId);
    let successMessage;
    if (boardPin) {
      await dispatch(deleteBoardPin(boardPin));  // Pass the full boardPin object
      setBoardPins(boardPins.filter((bp) => bp.id !== boardPin.id));
      successMessage = `Removed from ${board.name}`;
    }
     else {
      const newBoardPin = await dispatch(createBoardPin({ boardId: boardId, pinId: pinId }));
      setBoardPins(prevBoardPins => [...prevBoardPins, newBoardPin]);
      successMessage = `Saved to ${board.name}`;
    }
    alert(successMessage);
  };

  return (
    <div className="add-pin-to-board">
      <ul>
        {userBoards.map((board) => {
          if (board.name === 'All Pins') return null;
          const isPinInBoard = boardPins.some((bp) => bp.boardId === board.id && bp.pinId === pinId);
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
