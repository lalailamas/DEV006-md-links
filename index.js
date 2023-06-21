const fs = require("fs");
// const ruta = require("path");
const pathNode = require("path");
const markdownIt = require("markdown-it");

// verifico si la ruta es absoluta, si no lo es resolverla como absoluta
const path = "./holaholahola/";
const absolutePath = (path) => pathNode.isAbsolute(path);
// console.log("¿Ruta absoluta?", absolutePath(path));

const relativePath = (path) => pathNode.resolve(path);
// console.log("Resuelta como absoluta: ", relativePath(path));

//verifico si la ruta existe
const checkPath = () => fs.existsSync(path);
// console.log("¿Existe?", checkPath(path));

const filterExtension = pathNode.extname(path);

//leer contenido del archivo
function readFile(path) {
  return new Promise((resolve, reject) => {
    const extFile = fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject("Error al leer el archivo");
      } else {
        if (filterExtension === ".md") {
          resolve(data);
        } else {
          console.error("El archivo no tiene extension .md");
        }
      }
    });
  });
}

//leer archivos de un directorio y filtrar los .md con ruta absoluta
function readDir(path) {
  return new Promise((resolve, reject) => {
    const extDir = fs.readdir(path, "utf-8", (err, files) => {
      if (err) {
        reject("Error al leer el directorio");
      } else {
        files.forEach((file) => {});
        const markdownFiles = files.filter(
          (file) => pathNode.extname(file) === ".md"
        );
        resolve(markdownFiles);
        //TODO: TRAER LA INFO DE CADA ARCHIVO FILTRADO .MD
      }
    });
  });
}

// archivo o directorio?
const stats = fs.statSync(path);
if (stats.isFile()) {
  // Es un archivo
  readFile(path)
    .then((data) => {
      console.log("Contenido del archivo:", data);
    })
    .catch((error) => {
      console.error("Error al leer el archivo:", error);
    });
} else if (stats.isDirectory()) {
  // Es un directorio
  readDir(path)
    .then((files) => {
      console.log("Archivos del directorio:", files);
    })
    .catch((error) => {
      console.error("Error al leer el directorio:", error);
    });
} else {
  console.error("Ruta inválida");
}
// const stats = fs.statSync(path);
// const filterExtension = pathNode.extname(path);

// function mdLinks(path, options = { validate: false }) {
//   const promiseMdLinks = new Promise((resolve, reject) => {
//     const pathAbsolute = absolutePath(path);
//     if (!pathAbsolute) {
//       const pathRelative = relativePath(path);
//     }
//     if (pathAbsolute && pathCheck);
//     {
//       const pathCheck = checkPath();
//     }
//     if (stats.isFile() && filterExtension === ".md") {
//       const contentFile = readFile(path);
//       contentFile
//         .then((result) => {
//           // const links = parseMarkdownLinks(contentFile);
//           resolve(result);
//         })
//         .catch((error) => {
//           console.error("No se encontró ningún link en este archivo", error);
//         });
//     } else  (stats.isDirectory()); {
//       const contentDir = readDir(path);
// contentDir
//   .then((result) => {
//   console.log(result, 'resultado directorio')
// const links = [];
// files.forEach(() => {
// const fileLinks = parseMarkdownLinks(file.content);
// links.push(fileLinks);
// })
// resolve(links, "resultado directorio");
// })
// .catch((error) => {
//   console.error("No se encontró ningún link en este directorio", error);
// });
// }

//         readFile(pathFile)
//           .then((content) => {
//             const links = parseMarkdownLinks(content);
//             resolve(links);
//           })
//           .catch((error) => {
//             reject("No se encontró ningún link en este archivo", error);
//           });
//       } else if (stats.isDirectory() && filterExtension === ".md") {
//         filterExtension = path.extname(pathFile);
//         readDir(pathFile)
//           .then((files) => {
//             const links = [];
//             files.forEach((file) => {
//               const fileLinks = parseMarkdownLinks(file.content);
//               links.push(fileLinks);
//             });
//             resolve(links);
//           })
//           .catch((error) => {
//             reject("No se encontró ningún link en este directorio", error);
//           });
//       } else {
//         reject("Ruta no existe");
//       }
//     } else {
//       reject("Ruta no válida");
//     }
// });

// return promiseMdLinks;
// }

function parseMarkdownLinks(markdownContent) {
  const md = markdownIt();
  const tokens = md.parse(markdownContent); //fn parse se usa para analizar el contenido del Markdown
  const links = [];

  tokens.forEach((token) => {
    if (token.type === "inline" && token.tag === "a") {
      const link = {
        href: token.attrs[0][1], //matriz de pares clave-valor, valor del atributo href, URL del enlace extraido
        text: token.children[0].content, //texto dentro del enlace (el primer elemento secundario)
      };
      links.push(link);
    }
  });

  return links;
}

// const resultPromise = mdLinks("./holaholahola/jelous.md");
// resultPromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function mdLinks(ruta, options = { validate: false }) {
//   const promiseMdLinks = new Promise((resolve, reject) => {
//     if (ruta === ruta.isAbsolute && checkPath === true) {
//       if (ruta === relativePath()) {
//         ruta.resolve(pathFile);
//       }
//       const stats = fs.statSync(pathFile);
//       const filterExtension = ruta.extname(pathFile);
//       if (stats.isFile() && filterExtension === ".md") {
//         readFile(ruta)
//           .then(() => {
//             arrFile = [];
//             const links = [
//               { href: ruta.href, text: ruta.text, file: ruta.file },
//             ];
//             arrFile.push(links);
//             resolve(links);
//           })
//           .catch((error) => {
//             reject("No se encontró ningún link en este archivo", error);
//           });
//       } else if (stats.isDirectory() && filterExtension === ".md") {
//         readDir(ruta)
//           .then((files) => {
//             const arrDir = [];
//             files.forEach((file) => {
//               const links = [
//                 { href: ruta.href, text: ruta.text, file: ruta.file },
//               ];
//               arrDir.push(links);
//             });
//             resolve(links);
//           })
//           .catch((error) => {
//             reject("No se encontró ningún link en este directorio", error);
//           });
//         } else if (options.validate){
//           links.forEach((link) =>{
//             link.status= 200;
//             link.ok= true;
//           });
//       } else {
//       reject("Ruta no existe");
//     }
//   };
//     });

//   return promiseMdLinks;
// }

// const resultPromise = mdLinks(process.argv[2]);
// resultPromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function mdLinks(ruta, options = { validate: false }) {
//   const promiseMdLinks = new Promise((resolve, reject) => {
//     if (ruta === ruta.isAbsolute && checkPath() === true) {
//       // Lógica para manejar una ruta absoluta existente
//       if (options.validate) {
//         // Realizar validación de enlaces
//         const result = validateLinks(ruta);
//         resolve(result);
//       } else {
//         // Obtener los enlaces sin validación
//         const result = getLinks(ruta);
//         resolve(result);
//       }
//     } else if (/* otra condición */) {
//       // Lógica para manejar otra condición
//       // ...
//     } else {
//       reject("Ruta inválida");
//     }
//   });

//   return promiseMdLinks;
// }

// function checkPath() {
//   return fs.existsSync(pathFile);
// }

// function getLinks(ruta) {
//   // Lógica para obtener los enlaces sin validación
//   // ...
// }

// function validateLinks(ruta) {
//   // Lógica para validar los enlaces
//   // ...
// }
