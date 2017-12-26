import { getApi } from './conect'

/**
 * @param info {number}: code http
**/
export const signOff = (info) => ({
  type: 'SIGN_OFF_SUCCESS',
  payload: info,
})

export const lastTokenSetSuccess = () => ({
  type: 'LAST_TOKEN_SET_SUCCESS',
  payload: new Date().getTime(),
})

/**
 * @param login.token {string}: JSON Web Token
**/
export const loadLoginSuccess = (login, dispatch) => {
  dispatch(lastTokenSetSuccess())
  return {
    type: 'LOAD_LOGIN_GET_SUCCESS',
    payload: login,
  }
}

/**
 * @param data.username {string}: username
 * @param data.password {string}: password
**/
export const makeLoginAction = data => {
  return dispatch => {
    dispatch({
      type: 'LOAD_LOGIN_GET_REQUEST',
      payload: null,
    });
    return getApi().login(data).then(login => {
      dispatch(loadLoginSuccess(login, dispatch))
    }).catch(error => {
      dispatch({
        type: 'LOAD_LOGIN_GET_ERROR',
        payload: error,
      });
    });
  };
}
