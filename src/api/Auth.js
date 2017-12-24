import { api } from '../conf/config'
import request from './request'

const tokenAuth = `${api}/api-token-auth/`
const tokenRefresh = `${api}/api-token-refresh/`


class Auth {
  static login(data) {
    return request({
      url: tokenAuth,
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static refresh(data) {
    return request({
      url: tokenRefresh,
      method: 'POST',
      body: JSON.stringify(data),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

}

export default Auth;
