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
  const response = await csrfFetch(`/api/boards/${boardPin.board_id}/board_pins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boardPin),
  });

  if (response.ok) {
    const newBoardPin = await response.json();
    dispatch(receiveBoardPin(newBoardPin));
  }
};

export const deleteBoardPin = (boardPinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/board_pins/${boardPinId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeBoardPin(boardPinId));
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
  