import express, { json, urlencoded } from 'express';
import addChaussure from './logic.js';

const app = express();
const port = 3000;

// Init

app.use(json());
app.use(
  urlencoded({
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

app.post('/chaussure', addChaussure);

app.get('/', (_request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}.`);
});
