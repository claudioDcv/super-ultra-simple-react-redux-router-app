const initialState = {
  getList: [],
  getList_error: null,
}

export default function courseTemplateReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_COURSE_TEMPLATE_GET_REQUEST':
      return {
        ...state,
        getList_error: null,
        getList: [],
      }
    case 'LOAD_COURSE_TEMPLATE_GET_SUCCESS':
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
    case 'LOAD_COURSE_TEMPLATE_GET_ERROR':
      return {
        ...state,
        getList: [],
        getList_error: action.payload,
      }
    default:
      return state;
  }
}
