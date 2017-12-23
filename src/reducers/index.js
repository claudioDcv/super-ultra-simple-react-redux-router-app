import { combineReducers } from 'redux'
import courses from './courses'
import { active } from './common'

const rootReducer = (state = '', action) => state;


export default combineReducers({
  rootReducer,
  courses,
  active,
})
