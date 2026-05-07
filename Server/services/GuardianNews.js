const Guardian_API = process.env.Guardian_API_KEY?.trim();

const fetchGuardian = async () => {
    try {
        if (!Guardian_API) {
            throw new Error("Guardian_API_KEY is missing or empty in .env");
        }

        const response = await fetch(`https://content.guardianapis.com/search?section=world&show-fields=thumbnail,trailText&api-key=${Guardian_API}`);

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`Guardian API error: ${response.status} - ${errData.response?.message || response.statusText}`);
        }

        const data = await response.json();
        if (!data.response || !data.response.results) return [];

        const articles = data.response.results.map(article => ({
            ...article,
            publisher: "The Guardian",
        }));
        return articles;
    }
    catch (error) {
        console.error("fetchGuardian error:", error.message);
        throw error;
    }
}

module.exports = { fetchGuardian };