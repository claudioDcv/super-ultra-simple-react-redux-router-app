import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers'

const showActions = (flag = false) => {
  if (flag) {
    return store => next => action => {
      console.log(`%c Acción: ${action.type} `, 'background: #222; color: #bada55')
      console.log("antes:", store.getState());
      next(action);
      console.log("actual:", store.getState());
    }
  } else {
    return store => next => action => {
      next(action);
    }
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, showActions(true)),
);


export default store
