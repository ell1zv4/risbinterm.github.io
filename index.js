const express = require('express');
const bodyParser = require('body-parser');

// Definición de los caracteres que se parecen a "google.com"
const charMap = {
  'g': ['ɡ', 'ց', 'ԍ', 'ɢ'],
  'o': ['ο', 'о', 'օ'],
  'l': ['ⅼ', 'ӏ'],
  'e': ['е', 'ҽ'],
  'c': ['с', 'ϲ'],
  'm': ['м', 'ɱ']
};

// Función para generar una cadena acortada que se vea como "google.com"
const generateFakeGoogleUrl = () => {
  const base = 'googlecom'; // Base para la similitud visual
  let fakeUrl = '';

  // Para cada letra en "googlecom", seleccionamos un carácter aleatorio del conjunto definido
  for (let char of base) {
    const options = charMap[char] || [char]; // Si la letra no está en el mapa, se queda igual
    fakeUrl += options[Math.floor(Math.random() * options.length)];
  }

  return fakeUrl;
};

// Crear un objeto en memoria para almacenar las URLs
const urlMappings = {};

// Crear el servidor Express
const app = express();
const port = 80;

// Middleware para analizar JSON
app.use(bodyParser.json());

// Ruta para acortar la URL
app.post('/shorten', (req, res) => {
  const { originalUrl, redirectUrl } = req.body;
  
  if (!originalUrl || !redirectUrl) {
    return res.status(400).json({ error: 'Se requieren originalUrl y redirectUrl' });
  }

  // Generar una URL acortada que visualmente se parezca a "google.com"
  const id = generateFakeGoogleUrl();

  // Almacenar la URL en memoria (sin base de datos)
  urlMappings[id] = redirectUrl;

  res.json({ shortenedUrl: http://localhost:${port}/${id} });
});

// Ruta para redirigir desde la URL acortada
app.get('/:id', (req, res) => {
  const id = req.params.id;

  // Buscar la URL en memoria
  const redirectUrl = urlMappings[id];

  if (!redirectUrl) {
    return res.status(404).json({ error: 'URL no encontrada' });
  }

  // Redirigir a la URL destino
  res.redirect(redirectUrl);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(Servidor escuchando en http://localhost:${port});
});
