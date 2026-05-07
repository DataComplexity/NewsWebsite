import { useMemo } from "react";
import "./live-news-panel.css";
import useFetch from "../../../../hooks/useFetch";

function LiveNewsPanel() {
    const { data: newsData, error } = useFetch(600000, "/guardian");

    const newsString = useMemo(() => {
        if (!newsData || !Array.isArray(newsData)) return "Loading breaking news...";
        // Using \u00a0 for non-breaking spaces to ensure they render in the ticker
        const spacer = "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 | \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
        return newsData.map(article => article.webTitle).join(spacer);
    }, [newsData]);

    return (
        <>
            <div className="live-news-panel">
                <div className="breaking-news-heading">
                    <p id="breaking-news">BREAKING</p>
                </div>
                <div className="ticker-container">
                    <div className="ticker-text">
                        {error ? "Failed to load breaking news" : newsString}
                        &nbsp;
                    </div>
                </div>
            </div>
        </>
    );
}

export default LiveNewsPanel;
