const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');
const { detectLanguage } = require('../utils/language');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/newsdb');
        console.log("DB connected for migration...");

        const total = await Article.countDocuments();
        console.log(`Starting migration for ${total} articles...`);

        let processed = 0;
        let updated = 0;
        const batchSize = 1000;

        while (processed < total) {
            const articles = await Article.find({}).skip(processed).limit(batchSize);
            if (articles.length === 0) break;

            const bulkOps = articles.map(article => {
                const text = (article.title || '') + ' ' + (article.description || '');
                const lang = detectLanguage(text);
                
                return {
                    updateOne: {
                        filter: { _id: article._id },
                        update: { $set: { language: lang } }
                    }
                };
            });

            if (bulkOps.length > 0) {
                await Article.bulkWrite(bulkOps);
                updated += bulkOps.length;
            }

            processed += articles.length;
            console.log(`Progress: ${processed}/${total} articles processed...`);
        }

        console.log(`Migration complete! Updated ${updated} articles.`);
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
