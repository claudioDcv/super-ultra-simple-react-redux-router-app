import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers'
import log from './middleware_redux/log'


const store = createStore(
  rootReducer,
  applyMiddleware(thunk, log(true)),
);


export default store
