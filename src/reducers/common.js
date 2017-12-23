const initialState = {
  item: '/',
}

export function active(state = initialState, action : object) {
  switch(action.type) {
    case 'SET_ACTIVE_LINK':
      action.cb && action.cb()
      return {
        ...state,
        item: action.payload,
      }
    default:
      return state;
  }
}
