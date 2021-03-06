# Instrucciones para utilizar el modulo `JWT AUTH`

- Creare archivo para conectar el modulo auth

```javascript
import apiAuth from './api/Auth' // Api descrita a continuación
import store from './store' // store de redux

import auth from './auth_module' // referencia al modulo

// Inject store and apiAuth : login, refresh
export const request = auth.requestBase(store, apiAuth) // iniciar request
export const actions = auth.actionsBase(apiAuth) // iniciar actions
```

- Utilizar request con JWT que provee este modulo

```javascript
import { request } from '../auth_module_connect'

class Auth {
  static login(data) {
    return request({
      url: tokenAuth,
      method: 'POST',
      body: data,
    }).then(response => {
      return response
    }).catch(error => {
      return error
    });
  }

  static refresh(data) {
    return request({
      url: tokenRefresh,
      method: 'POST',
      body: data,
    }).then(response => {
      return response
    }).catch(error => {
      return error
    });
  }

}
```


- El estado initial del reducer contiene los siguientes atributos

```javascript
const initialState = {
  get: {
    token: 'JWT', //default: null
  },
  get_error: 'Si el Token no viene o existe un error se registrara aquí', //default: null
  dateLastToken: 'Fecha en entero de ultima vez en que se seteo token como timestamp', //default: null
  isLogged: 'Indica si la session esta cerrada', //default: true
}
```

- agregar `middleware`

```javascript
import auth from './auth_module'
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, auth.middlewareBase()),
)
```

- agregar `reducer`

```javascript
import auth from '../auth_module'

const appReducer = combineReducers({
  auth: auth.reducersBase,
})
```

- utilizar api segura con token de autorización
> de debe indicar el parametro authorization como `true` para enviar el token

```javascript
import { request } from '../auth_module_connect'

static getAll() {
  return request({
    url: endpoint,
    method: 'GET',
    authorization: true,
  })
  .then(response => {
    return response
  }).catch(error => {
    return error
  });
}
```

### Acciones disponibles

- makeLoginAction y isLogged

```javascript
import { makeLoginAction, isLogged } from '../../utils/authController/auth_action'

makeLoginAction({
  username: 'admin',
  password: '1234qwer'
})

// Para cerrar sesion existe el metodo
isLogged('incluir la razón por la cual se cierra la sesión')
```
