// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import Board from '../BoardPreview/Board';
// import { fetchAllBoards } from '../../../store/boards';

// const BoardsIndex = () => {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const allBoards = useSelector(state => state.boards);
//   const user = useSelector(state => state.users[userId]);
//   const filtered = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === (parseInt(userId))) : [];

//   useEffect(() => {
//     dispatch(fetchAllBoards());
//   }, [dispatch]);

//   if (!allBoards || !user) {
//     return null;
//   }

//   return (
//     <div className="boards-index">
//       {filtered.map(board => (
//         <Board key={board.id} board={board} />
//       ))}
//     </div>
//   );
// };

// export default BoardsIndex;
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {fetchAllBoards} from '../../../store/boards';
// import Board from '../BoardPreview/Board';
// import './BoardsIndex.css';
// import { useEffect } from 'react';

// const BoardsIndex = () => {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const allBoards = useSelector(state => state.boards);
//   const user = useSelector(state => state.users[userId]);
//   const filtered = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === (parseInt(userId))) : [];

//   useEffect(() => {
//     dispatch(fetchAllBoards());
//   }, [dispatch]);

//   if (!allBoards || !user) {
//     return null;
//   }

//   const placeholders = Array.from({ length: 3 - filtered.length });
//   const boards = filtered.concat(placeholders);

//   return (
//     <div className="boards-index">
//       {boards.map((board, index) => (
//         <Board key={index} board={board} />
//       ))}
//     </div>
//   );
// };

// export default BoardsIndex;

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
  const filtered = allBoards && allBoards.boards ? allBoards.boards.filter(board => board.userId === (parseInt(userId))) : [];

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
      {boardRows.map((boardRow, index) => (
        <div key={index} className="board-row">
          {boardRow.map(board => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardsIndex;
