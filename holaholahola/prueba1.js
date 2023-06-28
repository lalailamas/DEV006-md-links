console.log('holaaaaa');


//librería nativa fs (FileSystem), es un módulo de Node.js que proporciona una API para interactuar con el sistema de archivos del
//sistema operativo. 
const fs = require('fs');
const path = require('path');

const filePath = './holaholahola/prueba.md';
const dir = './holaholahola';

//utf-8 es la codificación para obtener el contenido como un string
//función para leer contenido del archivo
fs.readFile(filePath, 'utf-8', function(err, data) {
  if(err){
    console.error(err);
    return;
}
// console.log(data);
});

//para saber su extensión
const extension = path.extname(filePath);
console.log(extension);

//para obtener el contenido de un directorio
const paths = fs.readdirSync(dir);
console.log(paths);

//unir 2 rutas
const path1 = './holaholahola/prueba.md';
const path2 = './README.md';
const path3 = path.join(path1, path2);
console.log(path3);