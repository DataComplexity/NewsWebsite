const express = require('express');
const router = express.Router({ mergeParams: true });
const News = require('../models/Article');

router.get(['/', '/:category'], async (req, res) => {
    try {
        let category = (req.params.category || "Explore").toLowerCase();
        if (category === "Defence") category = "Defense"; // Handle UK/US spelling mismatch

        const page = parseInt(req.query.page) || 1;
        const limit = 99;
        const skip = (page - 1) * limit;

        const filter = {};

        // Log for debugging (will show in server console)
        console.log(`[API] Fetching category: "${category}"`);

        // Only 'explore' returns everything. Everything else (including 'world') is a specific category filter.
        if (category !== 'Explore') {
            filter.category = new RegExp(`^${category}$`, "i");
        }

        const [articles, total] = await Promise.all([
            News.find(filter)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit),
            News.countDocuments(filter)
        ]);

        res.json({
            articles,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(`Error fetching category ${req.params.category}:`, error);
        res.status(500).json({ error: "Failed to fetch articles!" });
    }
});

module.exports = router;