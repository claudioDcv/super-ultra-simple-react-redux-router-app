import { combineReducers } from 'redux'
import { active } from './common'
import course from './course'
import courseTemplate from './courseTemplate'
import auth from './auth'
import giphy from './giphy'



const appReducer = combineReducers({
  giphy,
  auth,
  courseTemplate,
  course,
  active,
})

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OFF_SUCCESS') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer




// export default combineReducers({
//   giphy,
//   rootReducer,
//   auth,
//   courseTemplate,
//   course,
//   active,
// })
