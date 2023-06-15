// module.exports = () => {
//   // ...
// };
const fs = require("fs").promises;
const path = require("path");
const pathFile = process.argv[2];

// function mdLinks(path, options = {validate: false}){
//   return new Promise((resolve, reject) => {

// }
// verifico si la ruta es absoluta, si no lo es resolverla como absoluta
const absolutePath = () => { 
  if (path.isAbsolute(pathFile)){
    console.log(pathFile, 'esta es una ruta absoluta');
} else {
    const resolvedPath = path.resolve(pathFile);
    console.log(resolvedPath, 'transformada en absoluta');
  }
}
absolutePath();

//verifico si la ruta existe 
const checkPath = (path) => {
  fs.access(path)
  .then(()=>{
    console.log('la ruta', path, 'existe');
  })
  .catch(()=>{
    console.log('La ruta', path, 'no existe');
  })
};
checkPath(pathFile);

//verifico si la ruta es un archivo o un directorio
// const isFile = (path) => {
//   return fs.stat(path)
//   .then((stats)=>{
//     stats.isFile(),
//     console.log('es un archivo');
//     })
//     .catch(()=>{
//       console.log('es un directorio');
//     })
//   }
// isFile(pathFile);


//   if(fs.stat(path) === stats){
//     console.log(path, 'es un archivo');
//   } else {
//     console.log(path, 'es un directorio');
//   }
// }
// checkType(path);


// fs.stat(path, (err, stats) => {
//   if (err) {
//     console.error('Error al acceder a la ruta:', err);
//     return;
//   }

//   if (stats.isFile()) {
//     console.log('La ruta corresponde a un archivo');
//   } else {
//     console.log('La ruta es un directorio');
//   }
// });
