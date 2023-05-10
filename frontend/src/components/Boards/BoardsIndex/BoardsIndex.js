import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../BoardPreview/Board';
import { fetchAllBoards } from '../../../store/boards';

const BoardsIndex = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allBoards = useSelector(state => state.boards);
  const user = useSelector(state => state.users[userId]);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  if (!allBoards || !user) {
    return null;
  }


const filtered = allBoards.boards.filter(board => board.userId === (parseInt(userId)));
// console.log(filtered);

  return (
    <div className="boards-index">
      {filtered.map(board => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardsIndex;
