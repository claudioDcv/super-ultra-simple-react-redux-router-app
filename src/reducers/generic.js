export const makeReducerResource = (name, action, state, initial) => {
  switch(action.type) {
    case `${name}_REQUEST`:
      return {
        ...state,
        get_error: initial.get_error,
        get: initial.get,
      }
    case `${name}_SUCCESS`:
      if (action.payload.detail) {
        return {
          ...state,
          get_error: action.payload.detail,
        }
      }
      return {
        ...state,
        get: action.payload,
        get_error: initial.get_error,
      }
    case `${name}_ERROR`:
      return {
        ...state,
        get: initial.get,
        get_error: action.payload,
      }

/************ GET LIST */
    case `${name}_LIST_REQUEST`:
      return {
        ...state,
        getList_error: null,
        getList: null,
      }
    case `${name}_LIST_SUCCESS`:
      if (action.payload.detail) {
        return {
          ...state,
          getList_error: action.payload.detail,
        }
      }
      return {
        ...state,
        getList: action.payload,
        getList_error: null,
      }
    case `${name}_LIST_ERROR`:
      return {
        ...state,
        getList: null,
        getList_error: action.payload,
      }


    default:
      return state;
  }
}
