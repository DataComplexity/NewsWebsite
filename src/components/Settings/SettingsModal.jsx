import React from 'react';
import './SettingsModal.css';

const THEME_OPTIONS = [
  { name: 'Bharat Red', color: '#c48087' },
  { name: 'Royal Blue', color: '#1a4a7c' },
  { name: 'Deep Sea', color: '#1e3a8a' },
  { name: 'Forest Green', color: '#064e3b' },
  { name: 'Slate Grey', color: '#334155' },
  { name: 'Classic Gold', color: '#b29146' },
];

function SettingsModal({ onClose, currentTheme, onThemeChange, isDarkMode, onDarkModeToggle }) {
  return (
    <div className="settings-overlay">
      <div className="settings-backdrop" onClick={onClose}></div>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>App Settings</h2>
          <button className="settings-close" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-body">
          <section className="settings-section">
            <h3 className="section-title">Appearance</h3>
            <div className="setting-control">
              <span>Night Mode</span>
              <button 
                className={`toggle-switch ${isDarkMode ? 'on' : 'off'}`} 
                onClick={onDarkModeToggle}
              >
                <div className="toggle-handle"></div>
              </button>
            </div>
          </section>

          <section className="settings-section">
            <h3 className="section-title">Theme Accent</h3>
            <p className="section-desc">Choose a primary accent color for highlights.</p>
            <div className="theme-grid">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.color}
                  className={`theme-swatch ${currentTheme === theme.color ? 'active' : ''}`}
                  style={{ backgroundColor: theme.color }}
                  onClick={() => onThemeChange(theme.color)}
                  title={theme.name}
                >
                  {currentTheme === theme.color && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="settings-footer">
          <button className="save-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
