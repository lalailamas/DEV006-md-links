// module.exports = () => {
//   // ...
// };
const fs = require("fs");
const ruta = require("path");

//promisify convierte función callback en función basada en promesas
// se le pasa como argumento la función que se desea promisificar
// promisify devuelve una nueva función que se puede utilizar para realizar llamadas a la función original pero con sintaxis de promesas
const { promisify } = require("util");
const pathFile = process.argv[2];

// function mdLinks(path, options = {validate: false}){
//   return new Promise((resolve, reject) => {

// }
// verifico si la ruta es absoluta, si no lo es resolverla como absoluta
const absolutePath = () => { 
  if (ruta.isAbsolute(pathFile)){
    console.log(pathFile, 'esta es una ruta absoluta');
} else {
    const resolvedPath = ruta.resolve(pathFile);
    console.log(resolvedPath, 'transformada en absoluta');
  }
}
absolutePath();

//verifico si la ruta existe 
const checkPath = (ruta) => {
  promisify(fs.access)(ruta)
  .then(()=>{
    console.log('la ruta', ruta, 'existe');
  })
  .catch(()=>{
    console.log('La ruta', ruta, 'no existe');
  })
};
checkPath(pathFile);

//leer contenido del archivo
const readFile = promisify(fs.readFile);
readFile(pathFile, 'utf-8') 
.then((data) => {
  console.log(data, 'leyendo contenido');
})
.catch((error) => {
  console.error(error);
});

//verifico si la ruta es un archivo o un directorio
const stat = promisify(fs.stat);
const isFile = (ruta) => {
  stat(ruta)
    .then((stats) => {
      if (stats.isFile()) {
        console.log('La ruta', ruta, 'es un archivo');
      } else {
        console.log('La ruta', ruta, 'es un directorio');
      }
    })
    .catch((error) => {
      console.error('Error al verificar si es un archivo:', error);
    });
};
isFile(pathFile);
