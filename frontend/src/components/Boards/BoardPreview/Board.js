

import { Link } from 'react-router-dom';
import './Board.css';

const Board = ({ board }) => {
  const pinPreviews = board.boardPins.length ? board.boardPins.slice(0, 3) : [];

  return (
    <Link to={`/users/${board.userId}/boards/${board.id}`}>
      <div className="board-item">
        <div className="board-image-holder">
          <div className="first-image">
            {pinPreviews.length > 0 ? (
              <img src={pinPreviews[0].pinPhotoUrl} alt="" />
            ) : (
              <div className="pin-placeholder"></div>
            )}
          </div>
          <div className="second-image-holder">
            {pinPreviews.length > 1 ? (
              <div className="secondary-image">
                <img src={pinPreviews[1].pinPhotoUrl} alt="" />
              </div>
            ) : (
              <div className="pin-placeholder"></div>
            )}
            {pinPreviews.length > 2 ? (
              <div className="third-image">
                <img src={pinPreviews[2].pinPhotoUrl} alt="" />
              </div>
            ) : (
              <div className="pin-placeholder"></div>
            )}
          </div>
        </div>
        <div className="board-info">
          <div className="board-name">{board.name}</div>
          <div className="board-pin-count">{board.boardPins.length} pins</div>
        </div>
      </div>
    </Link>
  );
};

export default Board;
