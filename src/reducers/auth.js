const initialState = {
  get: {
    token: '',
  },
  get_error: null,
  dateLastToken: '',
  signOff: true,
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
        get: action.payload,
        get_error: null,
        signOff: false,
      }

    case 'LOAD_LOGIN_GET_ERROR':
      return {
        ...state,
        get: null,
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
          signOff: true,
        }

    default:
      return state;
  }
}
