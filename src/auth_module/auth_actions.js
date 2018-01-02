export default (api) => {
  /**
   * @param info {number}: code http
  **/
  const logoff = (info : number) => ({
    type: '@SIGN_OFF_SUCCESS',
    payload: info,
  })

  const lastTokenSetSuccess = () => ({
    type: '@LAST_TOKEN_SET_SUCCESS',
    payload: new Date().getTime(),
  })

  /**
   * @param login.token {string}: JSON Web Token
  **/
  const loadLoginSuccess = (login : object, dispatch : Function) => {
    dispatch(lastTokenSetSuccess())
    return {
      type: '@LOAD_LOGIN_GET_SUCCESS',
      payload: login,
    }
  }

  /**
   * @param data.username {string}: username
   * @param data.password {string}: password
  **/
  const makeLoginAction = data => {
    return dispatch => {
      dispatch({
        type: '@LOAD_LOGIN_GET_REQUEST',
        payload: null,
      })
      return api.login(data).then(login => {
        dispatch(loadLoginSuccess(login, dispatch))
      })
      .catch(error => {
        dispatch({
          type: '@LOAD_LOGIN_GET_ERROR',
          payload: error,
        })
      })
    }
  }

  return {
    makeLoginAction,
    loadLoginSuccess,
    lastTokenSetSuccess,
    logoff,
  }
}