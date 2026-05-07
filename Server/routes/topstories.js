const express = require("express");
const topstories = express.Router();
const News = require("../models/Article");

topstories.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 99;
        const skip = (page - 1) * limit;

        // Hard cap at 1000 articles for Top Stories
        const maxArticles = 1000;
        let count = await News.countDocuments();
        const total = Math.min(count, maxArticles);

        // Prevent fetching items beyond the 1000th article on the final page
        const safeLimit = Math.min(limit, Math.max(0, maxArticles - skip));

        let articles = [];
        if (safeLimit > 0) {
            articles = await News.find({})
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
        console.error("An error occurred! ", error);
        res.status(500).json({ error: "Failed to fetch articles!" });
    }
});

module.exports = topstories;