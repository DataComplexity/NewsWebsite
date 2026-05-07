const express = require('express');
const axios = require('axios');
const router = express.Router();

const STOCKS_API_KEY = process.env.Stocks_API_KEY;

router.get('/', async (req, res) => {
    try {
        // const company = ["AAPL","MSFT","NVDA","AMZN","GOOGL","META","TSLA","BRK","JPM","SAP","ASML","MC","TTE","ROG","SHEL"];
        const company = [
            { symbol: "AAPL", name: "Apple Inc." },
            { symbol: "MSFT", name: "Microsoft Corporation" },
            { symbol: "NVDA", name: "NVIDIA Corporation" },
            { symbol: "AMZN", name: "Amazon.com, Inc." },
            { symbol: "GOOGL", name: "Alphabet Inc." },
            { symbol: "META", name: "Meta Platforms, Inc." },
            { symbol: "TSLA", name: "Tesla, Inc." },
            { symbol: "JPM", name: "JPMorgan Chase & Co." },
            { symbol: "SAP", name: "SAP SE" },
            { symbol: "ASML", name: "ASML Holding N.V." },
            { symbol: "MC", name: "LVMH Moët Hennessy Louis Vuitton SE" },
            { symbol: "TTE", name: "TotalEnergies SE" },
            { symbol: "ROG", name: "Roche Holding AG" },
            { symbol: "SHEL", name: "Shell plc" }
        ];

        const fetchStocks = async (Symbol) => {
            const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${Symbol}&token=${STOCKS_API_KEY}`);
            return response.data;
        }


        const CompanyStockData = await Promise.all(company.map(async (c) => {
            const stockdata = await fetchStocks(c.symbol);
            return {
                symbol: c.symbol,
                name: c.name,
                data: stockdata
            };
        }));

        res.json(CompanyStockData);
    } catch (err) {
        console.error("Error fetching Stock Market data: ", err);
        res.status(500).json({ error: "Failed to fetch Stock Market data!" });
    }
});

module.exports = { router };