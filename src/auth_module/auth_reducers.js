import { getStateOrLocalToken, getStateOrLocalDateToken } from './helpers'
const initialState = {
  get: {
    token: getStateOrLocalToken(),
  },
  get_error: null,
  dateLastToken: getStateOrLocalDateToken(),
  isLogged: !!getStateOrLocalToken(),
}

export default (state : object = initialState, action : object) => {
  switch(action.type) {
    case '@LOAD_LOGIN_GET_REQUEST':
      return {
        ...state,
      }

    case '@LOAD_LOGIN_GET_SUCCESS':
      if (!action.payload.token) {
        return {
          ...state,
          get: {
            token: null,
          },
          get_error: action.payload,
          isLogged: false,
        }
      }
      return {
        ...state,
        get: getStateOrLocalToken(action.payload),
        get_error: null,
        isLogged: true,
      }

    case '@LOAD_LOGIN_GET_ERROR':
      return {
        ...state,
        dateLastToken: null,
        get: {
          token: null,
        },
        get_error: action.payload,
        isLogged: false,
      }

    case '@LAST_TOKEN_SET_SUCCESS':
      return {
        ...state,
        dateLastToken: action.payload,
      }

    case '@SIGN_OFF_SUCCESS':
      return {
        ...initialState,
        dateLastToken: null,
        get: {
          token: null,
        },
        get_error: action.payload,
        isLogged: false,
      }

    default:
      return state;
  }
}
