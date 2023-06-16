const fs = require("fs");
const ruta = require("path");
const pathFile = process.argv[2];

const arr = [ 'jelous.md', 'md.js', 'prueba.md' ];
const result = arr.filter( md => ruta.extname(pathFile) === '.md');
console.log(result);