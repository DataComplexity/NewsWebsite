const GNews_API = process.env.GNews_API_KEY;

const fetchGNews = async () => {
    try{
        const response = await fetch(`https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=${GNews_API}`);
        if(!response.ok){
            throw new Error(`Error while fetching data from GNews. HTTP Error status: ${response.status} `)
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

module.exports = { fetchGNews };