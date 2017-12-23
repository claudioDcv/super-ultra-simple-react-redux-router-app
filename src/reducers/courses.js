const initialState = {
  list: {
    results: [],
  },
  get: null,
  update: null,
  create: null,
  delete: null,
}

export default function catReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_COURSE_GET_REQUEST':
      return {
        ...state,
        get: null,
      }
    case 'LOAD_COURSE_GET_SUCCESS':
      return {
        ...state,
        get: action.payload,
      }

    case 'LOAD_COURSE_LIST_SUCCESS':
      return {
        ...state,
        list: action.payload,
      }

    default:
      return state;
  }
}
