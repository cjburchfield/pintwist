import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBoards,getBoards } from '../../../store/boards';
import { createBoardPin } from '../../../store/board_pins';
import './AddPinToBoard.css';

const AddPinToBoard = ({ pinId }) => {
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const handleAddToBoard = (event) => {
    const boardId = event.target.value;
    dispatch(createBoardPin({ board_id: boardId, pin_id: pinId }));
  };

  return (
    <div>
      <select onChange={handleAddToBoard}>
        <option value="">Add to board...</option>
        {boards.map(board => (
          <option key={board.id} value={board.id}>{board.name}</option>
        ))}
      </select>
    </div>
  );
};

export default AddPinToBoard;
