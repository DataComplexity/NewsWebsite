const NEWSDATA_API = process.env.NEWSDATA_IO_API_KEY;

const fetchNewsData = async () => {
    try{
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${NEWSDATA_API}&q=technology&language=en`);
        if(!response.ok){
            throw new Error(`Error while fetching data from NewsData.io. HTTP Error status: ${response.status} `)
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

module.exports = { fetchNewsData };