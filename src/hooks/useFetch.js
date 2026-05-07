import { useState, useEffect } from "react";

function useFetch(time, url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url, { cache: 'no-cache' });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const content = await res.json();
                setData(content);
            } catch (err) {
                setError(err);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, time);

        return () => clearInterval(interval);
    }, [url, time]);

    return { data, error, loading };
}

export { useFetch };
export default useFetch;
