import "./Board.css";

import React from 'react';

const Board = ({ board }) => {
    const pinPreviews = board.boardPins.slice(0, 3); // change board_pins to boardPins

    console.log(board)
  
    return (
        // <>
        // <div>{board.name}</div>
        // </>
      <div className="board-card">
        <h3>{board.name}</h3>
        <div className="board-preview">
          {pinPreviews.map((pin, index) => (
            <div key={index} className="pin-preview">
              <img src={pin.pinPhotoUrl} alt="" /> {/* change pin_photo_url to pinPhotoUrl */}
            </div>
          ))}
          {pinPreviews.length < 3 && 
            [...Array(3 - pinPreviews.length)].map((_, index) => (
              <div key={index} className="pin-placeholder"></div>
            ))}
        </div>
        {/* Add any other information you want to display for each board */}
      </div>
    );
  };
  

export default Board;
