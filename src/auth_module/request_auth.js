import { getStore, getApi } from './conect'

import { loadLoginSuccess, signOff } from './auth_action'
import { getStateOrLocalToken } from './helpers'
const MAX_TIME_SECOND_UPDATE_TOKEN = 1800
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

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
          if (xhr.status === 401) {
            getStore().dispatch(signOff(xhr.status))
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
          const state = getStore().getState()
          let token = getStateOrLocalToken(state.auth.get.token)
          obj.headers['Authorization'] = `JWT ${token}`
          const date = state.auth.dateLastToken
          if (date) {
            const lastTime = (new Date().getTime() - date) / 1000
            if (lastTime >= MAX_TIME_SECOND_UPDATE_TOKEN) {
              getApi().refresh({
                token: token,
              }).then(d => {
                getStore().dispatch(loadLoginSuccess(d, getStore().dispatch))

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

export default request
