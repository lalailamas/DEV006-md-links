const fs = require("fs");
const ruta = require("path");
const pathFile = process.argv[2];

// verifico si la ruta es absoluta, si no lo es resolverla como absoluta
const absolutePath = (ruta) => ruta.isAbsolute(pathFile);
console.log("¿Ruta absoluta?", absolutePath(ruta));

const relativePath = (ruta) => ruta.resolve(pathFile);
console.log("Resuelta como absoluta: ", relativePath(ruta));

//verifico si la ruta existe
const checkPath = () => fs.existsSync(pathFile);
console.log("¿Existe?", checkPath(ruta));

//leer contenido del archivo
function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    const extFile = fs.readFile(pathFile, "utf-8", (err, data) => {
      if (err) {
        reject("Error al leer el archivo");
      } else {
        const filterExtension = ruta.extname(pathFile);
        if (filterExtension === ".md") {
          resolve(data, extFile);
        } else {
          console.error("El archivo no tiene extension .md");
        }
      }
    });
  });
}

//leer archivos de un directorio y filtrar los .md con ruta absoluta
function readDir(pathFile) {
  return new Promise((resolve, reject) => {
    const extDir = fs.readdir(pathFile, "utf-8", (err, files) => {
      if (err) {
        reject("Error al leer el directorio");
      } else {
        const arrRoute = [];
        files.forEach((file) => {
          const filterExtension = ruta.extname(file);
          if (filterExtension === ".md") {
            const relativePath = ruta.resolve(file);
            arrRoute.push(relativePath);
          }
        });
        resolve(arrRoute, extDir);
      }
    });
  });
}

//archivo o directorio?
const stats = fs.statSync(pathFile);
if (stats.isFile()) {
  // Es un archivo
  readFile(pathFile)
    .then((data) => {
      console.log("Contenido del archivo:", data);
    })
    .catch((error) => {
      console.error("Error al leer el archivo:", error);
    });
} else if (stats.isDirectory()) {
  // Es un directorio
  readDir(pathFile)
    .then((files) => {
      console.log("Archivos del directorio:", files);
    })
    .catch((error) => {
      console.error("Error al leer el directorio:", error);
    });
} else {
  console.error("Ruta inválida");
}
