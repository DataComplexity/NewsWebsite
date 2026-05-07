const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

function escapeRegex(string) {
    if (!string) return "";
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

router.get("/", async (req, res) => {
    try {
        const query = req.query.q?.trim();
        if (!query || query.length > 100) return res.json({ articles: [], total: 0, page: 1, totalPages: 0 });

        const page = parseInt(req.query.page) || 1;
        const limit = 99;
        const skip = (page - 1) * limit;

        const lowerQuery = query.toLowerCase();
        const escapedQuery = escapeRegex(query);
        const regex = new RegExp(escapedQuery, "i");
        
        const orFilter = [
            { title: regex },
            { description: regex },
            { content: regex },
            { category: regex }
        ];

        // Language code mapping
        const langMap = {
            "japanese": "ja",
            "hindi": "hi",
            "korean": "ko",
            "chinese": "zh",
            "arabic": "ar",
            "russian": "ru",
            "english": "en"
        };

        // If user searches for a language name, primarily filter by that language
        if (langMap[lowerQuery]) {
            orFilter.push({ language: langMap[lowerQuery] });
        }

        const filter = { $or: orFilter };

        const [articles, total] = await Promise.all([
            Article.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(limit),
            Article.countDocuments(filter)
        ]);

        res.json({ articles, total, page, limit, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        console.error("Search Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;