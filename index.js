const fs = require("fs");
const pathNode = require("path");
const axios = require("axios");
const yargs = require('yargs');

const argv = yargs
  .option('validate', {
    alias: 'v',
    describe: 'Validates the links',
    type: 'boolean',
  })
  .argv;


// verifico si la ruta es absoluta, si no lo es resolverla como absoluta
const path = "./holaholahola/jelous.md";
const absolutePath = (path) => pathNode.isAbsolute(path);
// console.log("¿Ruta absoluta?", absolutePath(path));

const relativePath = (path) => pathNode.resolve(path);
// console.log("Resuelta como absoluta: ", relativePath(path));

//verifico si la ruta existe
const checkPath = (path) => fs.existsSync(path);
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
      }
    });
  });
}

// archivo o directorio?
// const stats = fs.statSync(path);
// if (stats.isFile()) {
//   // Es un archivo
//   readFile(path)
//     .then((data) => {
//       console.log("Contenido del archivo:", data);
//     })
//     .catch((error) => {
//       console.error("Error al leer el archivo:", error);
//     });
// } else if (stats.isDirectory()) {
//   // Es un directorio
//   readDir(path)
//     .then((files) => {
//       console.log("Archivos del directorio:", files);
//     })
//     .catch((error) => {
//       console.error("Error al leer el directorio:", error);
//     });
// } else {
//   console.error("Ruta inválida");
// }

function mdLinks(path, options = { validate: false }) {
  const promiseMdLinks = new Promise((resolve, reject) => {
    const verifyPath = absolutePath(path);

    let pathAbsolute = path;
    if (!verifyPath) {
      pathAbsolute = relativePath(path);
    }
    const pathCheck = checkPath(pathAbsolute);
    if (!pathCheck) {
      reject("No existe la ruta");
    }
    const stats = fs.statSync(pathAbsolute);
    if (stats.isFile()) {
      const contentFile = readFile(pathAbsolute);
      contentFile
        .then((result) => {
          const links = extractLinks(result, pathAbsolute);
          if (!argv.validate) {
            resolve(links);
          } else {
           const validate = validateLinks(links);
           resolve(validate)
          }
        })
        .catch(() => {
          console.log("No se encontró ningún link en este archivo");
        });
    }

    // else { (stats.isDirectory())

    //   const contentDir = readDir(pathAbsolute);
    //   contentDir

    //     .then((result) => {

    //       console.log(result, 'result directorio')
    //       const links = [];
    //       const verifyDir = result.map((links) => {
    //         console.log(links)
    //       });
    //       console.log(verifyDir, "contenido archivo");

    // console.log(result, "resultado directorio");
    // const links = [];
    // files.forEach(() => {
    //   const fileLinks = parseMarkdownLinks(file.content);
    //   links.push(fileLinks);
    // });
    // resolve(result, "resultado directorio");
    // })
    // .catch((error) => {
    //   console.error("No se encontró ningún link en este directorio", error);
    // });
    //     } else if () {
    //   reject("Ruta no existe");
    // }
    // }

    // else {
    //   reject("Ruta no válida");
    // }
  });

  return promiseMdLinks;
}

function extractLinks(contentFile, absolutePath) {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  const array = [...contentFile.matchAll(regexMdLinks)];
  const linksArray = array.map((object) => {
    return {
      href: object[2].replace(/^(\()|(\))$/g, ""),
      text: object[1],
      file: absolutePath,
    };
  });
  return linksArray;
}

function validateLinks(linksArray) {
  const promises = linksArray.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        console.log('estoy aqui')
        const status = response.status;
        const statusText = response.statusText;
        const ok = status === 200;
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status,
          statusText,
          ok,
        };
      })
      .catch((error) => {
        console.log('Error al validar el link:', error.message);
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status: null,
          statusText: '',
          ok: false,
        };
      });
  });
  return Promise.all(promises);
}





  // links.forEach((link) => {
  //     axios.get(link.href)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // console.log(response.status);       
  //         console.log("Link Válido: ", link.href, link.statusText);
  //       } else {
  //         console.log("Link NO válido", link.href);
  //       }
  //     })
  //     .catch(() => {
  //       console.log("Error al validar el link", link.href);
  //   });
  // });


const resultPromise = mdLinks("./holaholahola/jelous.md");
resultPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
