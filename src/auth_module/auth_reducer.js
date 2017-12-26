import { getStateOrLocalToken, getStateOrLocalDateToken } from './helpers'
const initialState = {
  get: {
    token: getStateOrLocalToken(),
  },
  get_error: null,
  dateLastToken: getStateOrLocalDateToken(),
  signOff: !getStateOrLocalToken(),
}

export default function loginReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_LOGIN_GET_REQUEST':
      return {
        ...state,
        get_error: null,
        get: null,
        signOff: true,
      }

    case 'LOAD_LOGIN_GET_SUCCESS':
      if (!action.payload.token) {
        return {
          ...state,
          get: null,
          get_error: action.payload,
          signOff: true,
        }
      }
      return {
        ...state,
        get: getStateOrLocalToken(action.payload),
        get_error: null,
        signOff: false,
      }

    case 'LOAD_LOGIN_GET_ERROR':
      return {
        ...state,
        dateLastToken: null,
        get: {
          token: null,
        },
        get_error: action.payload,
        signOff: true,
      }

    case 'LAST_TOKEN_SET_SUCCESS':
      return {
        ...state,
        dateLastToken: action.payload,
      }

      case 'SIGN_OFF_SUCCESS':
        return {
          ...initialState,
          dateLastToken: null,
          get: {
            token: null,
          },
          get_error: action.payload,
          signOff: true,
        }

    default:
      return state;
  }
}
