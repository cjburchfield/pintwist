
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../BoardPreview/Board';
import { fetchAllBoards } from '../../../store/boards';
import "./BoardsIndex.css"

const BoardsIndex = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allBoards = useSelector(state => state.boards);
  const user = useSelector(state => state.users[userId]);
  const filtered = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === parseInt(userId)) : [];

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  if (!allBoards || !user) {
    return null;
  }

  const boardRows = [];

  for (let i = 0; i < filtered.length; i += 5) {
    boardRows.push(filtered.slice(i, i + 5));
  }

  return (
    <div className="boards-index">
      {boardRows.map((boardRow, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {boardRow.map(board => (
            <div key={board.id} className="board-column">
              <Board board={board} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardsIndex;

