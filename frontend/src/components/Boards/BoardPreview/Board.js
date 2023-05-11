// import { Link } from 'react-router-dom';
// import "./Board.css";

// import React from 'react';

// const Board = ({ board }) => {
//   const pinPreviews = board.boardPins.slice(0, 3);

//   return (
//     <Link to={`/users/${board.userId}/boards/${board.id}`}>
//       <div className="board-card">
//         <h3>{board.name}</h3>
//         <div className="board-preview">
//           {pinPreviews.map((pin, index) => (
//             <div key={index} className="pin-preview">
//               <img src={pin.pinPhotoUrl} alt="" /> 
//             </div>
//           ))}
//           {pinPreviews.length < 3 && 
//             [...Array(3 - pinPreviews.length)].map((_, index) => (
//               <div key={index} className="pin-placeholder"></div>
//             ))}
//         </div>
//         {/* Add any other information you want to display for each board */}
//       </div>
//     </Link>
//   );
// };

// export default Board;

import { Link } from 'react-router-dom';
import "./Board.css";

import React from 'react';

const Board = ({ board }) => {
  const pinPreviews = board.boardPins.length ? board.boardPins.slice(0, 3) : [];
  const placeholders = Array.from({ length: 3 - pinPreviews.length });
  
  return (
    <Link to={`/users/${board.userId}/boards/${board.id}`}>
      <div className="board-card">
        <div className="board-preview">
          {pinPreviews.map((pin, index) => (
            <div key={index} className="pin-preview">
              <img src={pin.pinPhotoUrl} alt="" /> 
            </div>
          ))}
          {pinPreviews.length < 3 && 
            [...Array(3 - pinPreviews.length)].map((_, index) => (
              <div key={index} className="pin-placeholder"></div>
            ))}
        </div>
        <div className="board-info">
          <h3 className="board-title">{board.name}</h3>
          <p className="board-pin-count">{board.boardPins.length} pins</p>
        </div>
      </div>
    </Link>
  );
};

export default Board;
