import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsImage from "../../../assets/news_img.jpg";
import "./Home.css";

function ArticleCard({ article }) {
    return (
        <div className="home-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="home-card-img-link">
                <img
                    src={article.image || NewsImage}
                    alt={article.title}
                    className="home-card-img"
                    onError={(e) => { e.target.src = NewsImage; }}
                />
            </a>
            <div className="home-card-body">
                {article.category && (
                    <Link to={`/${article.category.toLowerCase()}`} className="home-card-tag">
                        {article.category}
                    </Link>
                )}
                <h3 className="home-card-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </h3>
                <p className="home-card-desc">{article.description}</p>
                <div className="home-card-meta">
                    <span className="home-card-author" title={article.author || ""}>{article.author || ""}</span>
                    <span className="home-card-source" title={article.publisher || ""}>{article.publisher || ""}</span>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`/home?page=${currentPage}`)
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };
    const handleNext = () => {
        if (data && currentPage < data.totalPages) { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };
    const handlePageInput = (e) => {
        if (e.key === 'Enter') {
            const n = parseInt(e.target.value);
            if (data && !isNaN(n) && n >= 1 && n <= data.totalPages) {
                setCurrentPage(n);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                e.target.value = '';
            }
        }
    };

    const articles = data?.articles || [];
    const hero = articles[0];
    const featured = articles.slice(1, 4);
    const rest = articles.slice(4);

    return (
        <div className="home-container">

            {/* Section Label */}
            <div className="home-section-header">
                <h1 className="home-heading">Latest News</h1>
                <span className="home-sub">English · Updated live</span>
            </div>

            {loading && <p className="home-loading">Loading...</p>}
            {error && <p className="home-error">Failed to load articles.</p>}

            {/* Hero + 3 features side by side */}
            {!loading && hero && (
                <div className="home-hero-section">
                    {/* Big hero card */}
                    <a href={hero.url} target="_blank" rel="noopener noreferrer" className="home-hero">
                        <img
                            src={hero.image || NewsImage}
                            alt={hero.title}
                            className="home-hero-img"
                            onError={(e) => { e.target.src = NewsImage; }}
                        />
                        <div className="home-hero-overlay">
                            {hero.category && (
                                <span className="home-hero-tag">{hero.category}</span>
                            )}
                            <h2 className="home-hero-title">{hero.title}</h2>
                            <p className="home-hero-desc">{hero.description}</p>
                            <div className="home-hero-meta">
                                <span>{hero.author || ""}</span>
                                <span className="home-hero-source">{hero.publisher || ""}</span>
                            </div>
                        </div>
                    </a>

                    {/* 3 featured aside */}
                    <div className="home-featured">
                        {featured.map(a => (
                            <div className="home-featured-item" key={a._id}>
                                <a href={a.url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={a.image || NewsImage}
                                        alt={a.title}
                                        className="home-featured-img"
                                        onError={(e) => { e.target.src = NewsImage; }}
                                    />
                                </a>
                                <div className="home-featured-body">
                                    {a.category && <Link to={`/${a.category.toLowerCase()}`} className="home-card-tag">{a.category}</Link>}
                                    <h3 className="home-featured-title">
                                        <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
                                    </h3>
                                    <span className="home-card-source">{a.publisher || ""}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Rest of articles grid */}
            {!loading && rest.length > 0 && (
                <>
                    <div className="home-divider-label">More Stories</div>
                    <div className="home-grid">
                        {rest.map(a => <ArticleCard key={a._id} article={a} />)}
                    </div>
                </>
            )}

            {/* Pagination */}
            {data?.totalPages > 1 && (
                <div className="home-pagination">
                    <button className="home-pg-btn" onClick={handlePrev} disabled={currentPage === 1}>◀ Previous</button>
                    <div className="home-pg-center">
                        <span className="home-pg-info">Page {currentPage} of {data.totalPages}</span>
                        <span className="home-pg-div">|</span>
                        <input type="number" className="home-pg-input" placeholder="Go to..." min="1" max={data.totalPages} onKeyDown={handlePageInput} title="Type page and press ENTER" />
                    </div>
                    <button className="home-pg-btn" onClick={handleNext} disabled={currentPage === data.totalPages}>Next ▶</button>
                </div>
            )}
        </div>
    );
}
