const fs = require("fs");
const path = require("path");
const pathFile = process.argv[2];

// Verificar si la ruta es absoluta, si no lo es, resolverla como absoluta
function absolutePath() {
  if (path.isAbsolute(pathFile)) {
    console.log("Esta es una ruta absoluta:", pathFile);
  } else {
    const resolvedPath = path.resolve(pathFile);
    console.log("Resuelta como absoluta:", resolvedPath);
  }
}
absolutePath();

// Verificar si la ruta existe
function checkPath(ruta) {
  if (fs.existsSync(ruta)) {
    console.log("La ruta existe");
  } else {
    console.log("La ruta no existe");
  }
}
checkPath(pathFile);

// Leer contenido del archivo
function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf-8", (err, data) => {
      if (err) {
        reject("Error al leer el archivo");
      } else {
        resolve(data);
      }
    });
  });
}

// Leer archivos de un directorio
function readDir(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathFile, "utf-8", (err, files) => {
      if (err) {
        reject("Error al leer el directorio");
      } else {
        resolve(files);
      }
    });
  });
}

// Verificar si la ruta es un archivo o un directorio
function isFileOrDirectory(pathFile) {
  return new Promise((resolve, reject) => {
    fs.stat(pathFile, (error, stats) => {
      if (error) {
        reject("Error al leer la ruta");
      } else {
        resolve(stats);
      }
    });
  });
}

isFileOrDirectory(pathFile)
  .then((stats) => {
    if (stats.isFile()) {
      console.log("Es un archivo");
      return readFile(pathFile);

    } else if (stats.isDirectory()) {
      console.log("Es un directorio");
      return readDir(pathFile);
    }
  })
  .then((data) => {
    console.log("Contenido:", data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
