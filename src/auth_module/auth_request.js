import actionAuth from './auth_actions'
import { getStateOrLocalToken, getStateOrLocalDateToken } from './helpers'

export default (store, api, opt = {}) => {
  const NAME_LIBRARY = opt.nameLibrary || 'lib'
  const MAX_TIME_SECOND_UPDATE_TOKEN = opt.maxTimeSecondUpdateToken || 1800
  const JWT_PREFIX = opt.jtwPrefix || 'JWT '
  const JWT_PARAM_NAME = opt.jwtParamName || 'Authorization'
  const UNAUTHORIZED_CODE = opt.unauthorizedCode || 401
  const HEADERS = opt.headers || {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  const secureRequest = (cb, obj = {}) => {

    if (!obj[NAME_LIBRARY].headers) {
      obj[NAME_LIBRARY] = {
        headers: {},
        ...obj[NAME_LIBRARY],
      }
    }

    obj[NAME_LIBRARY].headers = {
      ...obj[NAME_LIBRARY].headers,
      ...HEADERS,
    }

    if (obj.authorization) {
      const state = store.getState()
      let token = getStateOrLocalToken(state.auth.get.token)
      const date = getStateOrLocalDateToken(state.auth.dateLastToken)
      obj[NAME_LIBRARY].headers[JWT_PARAM_NAME] = `${JWT_PREFIX}${token}`

      const lastTime = (new Date().getTime() - date) / 1000

      if (lastTime >= MAX_TIME_SECOND_UPDATE_TOKEN) {
        const getToken = getStateOrLocalToken

        if (!obj.isRefresh) {
          api.refresh({
            token: token,
          }).then(d => {
            if (d.token) {
              store.dispatch(actionAuth(api).loadLoginSuccess(d, store.dispatch))

              const state = store.getState()
              let token = getToken(state.auth.get.token)

              obj[NAME_LIBRARY].headers[JWT_PARAM_NAME] = `${JWT_PREFIX}${token}`
              return cb(obj[NAME_LIBRARY])
            } else {
              store.dispatch(actionAuth(api).logoff('UNAUTHORIZED'))
              return new Promise((res, rej) => rej('UNAUTHORIZED'))
            }
          })
          .catch(error => {
            return error;
          })
        }
      }
    }
    return cb(obj[NAME_LIBRARY])
  }

  const secureResponse = (response, statusCode) => {
    if (statusCode < 200 && statusCode > 299) {
      store.dispatch(actionAuth(api).logoff(statusCode))
      return null
    }
    if (statusCode === UNAUTHORIZED_CODE) {
      store.dispatch(actionAuth(api).logoff(statusCode))
      return null
    }
    return response
  }

  return {
    secureRequest,
    secureResponse,
  }
}
