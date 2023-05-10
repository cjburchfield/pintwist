import "./Board.css";

import React from 'react';

const Board = ({ board }) => {
  const pinPreviews = board.board_pins.slice(0, 3);

  return (
    <div className="board-card">
      <h3>{board.name}</h3>
      <div className="board-preview">
        {pinPreviews.map((pin, index) => (
          <div key={index} className="pin-preview">
            <img src={pin.pin_photo_url} alt="" />
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
