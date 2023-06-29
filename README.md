# Markdown Links Lalailamas

## Contenido

* [1. Descripción](#1-resumen)
* [2. Instalación](#2-instalación)
* [3. Uso ](#3-uso)

***

## 1. Descripción

`Markdown` es un lenguaje de marcado que permite verificar links que contengan y así verificar 
que sean válidos. 

Con esta librería podrás analizar los vínculos que se encuentren en archivos o directorios y que tengan la extensión `.md`.
Está desarrollado en Node.js con el módulo FileSystem, Path y Axios. 


## 3. Instalación

Ejecuta el comando `npm install lalailamas/DEV006-md-links` (debes tener Nodejs instalado).


## 4. Uso

La librería cuenta con esta interfaz 
`mdLinks(path, options)`

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node -index.js
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

La función **retorna una promesa** (`Promise`) que **resuelve un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto dentro del link
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto dentro del link
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `error` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```
