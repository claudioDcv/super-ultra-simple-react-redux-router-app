# Instrucciones para utilizar el modulo `JWT AUTH`


- El estado initial del reducer contiene los siguientes atributos

```javascript
const initialState = {
  get: {
    token: 'JWT', //default: null
  },
  get_error: 'Si el Token no viene o existe un error se registrara aquí', //default: null
  dateLastToken: 'Fecha en entero de ultima vez en que se seteo token como timestamp', //default: null
  signOff: 'Indica si la session esta cerrada', //default: true
}
```

- agregar `middleware`

```javascript
import auth from './utils/authController/auth_middleware'

const store = createStore(
  rootReducer,
  applyMiddleware(auth()),
);
```

- agregar `reducer`

```javascript
import auth from '../utils/authController/auth_reducer'

const appReducer = combineReducers({
  auth,
})
```

- utilizar request segura

```javascript
import request from '../utils/authController/request_auth'

const login = (data) => {
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
```
- utilizar api segura con token de autorización
> de debe indicar el parametro authorization como `true` para enviar el token

```javascript
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

- makeLoginAction


```javascript
import { makeLoginAction, signOff } from '../../utils/authController/auth_action'

makeLoginAction({
  username: 'admin',
  password: '1234qwer'
})

// Para cerrar sesion existe el metodo
signOff('incluir la razón por la cual se cierra la sesión')
```
