const express = require('express');

const app = express();
app.use(express.json());

let total = 0;
let count = 0;

/**
 * Accepts a number and returns the running average of all valid
 * numbers submitted since the server started.
 *
 * @name PostAverage
 * @route POST /average
 * @param {import('express').Request} req - The incoming HTTP request.
 * @param {import('express').Response} res - The HTTP response.
 * @param {{number: number}} req.body - The JSON request body.
 * @returns {import('express').Response} The average and count, or an error.
 * @example
 * Request body: { "number": 10 }
 * Response: { "average": 10, "count": 1 }
 */
app.post('/average', (req, res) => {
    const { number } = req.body ?? {};
    
    if(typeof number !== 'number' || !Number.isFinite(number)) {
        return res.status(400).json({ error: 'Invalid input. Please provide a valid number.' });
    }
    total += number;
    count++;

    return res.status(200).json({ 
        average: total / count,
        count, 
    });
});

module.exports = app;
