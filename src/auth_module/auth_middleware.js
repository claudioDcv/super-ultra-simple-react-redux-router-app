import { setLocalDateToken, setLocalToken } from './helpers'

const auth = () => {
  return store => next => action => {
    if (action.type === 'LOAD_LOGIN_GET_SUCCESS') {
      setLocalToken(action.payload.token)
    }
    if (action.type === 'LAST_TOKEN_SET_SUCCESS') {
      setLocalDateToken(action.payload)
    }
    next(action)
  }
}
export default auth
