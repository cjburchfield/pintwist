import csrfFetch from "./csrf";

export const RECEIVE_BOARD_PIN = "boards/RECEIVE_BOARD_PIN";
export const REMOVE_BOARD_PIN = "boards/REMOVE_BOARD_PIN";

export const receiveBoardPin = (boardPin) => ({
  type: RECEIVE_BOARD_PIN,
  boardPin,
});

export const removeBoardPin = (boardPinId) => ({
  type: REMOVE_BOARD_PIN,
  boardPinId,
});

export const createBoardPin = (boardPin) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardPin.boardId}/board_pins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board_pin: boardPin }),
  });

  if (response.ok) {
    const newBoardPin = await response.json();
    dispatch(receiveBoardPin(newBoardPin));
    return newBoardPin;  
  }
};


export const deleteBoardPin = (boardPin) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardPin.boardId}/board_pins/${boardPin.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeBoardPin(boardPin.id));
  }
};


export const fetchBoardPins = (pinId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pins/${pinId}/boards`);
  
    if (response.ok) {
      const data = await response.json();
      const boards = data.boards;
      boards.forEach(board => {
        board.boardPins.forEach(boardPin => {
          dispatch(receiveBoardPin(boardPin));
        });
      });
      return boards;
    }
  };
  
  
  

const boardPinsReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVE_BOARD_PIN:
        return { ...state, [action.boardPin.id]: action.boardPin };
      case REMOVE_BOARD_PIN:
        const newState = { ...state };
        delete newState[action.boardPinId];
        return newState;
      default:
        return state;
    }
  };
  
  export default boardPinsReducer;
  