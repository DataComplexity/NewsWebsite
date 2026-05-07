// migrate.js
require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("../models/Article");
const { assignCategory } = require("../utils/category");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("DB connected");

        const articles = await Article.find({});
        console.log(`Found ${articles.length} articles. Starting...`);

        const BATCH_SIZE = 1000;
        let bulk = [];
        let updated = 0;

        for (const article of articles) {
            const newCategory = assignCategory(article);
            if (newCategory !== article.category) {
                bulk.push({
                    updateOne: {
                        filter: { _id: article._id },
                        update: { $set: { category: newCategory } }
                    }
                });
                updated++;
            }

            if (bulk.length === BATCH_SIZE) {
                await Article.bulkWrite(bulk);
                console.log(`Updated ${updated} so far...`);
                bulk = [];
            }
        }

        // flush remaining
        if (bulk.length) await Article.bulkWrite(bulk);
        console.log(`Done. ${updated}/127k articles updated.`);
        mongoose.disconnect();
    })
    .catch(err => console.error("Error:", err));