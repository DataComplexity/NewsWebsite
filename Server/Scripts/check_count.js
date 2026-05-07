const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('../models/Article');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/newsdb')
    .then(async () => {
        const count = await Article.countDocuments();
        console.log('TOTAL_ARTICLES:', count);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });