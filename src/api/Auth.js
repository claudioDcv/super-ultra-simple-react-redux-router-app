import axios from 'axios'
import { api } from '../conf/config'

import { secure } from '../auth_module_connect'

const endpointAuth = `${api}/api-token-auth/`
const endpointRefresh = `${api}/api-token-refresh/`


class Auth {

  static login(data) {
    return axios({
      url: endpointAuth,
      method: 'POST',
      data,
    })
    .then(response => secure.secureResponse(response, response.status).data)
    .catch(error => error)
  }

  static refresh(data) {
    return secure.secureRequest((config) => axios(config), {
      lib: {
        url: endpointRefresh,
        method: 'POST',
        data,
      },
      authorization: true,
      isRefresh: true,
    })
    .then(response => secure.secureResponse(response, response.status).data)
    .catch(error => error.response.data)
  }

}

export default Auth;
