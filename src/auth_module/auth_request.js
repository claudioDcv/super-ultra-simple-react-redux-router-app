import actionAuth from './auth_actions'
import { getStateOrLocalToken } from './helpers'
const MAX_TIME_SECOND_UPDATE_TOKEN = 1800
const JWT_PREFIX = 'JWT '
const JWT_PARAM_NAME = 'Authorization'
const UNAUTHORIZED_CODE = 401
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export default (store, api) => {
  const { loadLoginSuccess, signOff } = actionAuth(api)
  const get = (obj, xhr, resolve, reject) => {
    if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
            try {
              xhr.setRequestHeader(key, obj.headers[key]);
            } catch (err) {

            }
        });
    }
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
        } else {
            if (xhr.status === UNAUTHORIZED_CODE) {
              store.dispatch(signOff(xhr.status))
            }
            reject(JSON.parse(xhr.response))
        }
    };
    xhr.onerror = () => reject(xhr.statusText);

    let body = obj.body
    if (typeof obj.body === 'object') {
      body = JSON.stringify(obj.body)
    }
    xhr.send(body)

  }

  let request = obj => {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          let isSend = false
          xhr.open(obj.method || 'GET', obj.url);

          obj.headers = {
            ...HEADERS,
            ...obj.headers,
          };
          if (obj.authorization) {
            const state = store.getState()
            let token = getStateOrLocalToken(state.auth.get.token)
            obj.headers[JWT_PARAM_NAME] = `${JWT_PREFIX}${token}`
            const date = state.auth.dateLastToken
            if (date) {
              const lastTime = (new Date().getTime() - date) / 1000
              if (lastTime >= MAX_TIME_SECOND_UPDATE_TOKEN) {
                api.refresh({
                  token: token,
                }).then(d => {
                  store.dispatch(loadLoginSuccess(d, store.dispatch))

                  let xhrNew = new XMLHttpRequest();
                  xhrNew.open(obj.method || 'GET', obj.url);
                  if (!isSend) {
                    get(obj, xhrNew, resolve, reject)
                    isSend = true
                  }
                })
              }
            }
          }
          if (!isSend) {
            get(obj, xhr, resolve, reject)
            isSend = true
          }
      });
  };

  return request
}
