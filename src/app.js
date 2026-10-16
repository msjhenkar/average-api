const express = require('express');

const app = express();
app.use(express.json());

let total = 0;
let count = 0;

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
