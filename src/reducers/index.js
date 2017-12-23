import { combineReducers } from 'redux'
import courses from './courses'
import { active } from './common'

import giphy from './giphy'

const rootReducer = (state = '', action) => state;


export default combineReducers({
  giphy,
  rootReducer,
  courses,
  active,
})
