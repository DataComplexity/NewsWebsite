const { normalize } = require("../utils/helpers");

const { fetchGNews } = require('./GNews.js');
const { fetchNewsAPI } = require('./NewsAPI.js');
const { fetchGuardian } = require('./GuardianNews.js');
const { fetchNewsData } = require('./NewsData.js');

async function fetchAllNews() {
    try {
        const [newsapi, guardian, newsdata, gnews] = await Promise.all([
            fetchNewsAPI(),
            fetchGuardian(),
            fetchNewsData(),
            fetchGNews()
        ]);

        return [
            ...newsapi.articles.map(a => normalize(a, "newsapi")),
            ...guardian.map(a => normalize(a, "guardian")),
            ...newsdata.results.map(a => normalize(a, "newsdata")),
            ...gnews.articles.map(a => normalize(a, "gnews"))
        ];
    }
    catch(error) {
        throw error;
    }
}

module.exports = { fetchAllNews };