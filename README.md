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
- ejecutra `yarn start`

o

- clonar este repo
- `npm install`
- `npm start`


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
