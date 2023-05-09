import csrfFetch from "./csrf";

const RECEIVE_BOARD = "boards/RECEIVE_BOARD";
const RECEIVE_BOARDS = "boards/RECEIVE_BOARDS";
const REMOVE_BOARD = "boards/REMOVE_BOARD";

export const receiveBoard = (board) => ({
    type: RECEIVE_BOARD,
    board
})

export const receiveBoards = (boards) => ({
    type: RECEIVE_BOARDS,
    boards
})

export const removeBoard = (boardId) => ({
    type: REMOVE_BOARD,
    boardId
})

export const getBoard = (boardId) => state => {
    if (state && state.boards) {
        return state.boards[boardId]
    } else {
        return null;
    }
}

export const getBoards = (state) => {
    if (state && state.boards) {
        return Object.values(state.boards)
    } else {
        return [];
    }
}

export const fetchAllBoards = () => async(dispatch) => {
    const response = await csrfFetch('/api/boards/')

    if (response.ok) {
        const boards = await response.json();
        dispatch(receiveBoards(boards))
    }
}

export const fetchBoard = (boardId) => async(dispatch) => {
    const response = await csrfFetch(`/api/boards/${boardId}`)

    if (response.ok) {
        const {board} = await response.json();
        dispatch(receiveBoard(board))
    }
}

export const createBoard = ({ name, user_id }) => async dispatch => {
    const response = await csrfFetch(`/api/boards`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, user_id })
    });

    if (response.ok) {
        const newBoard = await response.json();
        dispatch(receiveBoard(newBoard));
        return newBoard.board.id;
    }
};

const boardsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_BOARD:
            return {...state, [action.board.id]: action.board}
        case RECEIVE_BOARDS:
            return {...state, ...action.boards}
        case REMOVE_BOARD:
            const newState = {...state};
            delete newState[action.boardId];
            return newState;
        default:
            return state;
    }
}

export default boardsReducer;
