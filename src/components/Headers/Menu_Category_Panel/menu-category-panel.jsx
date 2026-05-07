import menu_icon from "../../../assets/menu_icon-inactive.png";
import "./menu-category-panel.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../MenuBar/menubar.jsx";

function MenuCategoryPanel({ onOpenSettings }) {
    const [menuOpen, setmenuOpen] = useState(false);

    const handleSettingsClick = () => {
        setmenuOpen(false); // Close menu when opening settings
        onOpenSettings();
    };

    return (
        <>
            <div className="topics-panel">
                {/* Elements */}
                <div className="Menu-bar">
                    <img className={`menu_icon ${menuOpen ? "menu_icon_active" : "menu_icon_inactive"}`} src={menu_icon} alt="icon" onClick={() => setmenuOpen(!menuOpen)} />
                </div>
                <div className="Categories">
                    <Link to="/"><span id="element">Home</span></Link>
                    <Link to="/topstories"><span id="element">Top Stories</span></Link>
                    <Link to="/explore"><span id="element">Explore</span></Link>
                    <Link to="/politics"><span id="element">Politics</span></Link>
                    <Link to="/business"><span id="element">Business</span></Link>
                    <Link to="/technology"><span id="element">Technology</span></Link>
                    <Link to="/sports"><span id="element">Sports</span></Link>
                    <Link to="/entertainment"><span id="element">Entertainment</span></Link>
                    <Link to="/health"><span id="element">Health</span></Link>
                </div>
                {menuOpen && (
                    <div className="menu-backdrop" onClick={() => setmenuOpen(false)}></div>
                )}
                <div className={`menu-dropdown ${menuOpen ? "open" : ""}`}>
                    <Modal onClose={() => setmenuOpen(false)} onOpenSettings={handleSettingsClick} />
                </div>
            </div>
        </>
    )
}

export default MenuCategoryPanel;
