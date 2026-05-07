import "./menubar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function MenuBar({ onClose, onOpenSettings }) {
    const [resourcesOpen, setResourcesOpen] = useState(false);

    return (
        <div className="drawer-content">
            {/* Header with Close */}
            <div className="drawer-header">
                <h3>Menu</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Account Section */}
            <div className="drawer-section">
                <div className="drawer-item">
                    <svg viewBox="0 0 24 24" className="drawer-icon" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <Link to="/account" className="drawer-link" onClick={onClose}>
                        My Account
                    </Link>
                </div>
            </div>

            {/* Settings Section */}
            <div className="drawer-section border-top">
                <div className="drawer-item" onClick={onOpenSettings}>
                    <svg viewBox="0 0 24 24" className="drawer-icon" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    <span>Settings</span>
                </div>
            </div>

            {/* Resources Dropdown */}
            <div className="drawer-section border-top">
                <div className="drawer-item dropdown-trigger" onClick={() => setResourcesOpen(!resourcesOpen)}>
                    <svg viewBox="0 0 24 24" className="drawer-icon" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    <span>Resources</span>
                    <span className={`arrow ${resourcesOpen ? "down" : "right"}`}>›</span>
                </div>
                {resourcesOpen && (
                    <div className="nested-links">
                        <Link to="/careers" className="nested-link" onClick={onClose}>Careers</Link>
                        <Link to="/editorialpolicy" className="nested-link" onClick={onClose}>Editorial Policy</Link>
                        <Link to="/factcheck" className="nested-link" onClick={onClose}>Fact Check</Link>
                        <Link to="/pressreleases" className="nested-link" onClick={onClose}>Press Releases</Link>
                        <Link to="/aboutus" className="nested-link" onClick={onClose}>About Us</Link>
                        <Link to="/contactus" className="nested-link" onClick={onClose}>Contact Us</Link>
                    </div>
                )}
            </div>

            {/* App Version Info */}
            <div className="drawer-footer">
                <p>The Bharat Times v1.0</p>
            </div>
        </div>
    );
}

export default MenuBar;
