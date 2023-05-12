import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchAllBoards, fetchBoard } from "../../../store/boards";
import { fetchUser } from "../../../store/users";
import "./BoardShow.css";
import { getUser } from "../../../store/users";
import EditBoardFormModal from "../EditBoard";

const BoardShow = () => {
  const dispatch = useDispatch();
  const { userId, boardId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const dropdownRef = useRef();
  const ellipsisRef = useRef();

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

  const handleClickOutsideDropdown = (event) => {
    if (
      isDropdownOpen &&
      !dropdownRef.current.contains(event.target) &&
      !ellipsisRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);

  const user = useSelector(getUser(boardCreatorID));

  if (!board || !user || !boardCreatorID) {
    return null;
  }

  const getNumberOfColumns = () => {
    const pinCount = board.boardPins.length;
    return Math.min(pinCount, 5);
  };

  const handleEllipsisClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditBoardClick = () => {
    setIsDropdownOpen(false);
    setIsEditBoardModalOpen(true);
  };

  // return (
  //   <>
  //   <div id="board-show-page">
  //     <div className="board-show-header">




  //       <div className="board-title">{board.name}</div>
  //       <div className="pin-show-user-holder">
  //         <div className="pin-show-user-picture">
  //           {user.username.slice(0, 1).toUpperCase()}
  //         </div>
  //         <div className="pin-show-user-name">{user.username}</div>
  //       </div>
  //       <div className="board-description">{board.description}</div>
       
  //       <div
  //         ref={ellipsisRef}
  //         className={`pin-show-nav-bar-left-ellipsis ${isDropdownOpen ? 'pin-show-nav-bar-left-ellipsis-active' : ''}`}
  //         onClick={handleEllipsisClick}
  //       >
  //         <i className="fa-solid fa-ellipsis"></i>
  //       </div>
  //       {isDropdownOpen && (
  //         <div ref={dropdownRef} className="pin-show-dropdown-menu">
  //           <div
  //             className="pin-show-dropdown-option"
  //             onClick={handleEditBoardClick}
  //           >
  //           Edit Board
  //           </div>
  //         </div>
  //       )}
    
    
    
  //   </div>

  //     <div className="board-pins-count-holder">
  //       <div className="board-pins-count">{`${board.boardPins?.length || 0} pin(s)`}</div>
  //     </div>

  //     <div
  //       id="board-pins-holder"
  //       style={{ columnCount: getNumberOfColumns() }}
  //     >
  //       {board.boardPins &&
  //         board.boardPins.map((boardPin) => (
  //           <div className="board-pin" key={boardPin.id}>
  //             <Link to={`/pin/${boardPin.pinId}`}>
  //               <img className="board-pin-image" src={boardPin.pinPhotoUrl} />
  //             </Link>
  //           </div>
  //         ))}
  //     </div>
  //   </div>
  //   {isEditBoardModalOpen && (
  //               <EditBoardFormModal board={board} onClose={() => setIsEditBoardModalOpen(false)} />

  //     )}
  //   </>

  // );

  return (
    <>
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
  <div className="ellipsis-wrapper">
    <div
      ref={ellipsisRef}
      className={`pin-show-nav-bar-left-ellipsis ${isDropdownOpen ? 'pin-show-nav-bar-left-ellipsis-active' : ''}`}
      onClick={handleEllipsisClick}
    >
      <i className="fa-solid fa-ellipsis"></i>
    </div>
    {isDropdownOpen && (
      <div ref={dropdownRef} className="board-show-dropdown-menu">
        <div
          className="board-show-dropdown-option"
          onClick={handleEditBoardClick}
        >
        Edit Board
        </div>
      </div>
    )}
  </div>
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
      {isEditBoardModalOpen && (
        <EditBoardFormModal board={board} onClose={() => setIsEditBoardModalOpen(false)} />
      )}
    </>
  );
  
};

export default BoardShow;
