import express, { json, urlencoded } from 'express';
import {getCouleurs, getNewPaire, getChaussuresDispos, getCouleur} from './logic.js';

const app = express();
const port = 3000;

// Init

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Cors

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (_reqOptions, resOptions) => {
    // allowed XHR methods
    resOptions.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    resOptions.send();
  });
});

// Routes

// app.post('/chaussures', addChaussure);
app.get('/paire/new', getNewPaire);

app.get('/', (_request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/chaussures/dispo', (_request, response) => {
  getChaussuresDispos((chaussures) => {
    response.status(201).send(chaussures);
  })
})

app.get('/couleurs/:id', (request, response) => {
  const id = request.params.id;
  getCouleur(id, (couleur) => {
    response.status(201).send(couleur);
  })
})

app.get("/couleurs", (_request, response) => {
  getCouleurs((couleurs) => {
    response.status(201).send(couleurs.map((couleur) => couleur.value));
  })
})

app.listen(port);
