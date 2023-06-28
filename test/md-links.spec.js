
const { mdLinks } = require("../index.js");
const { extractLinks } = require("../index.js");
const { validateLinks } = require("../index.js");

describe("mdLinks", () => {
  it("debería retornar una promesa que se resuelve con un array de objetos", () => {
    const path = "./probando.md";
    const options = { validate: false };
    return mdLinks(path, options)
      .then((result) => {
        expect(result).toEqual([
          {
            "href": "https://es.wikipedia.org/wiki/Markdown",
            "text": "Markdown",
            "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md",
          },
          {
            "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md",
            "href": "https://nodejs.org/",
            "text": "Node.js",
          },
        ]);
      });
  });

  it("debería retornar los enlaces de un archivo sin validación", () => {
    const path = "./probando.md";
    const options = { validate: false };
    return mdLinks(path, options)
      .then((result) => {
        expect(result).toEqual([
          {
            "href": "https://es.wikipedia.org/wiki/Markdown",
            "text": "Markdown",
            "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md",
          },
          {
            "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md",
            "href": "https://nodejs.org/",
            "text": "Node.js",
          },
        ]);
      });
  });
});

it("debería retornar los enlaces de un directorio sin validar", () => {
  const path = "./holaholahola/jelous.md";
  const options = { validate: false };

  return mdLinks(path, options).then((result) => {
    expect(result).toEqual([
  {
    "href": "https://www.google.com",
    "text": "Google",
    "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola\\jelous.md",

  },
  {
    "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola\\jelous.md",
    "href": "https://www.binance.com/es",
    "text": "Binance",
  },
  {
    "file": "C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola\\jelous.md",
    "href": "https://www.bancoestadocueck.cl",
    "text": "BancoEstardo",
 },
    ]);
  });
});

it("debería retornar los enlaces de un archivo y validarlos", () => {
  const path = "./probando.md";
  const options = { validate: true };

  return mdLinks(path, options).then((result) => {
    expect(result).toEqual(
  [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md',
      status: 200,
      ok: true
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\probando.md',
      status: 200,
      ok: true
    }
  ])
  });
});

it("deberia retornar los enlaces de un directorio y validarlos", () => {
  const path = "./holaholahola";
  const options = { validate: true };
  return mdLinks(path, options).then((result) => {
    expect(result).toEqual([
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 200,
        ok: true
      },
      {
        href: 'https://www.binance.com/es',
        text: 'Binance',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 200,
        ok: true
      },
      {
        href: 'https://www.bancoestadocueck.cl',
        text: 'BancoEstardo',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 'ENOTFOUND',
        ok: false
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 200,
        ok: true
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 200,
        ok: true
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:\\Users\\aleco\\OneDrive\\Documentos\\GitHub\\DEV006-md-links\\holaholahola',
        status: 200,
        ok: true
      }
    ]
    );
  });
});

describe('extractLinks', () => {
  it('debería retornar un array de objetos con los enlaces extraídos', () => {
    const contentFile = `
      Este es un ejemplo de [enlace 1](https://www.example.com) en un archivo de markdown.
      Aquí hay otro [enlace 2](https://www.google.com) más.
    `;
    const absolutePath = '/ruta/absoluta/archivo.md';
    const result = extractLinks(contentFile, absolutePath);
    expect(result).toEqual([
      {
        href: 'https://www.example.com',
        text: 'enlace 1',
        file: '/ruta/absoluta/archivo.md',
      },
      {
        href: 'https://www.google.com',
        text: 'enlace 2',
        file: '/ruta/absoluta/archivo.md',
      },
    ]);
  });
});

describe('validateLinks', () => {
  it('debería retornar un array de objetos con los enlaces validados', () => {
    const linksArray = [
      {
        href: 'https://www.example.com',
        text: 'enlace 1',
        file: '/ruta/absoluta/archivo.md',
      },
      {
        href: 'https://www.google.com',
        text: 'enlace 2',
        file: '/ruta/absoluta/archivo.md',
      },
    ];

    // Mock de axios 
    const axios = {
      get: jest.fn().mockImplementation((url) => {
        if (url === 'https://www.example.com') {
          return Promise.resolve({ status: 200 });
        } else {
          return Promise.resolve({ status: 404 });
        }
      }),
    };
    return validateLinks(linksArray)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://www.example.com',
            text: 'enlace 1',
            file: '/ruta/absoluta/archivo.md',
            status: 200,
            ok: true,
          },
          {
            href: 'https://www.google.com',
            text: 'enlace 2',
            file: '/ruta/absoluta/archivo.md',
            status: null,
            ok: false,
          },
        ]);
      });
  });
});
