import { useState, useEffect } from "react";
import NewsImage from "../../../assets/news_img.jpg";
import "../pagesmodel.css";

export default function SearchResults({ query }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Reset to page 1 whenever the query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    // Fetch whenever query or page changes
    useEffect(() => {
        if (!query) return;
        setLoading(true);
        setError(null);
        fetch(`/searchResults?q=${encodeURIComponent(query)}&page=${currentPage}`)
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, [query, currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };
    const handleNext = () => {
        if (data && currentPage < data.totalPages) { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };
    const handlePageInput = (e) => {
        if (e.key === 'Enter') {
            const n = parseInt(e.target.value);
            if (!isNaN(n) && n >= 1 && n <= data.totalPages) {
                setCurrentPage(n);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                e.target.value = '';
            }
        }
    };

    return (
        <div className="top-stories-container">
            <h1 className="page-title">
                Search: <span style={{ color: 'var(--primary-color)' }}>{query}</span>
            </h1>

            {loading && <p className="loading-msg">Searching...</p>}
            {error && <p className="error-msg">Search failed. Please try again.</p>}
            {data && data.articles?.length === 0 && !loading && (
                <p className="loading-msg">No results found for "{query}".</p>
            )}

            <div className="articles-grid">
                {data?.articles?.map((article) => (
                    <div className="article-card" key={article._id}>
                        <div className="article-image-wrapper">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.image
                                    ? <img src={article.image} alt={article.title} className="article-img" />
                                    : <img src={NewsImage} alt="News" className="article-img" />
                                }
                            </a>
                        </div>
                        <div className="article-content">
                            <h2 className="article-title">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                            </h2>
                            <div className="article-desc">
                                {article.description}
                                {article.description && article.description.length > 150 && (
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link"> ...more</a>
                                )}
                            </div>
                            <div className="article-meta">
                                <span className="article-author" title={article.author || ""}>{article.author || ""}</span>
                                <span className="article-source" title={article.publisher || ""}>{article.publisher || ""}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data?.totalPages > 1 && (
                <div className="pagination">
                    <button className="pagination-btn" onClick={handlePrev} disabled={currentPage === 1}>◀ Previous</button>
                    <div className="pagination-center">
                        <span className="pagination-info">Page {currentPage} of {data.totalPages}</span>
                        <span className="pagination-divider">|</span>
                        <input type="number" className="page-input" placeholder="Go to..." min="1" max={data.totalPages} onKeyDown={handlePageInput} title="Type page number and press ENTER" />
                    </div>
                    <button className="pagination-btn" onClick={handleNext} disabled={currentPage === data.totalPages}>Next ▶</button>
                </div>
            )}
        </div>
    );
}
