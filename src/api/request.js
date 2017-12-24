import store from '../store'
import api from './Auth'
import { loadLoginSuccess, signOff } from '../actions/auth'

const MAX_TIME_SECOND_UPDATE_TOKEN = 1800 // 30 minutos

let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);

        obj.headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...obj.headers,
        };
        if (obj.authorization) {
          const state = store.getState()
          let token = state.auth.get.token
          const date = state.auth.dateLastToken
          if (date) {
            const lastTime = (new Date().getTime() - date) / 1000
            if (lastTime >= MAX_TIME_SECOND_UPDATE_TOKEN) {
              api.refresh({
                token: token,
              }).then(d => {
                store.dispatch(loadLoginSuccess(d, store.dispatch))
              })
            }
          }

          obj.headers['Authorization'] = `JWT ${token}`
        }
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                if (xhr.status === 401) {
                  store.dispatch(signOff(xhr.status))
                }
                reject(JSON.parse(xhr.response))
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

export default request
