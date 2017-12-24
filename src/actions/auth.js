import authApi from '../api/Auth'


export const signOff = (info) => ({
  type: 'SIGN_OFF_SUCCESS',
  payload: info,
})

export const lastTokenSetSuccess = () => ({
  type: 'LAST_TOKEN_SET_SUCCESS',
  payload: new Date().getTime(),
})

export function loadLoginSuccess(login, dispatch) {
  dispatch(lastTokenSetSuccess())
  return {
    type: 'LOAD_LOGIN_GET_SUCCESS',
    payload: login,
  }
}

export function loadLogin(data) {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_LOGIN_GET_REQUEST',
      payload: null,
    });
    return authApi.login(data).then(login => {
      dispatch(loadLoginSuccess(login, dispatch))
    }).catch(error => {
      dispatch({
        type: 'LOAD_LOGIN_GET_ERROR',
        payload: error,
      });
    });
  };
}
