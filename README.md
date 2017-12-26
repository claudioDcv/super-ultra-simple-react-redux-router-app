# Aplicación creada con:
- React (Manejo de vistas)
- Redux (Manejador de estado)
- fetch (Api JS Nativa para peticiones XHR)
- React Semantic UI (Libreria visual)

Super Ultra Simple App (React, Redux, React Router, React Semantic UI)


# Requerimientos
- yarn
- nodejs

# Instrucciones

- clonar este repo
- ejecutar `yarn install`
- ejecutar `yarn start`

o

- clonar este repo
- ejecutar `yarn install`
- ejecutar `yarn start`




### Instrucciones para utilizar el modulo `JWT AUTH`


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

- agregar `middleware`

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



### Acciones disponibles

```javascript
import { makeLoginAction, signOff } from '../../utils/authController/auth_action'

makeLoginAction({
  username: 'admin',
  password: '1234qwer'
})

// Para cerrar sesion existe el metodo
signOff('incluir la razón por la cual se cierra la sesión')
```




# Estructura del proyecto

## Directorios
- actions: creadores de acciones para redux
- api: peticiones a la api con fetch
- components: sector donde se incluyen todos los componentes de React
- conf: sector para declarar las configuariones de la aplicación
- reducers: directorio donde se encuentrar los reducers de redux
- static: directorio para imagenes/css/font o cualquier estatico
- texts: zona para agregar idiomas de los textos de la aplicacion
- utils: entre otros aqui van los helpers
- view: sección de componentes react, pero que representan el contenedor general de una vista, aunque siguen siendo componentes React, algo importante es que estos componentes seran lons vinculadores con el `ruteo` de la app

## Archivos
- App: generacion de la estructura de rutas para la app
- index: conexion con el store de redux y punto de entrada de la aplicación aqui se indica el target donde iniciara la app de react en el dom
- store: declaracion de store de redux
