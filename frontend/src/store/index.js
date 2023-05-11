import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import sessionReducer from './session';
import usersReducer from './users';
import pinsReducer from './pins';
import searchReducer from './search';
import boardsReducer from './boards'
import boardPinsReducer from './board_pins';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  pins: pinsReducer,
  searchResults: searchReducer,
  boards: boardsReducer,
  boardPins: boardPinsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
