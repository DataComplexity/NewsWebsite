const express = require('express');
const currency = express.Router();

currency.get('/', async (req, res) => {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching the data!", error);
        res.status(500).json({ error: "Error fetching the data!" });
    }
});

module.exports = { currency };