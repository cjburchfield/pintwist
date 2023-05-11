// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { fetchAllBoards, fetchBoard } from "../../../store/boards";
// import { fetchUser } from "../../../store/users"; 
// import "./BoardShow.css";
// import { getUser } from "../../../store/users";

// const BoardShow = () => {
//   const dispatch = useDispatch();
//   const { userId, boardId } = useParams();

//   useEffect(() => {
//     dispatch(fetchBoard(boardId));
//   }, [dispatch, boardId]);

//   const board = useSelector((state) => state.boards[boardId]);
//   const boardCreatorID = board ? board.userId : null;

//   useEffect(() => {
//     if (boardCreatorID) {
//       dispatch(fetchUser(boardCreatorID));
//     }
//   }, [dispatch, boardCreatorID]);

//   const user = useSelector(getUser(boardCreatorID)); 

//   if (!board || !user || !boardCreatorID) {
//     return null;
//   }

//   return (
//     <div id="board-show-page">
//       <div className="board-show-header">
//         <div className="board-title">{board.name}</div>
//         <div className="pin-show-user-holder">
//           <div className="pin-show-user-picture">
//             {user.username.slice(0, 1).toUpperCase()} 
//           </div>
//           <div className="pin-show-user-name">{user.username}</div> 
//         </div>
//         <div className="board-description">{board.description}</div>
//       </div>

//       <div className="board-pins-count-holder">
//         <div className="board-pins-count">{`${board.boardPins?.length || 0} pin(s)`}</div>
//       </div>


//       <div id="board-pins-holder">
//         {board.boardPins &&
//           board.boardPins.map((boardPin) => (
//             <div className="board-pin" key={boardPin.id}>
//               <Link to={`/pin/${boardPin.pinId}`}>
//                 <img className="board-pin-image" src={boardPin.pinPhotoUrl} />
//               </Link>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default BoardShow;

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAllBoards, fetchBoard } from "../../../store/boards";
import { fetchUser } from "../../../store/users";
import "./BoardShow.css";
import { getUser } from "../../../store/users";

const BoardShow = () => {
  const dispatch = useDispatch();
  const { userId, boardId } = useParams();

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch, boardId]);

  const board = useSelector((state) => state.boards[boardId]);
  const boardCreatorID = board ? board.userId : null;

  useEffect(() => {
    if (boardCreatorID) {
      dispatch(fetchUser(boardCreatorID));
    }
  }, [dispatch, boardCreatorID]);

  const user = useSelector(getUser(boardCreatorID));

  if (!board || !user || !boardCreatorID) {
    return null;
  }

  const getNumberOfColumns = () => {
    const pinCount = board.boardPins.length;
    return Math.min(pinCount, 5);
  };

  return (
    <div id="board-show-page">
      <div className="board-show-header">
        <div className="board-title">{board.name}</div>
        <div className="pin-show-user-holder">
          <div className="pin-show-user-picture">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
          <div className="pin-show-user-name">{user.username}</div>
        </div>
        <div className="board-description">{board.description}</div>
      </div>

      <div className="board-pins-count-holder">
        <div className="board-pins-count">{`${board.boardPins?.length || 0} pin(s)`}</div>
      </div>

      <div
        id="board-pins-holder"
        style={{ columnCount: getNumberOfColumns() }}
      >
        {board.boardPins &&
          board.boardPins.map((boardPin) => (
            <div className="board-pin" key={boardPin.id}>
              <Link to={`/pin/${boardPin.pinId}`}>
                <img className="board-pin-image" src={boardPin.pinPhotoUrl} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BoardShow;
