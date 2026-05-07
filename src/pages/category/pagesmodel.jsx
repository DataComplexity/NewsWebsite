import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch.js";
import NewsImage from "../../assets/news_img.jpg";
import "./pagesmodel.css";

export default function PageModel({ title, time = 600000, endpoint }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Auto-append the page query parameter
    const fetchUrl = endpoint.includes('?')
        ? `${endpoint}&page=${currentPage}`
        : `${endpoint}?page=${currentPage}`;

    const { data: News, error, loading } = useFetch(time, fetchUrl);

    useEffect(() => {
        // Reset page if endpoint changes (e.g. user clicks a different category)
        setCurrentPage(1);
    }, [endpoint]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
        if (News && currentPage < News.totalPages) setCurrentPage((p) => p + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageInput = (e) => {
        if (e.key === 'Enter') {
            const pageNum = parseInt(e.target.value);
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= News.totalPages) {
                setCurrentPage(pageNum);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                e.target.value = ''; // clear input after jumping
            }
        }
    };

    return (
        <div className="top-stories-container">
            <h1 className="page-title">{title}</h1>
            {error && <p className="error-msg">Failed to load articles.</p>}

            <div className="articles-grid">
                {loading ? (
                    <p className="loading-msg">Refreshing {title.toLowerCase()}...</p>
                ) : (
                    News?.articles && News.articles.length > 0 ? (
                        News.articles.map((article) => (
                            <div className="article-card" key={article._id}>
                                <div className="article-image-wrapper">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        {article.image ? (
                                            <img src={article.image} alt={article.title} className="article-img" />
                                        ) : (
                                            <img src={NewsImage} alt="News Image" className="article-img" />
                                        )}
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
                                        <span
                                            className="article-author"
                                            title={article.author || ""}
                                        >
                                            {article.author || ""}
                                        </span>
                                        <span
                                            className="article-source"
                                            title={article.publisher === "undefined undefined" || article.publisher === "undefined" ? "" : article.publisher || ""}
                                        >
                                            {article.publisher === "undefined undefined" || article.publisher === "undefined" ? "" : article.publisher || ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !error && <p className="loading-msg">No articles found in {title.toLowerCase()}.</p>
                    )
                )}
            </div>

            {News?.totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        ◀ Previous
                    </button>

                    <div className="pagination-center">
                        <span className="pagination-info">
                            Page {News.page} of {News.totalPages}
                        </span>
                        <span className="pagination-divider">|</span>
                        <input
                            type="number"
                            className="page-input"
                            placeholder="Go to..."
                            min="1"
                            max={News.totalPages}
                            onKeyDown={handlePageInput}
                            title="Type page number and press ENTER"
                        />
                    </div>

                    <button
                        className="pagination-btn"
                        onClick={handleNext}
                        disabled={currentPage === News.totalPages}
                    >
                        Next ▶
                    </button>
                </div>
            )}
        </div>
    );
}
