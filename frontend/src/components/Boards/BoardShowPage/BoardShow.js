import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAllBoards, fetchBoard } from "../../../store/boards";
import "./BoardShow.css";

const BoardShow = () => {
  const dispatch = useDispatch();
  const { userId, boardId } = useParams();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch, boardId]);

  const board = useSelector((state) => state.boards[boardId]);

  if (!board) {
    return null;
  }

return (
  <div id="board-show-page">
    <div id="board-title">{board.name}</div>
    <div id="board-description">{board.description}</div>
    <div id="board-pins-count">{`${board.boardPins?.length || 0} pin(s)`}</div>
    <div id="board-pins-holder">
      {board.boardPins && board.boardPins.map((boardPin) => (
        <div className="board-pin" key={boardPin.id}>
          <Link to={`/pin/${boardPin.pinId}`}>
            <img 
              className="board-pin-image"
              src={boardPin.pinPhotoUrl}
            />
          </Link>
        </div>
      ))}
    </div>
  </div>
);
      }

export default BoardShow;
