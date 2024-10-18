const express = require('express');
const bodyParser = require('body-parser');

const charMap = {
  'g': ['ɡ', 'ց'],
  'o': ['ο', 'о', 'օ'],
  'l': ['ⅼ'],
  'e': ['е'],
  'c': ['с', 'ϲ'],
  'm': ['м']
};

const generateFakeGoogleUrl = () => {
  const base = 'googlecom'; 
  let fakeUrl = '';

  for (let char of base) {
    const options = charMap[char] || [char]; 
    fakeUrl += options[Math.floor(Math.random() * options.length)];
  }

  return fakeUrl;
};

const urlMappings = {};

const app = express();
const port = 80;

app.use(bodyParser.json());

app.post('/shorten', (req, res) => {
  const { originalUrl, redirectUrl } = req.body;
  
  if (!originalUrl || !redirectUrl) {
    return res.status(400).json({ error: 'Se requieren originalUrl y redirectUrl' });
  }

  const id = generateFakeGoogleUrl();

  urlMappings[id] = redirectUrl;

  res.json({ shortenedUrl: http://localhost:${port}/${id} });
});


app.get('/:id', (req, res) => {
  const id = req.params.id;

  const redirectUrl = urlMappings[id];

  if (!redirectUrl) {
    return res.status(404).json({ error: 'URL no encontrada' });
  }

  res.redirect(redirectUrl);
});

app.listen(port, () => {
  console.log(Servidor escuchando en http://localhost:${port});
});
