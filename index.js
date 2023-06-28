const fs = require("fs");
const pathNode = require("path");
const axios = require("axios");

const absolutePath = (path) => pathNode.isAbsolute(path);
const relativePath = (path) => pathNode.resolve(path);
const checkPath = (path) => fs.existsSync(path);

const path = "./holaholahola/jelous.md";
const filterExtension = pathNode.extname(path);

//leer contenido del archivo y filtrar los .md
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
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

//leer archivos de un directorio y filtrar los .md
function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, "utf-8", (err, files) => {
      if (err) {
        reject("Error al leer el directorio");
      } else {
        files.forEach(() => {});
        const markdownFiles = files.filter((file) => pathNode.extname(file) === ".md");
        resolve(markdownFiles);
      }
    });
  });
}

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
          if (!options.validate) {
            resolve(links);
          } else {
            const validate = validateLinks(links);
            resolve(validate);
          }
        })
        .catch(() => {
          console.log("No se encontró ningún link en este archivo");
        });
    }
    if (stats.isDirectory()) {
      const contentDir = readDir(pathAbsolute);
      contentDir.then((files) => {
        files.forEach((file) => {
          const filePath = pathNode.join(pathAbsolute, file);
          const fileStats = fs.statSync(filePath);
          if (fileStats.isFile()) {
            const contentFile = readFile(filePath);
            contentFile
              .then((result) => {
                const links = extractLinks(result, pathAbsolute);
                if (!options.validate) {
                  resolve(links);
                } else {
                  const validate = validateLinks(links);
                  resolve(validate);
                }
              })
              .catch(() => {
                console.log("No se encontró ningún link en este directorio");
              });
          }
        });
      });
    }
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
    return axios
      .get(link.href)
      .then((response) => {
        const status = response.status;
        const ok = status === 200;
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status,
          ok,
        };
      })
      .catch((error) => {
        const status = error.response ? error.response.status : error.code;
        const ok = false;
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status,
          ok,
        };
      });
  });
  return Promise.all(promises);
}

const resultPromise = mdLinks("./holaholahola/jelous.md", { validate: true });
resultPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
