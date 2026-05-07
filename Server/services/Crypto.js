const express = require('express');
const axios = require('axios');
const router = express.Router();

const CRYPTO_API = process.env.Stocks_API_KEY;

router.get("/", async (req, res) => {
    try {
        const crypto = [
            { symbol: "BINANCE:BTCUSDT", name: "Bitcoin" },
            { symbol: "BINANCE:ETHUSDT", name: "Ethereum" },
            { symbol: "BINANCE:BNBUSDT", name: "Binance Coin" },
            { symbol: "BINANCE:ADAUSDT", name: "Cardano" },
            { symbol: "BINANCE:XRPUSDT", name: "Ripple" },
            { symbol: "BINANCE:SOLUSDT", name: "Solana" },
            { symbol: "BINANCE:DOGEUSDT", name: "Dogecoin" },
            { symbol: "BINANCE:MATICUSDT", name: "Polygon" },
            { symbol: "BINANCE:LTCUSDT", name: "Litecoin" },
            { symbol: "BINANCE:AVAXUSDT", name: "Avalanche" }
        ];

        const fetchCrypto = async (Symbol) => {
            const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${Symbol}&token=${CRYPTO_API}`);
            return response.data;
        }

        const cryptoData = await Promise.all(crypto.map(async (s) => {
            const data = await fetchCrypto(s.symbol);
            return {
                symbol: s.symbol,
                name: s.name,
                data: data
            };
        }));
        res.json(cryptoData);
    }

    catch (error) {
        console.error("Error in fetching crypto data: ", error);
        res.status(500).json({ error: "Failed to fetch crypto data!" });
    }
});

module.exports = { router };