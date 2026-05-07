const express = require('express');
const router = express.Router();
const News = require('../models/Article');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 99;
        const skip = (page - 1) * limit;

        // Cap at latest 10,000 articles.
        const maxArticles = 10000;

        // Optimization: Use the new persistent language field instead of a regex
        const englishFilter = { language: "en" };

        const count = await News.countDocuments(englishFilter);
        const total = Math.min(count, maxArticles);
        const safeLimit = Math.min(limit, Math.max(0, maxArticles - skip));

        let articles = [];
        if (safeLimit > 0) {
            articles = await News.find(englishFilter)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(safeLimit);
        }

        res.json({
            articles,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("Home page error:", error);
        res.status(500).json({ error: "Failed to fetch home articles!" });
    }
});

module.exports = router;
