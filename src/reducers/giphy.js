const initialState = {
  list: {
    results: [],
  },
  get: {
    data: null,
  },
  update: null,
  create: null,
  delete: null,

  list_error: null,
  get_error: null,
}

export default function giphyReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_GIPHY_GET_REQUEST':
      return {
        ...state,
        get_error: null,
        get: {
          data: null,
        },
      }
    case 'LOAD_GIPHY_GET_SUCCESS':
      if (action.payload.detail) {
        return {
          ...state,
          get_error: action.payload.detail,
        }
      }
      return {
        ...state,
        get: action.payload,
      }
    case 'LOAD_GIPHY_GET_ERROR':
      return {
        ...state,
        get_error: action.payload,
      }

    case 'LOAD_GIPHY_LIST_REQUEST':
      return {
        ...state,
        list: {
          results: [],
        },
      }
    case 'LOAD_GIPHY_LIST_SUCCESS':
      return {
        ...state,
        list: action.payload,
      }

    case 'LOAD_GIPHY_LIST_ERROR':
      return {
        ...state,
        list_error: action.payload,
      }

    default:
      return state;
  }
}
