// const fs = require("fs");
// const path = require("path");
// const Article = require("../models/Article");
// const { normalize, generateHash } = require("../utils/helpers");
// const { assignCategory } = require("../utils/category"); 

// async function loadStaticDataset() {

//     const file = path.join(__dirname, "../Datasets/news.json");

//     const raw = fs.readFileSync(file, "utf-8");
//     const articles = JSON.parse(raw);

//     const normalized = articles.map(a => {
//         const article = normalize(a, "dataset");
//         article.category = assignCategory(article);
//         article.hash = generateHash(article);
//         return article;
//     });

//     try {

//         await Article.insertMany(normalized, { ordered:false });

//         console.log("Static dataset uploaded:", normalized.length);

//     }
//     catch(err) {

//         if (err.writeErrors) {
//             console.log("Duplicates skipped:", err.writeErrors.length);
//         } else {
//             console.error(err);
//         }

//     }
// }

// module.exports = { loadStaticDataset };


//Note: It was required for once, after the local/static dataset (100K+ articles large) got uploaded, its value becomes null.