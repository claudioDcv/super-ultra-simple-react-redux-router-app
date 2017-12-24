const showActions = (flag = false) => {
  if (flag) {
    return store => next => action => {
      console.log(`%c Action: ${action.type} `, 'background: #555555; color: #e9e9e9')
      console.log('%cprev:', 'background: ; color: red', store.getState())
      next(action);
      console.log('%cnext:', 'background: ; color: green', store.getState())
    }
  } else {
    return store => next => action => {
      next(action);
    }
  }
}

export default showActions
