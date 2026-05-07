const NEWSAPI_API = process.env.NEWSAPI_API_KEY;

const fetchNewsAPI = async () => {
    try{
        const response = await fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=${NEWSAPI_API}`);
        if(!response.ok){
            throw new Error(`Error while fetching data from NewsAPI. HTTP Error status: ${response.status} `)
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

module.exports = { fetchNewsAPI };