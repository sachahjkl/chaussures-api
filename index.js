const express = require('express');
const app = express();
const port = 3000;

const { colors } = require("./types.js");

// Init

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Cors

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// Routes

app.post('/chaussure', require('./logic.js').default.addChaussure);

app.get('/', (_request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
