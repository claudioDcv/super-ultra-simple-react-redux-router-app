import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers'
import log from './middleware_redux/log'
// ADDED AUTH MIDDLEWARE
import auth from './auth_module'


const store = createStore(
  rootReducer,
  applyMiddleware(thunk, log(true), auth.middlewareBase()),
);

export default store
