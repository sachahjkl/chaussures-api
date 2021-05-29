const pool = require('./db');

const addChaussure = (request, response) => {
    const { color, length } = request.body;

    if (colors.indexOf(color) === -1) {
        response.status(400).send(`Color ${color} not in available colors ${colors}`);
    }

    pool.query('INSERT INTO chaussure (color, length) VALUES ($1, $2)', [color, length], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`);
    });
};

export default {
    addChaussure
};