const Article = require("../models/Article");
const { detectLanguage } = require("../utils/language");
const { generateHash } = require("../utils/helpers");
const { assignCategory } = require("../utils/category");

async function insertIfUnique(article) {
  if (!article.url) return false;

  const hash = article.hash || generateHash(article);

  const exists = await Article.findOne({
    $or: [{ url: article.url }, { hash }]
  });

  if (exists) return false;

  const text = (article.title || "") + " " + (article.description || "");
  const lang = detectLanguage(text);

  await Article.create({
    ...article,
    hash,
    category: article.category || assignCategory(article),
    language: lang,
  });

  return true;
}

// Optimized batch version for efficiency
async function ingestBatch(articles) {
    const ops = [];
    for (const article of articles) {
        if (!article.url) continue;
        const hash = generateHash(article);
        const text = (article.title || "") + " " + (article.description || "");
        const lang = detectLanguage(text);
        
        ops.push({
            updateOne: {
                filter: { $or: [{ url: article.url }, { hash }] },
                update: { 
                    $setOnInsert: { 
                        ...article, 
                        hash, 
                        category: article.category || assignCategory(article),
                        language: lang 
                    } 
                },
                upsert: true
            }
        });
    }
    if (ops.length > 0) {
        await Article.bulkWrite(ops, { ordered: false });
    }
}

module.exports = { insertIfUnique, ingestBatch };