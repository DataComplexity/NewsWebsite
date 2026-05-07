import { useState, useEffect } from "react";
import Date from "./Datetime.js";
import Search_Icon from "../../../assets/search-interface-symbol.png";
import Go from "../../../assets/arrow-right.png";
import Account_Icon from "../../../assets/account_icon.png";
import Subscribe_Icon from "../../../assets/subscribe-button.png";
import "./title.css";
import WeatherData from "../Live_News/Weather/weather";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = "";

function Title() {
    const [SearchClick, setSearchClick] = useState(false);
    const [Text, setText] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const { data: weatherData, error } = useFetch(600000, "/weather");

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (!accessToken || !refreshToken) {
                setUser(null);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refreshToken })
                    });

                    if (refreshRes.ok) {
                        const tokens = await refreshRes.json();
                        localStorage.setItem("accessToken", tokens.accessToken);
                        localStorage.setItem("refreshToken", tokens.refreshToken);

                        const meRes = await fetch(`${API_URL}/auth/me`, {
                            headers: { Authorization: `Bearer ${tokens.accessToken}` }
                        });
                        const data = await meRes.json();
                        setUser(data.user);
                    } else {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        setUser(null);
                    }
                }
            } catch (err) {
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
            } catch (err) {
                console.error("Logout failed:", err);
            }
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setUserMenuOpen(false);
        navigate("/");
    };

    function handleTextValue(val) {
        setText(val.target.value);
    }

    function handleSearch() {
        if (Text.trim()) {
            navigate(`/search?q=${encodeURIComponent(Text.trim())}`);
            setSearchClick(false);
            setText("");
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSearch();
        if (e.key === "Escape") { setSearchClick(false); setText(""); }
    }

    return (
        <>
            <div className="title-panel">
                <span id="titlePanel-box1">
                    <Date />
                    <br />
                    <p>Today's Paper</p>
                </span>
                <span id="titlePanel-box2">
                    <h1 className="heading">
                        THE BHARAT TIMES
                    </h1>
                </span>
                <span id="titlePanel-box3">
                    <div id="Profile">
                        <div id="weather-box">
                            {weatherData && <WeatherData data={weatherData} />}
                            {error && <p id="weather-error">Err</p>}
                        </div>
                        <div className="account-icon-wrapper">
                            {user ? (
                                <div className="user-icon-container" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                    <svg viewBox="0 0 24 24" id="UserIcon" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    {userMenuOpen && (
                                        <div className="user-dropdown">
                                            <p className="user-dropdown-name">{user.firstName} {user.lastName}</p>
                                            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/account">
                                    <img src={Account_Icon} id="AccountIcon" alt="Account" />
                                </Link>
                            )}
                        </div>
                        <Link to="/newsletter">
                            <img src={Subscribe_Icon} id="SubscribeIcon" alt="Subscribe" />
                        </Link>
                    </div>
                    <span id="search-box">
                        {SearchClick && (
                            <input
                                type="text"
                                id="search"
                                placeholder="Search..."
                                value={Text}
                                onChange={handleTextValue}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        )}
                        {Text
                            ? <img src={Go} id="SearchIcon" onClick={handleSearch} style={{ cursor: "pointer" }} />
                            : <img
                                src={Search_Icon}
                                id="SearchIcon"
                                onClick={() => setSearchClick(!SearchClick)}
                                style={{ cursor: "pointer" }}
                            />
                        }
                    </span>
                </span>
            </div>
        </>
    )
}

export default Title;
