import { useState, useEffect } from "react";
import Title from "./components/Headers/Title/title.jsx";
import LiveNewsPanel from "./components/Headers/Live_News/Breaking-News/live-news-panel.jsx";
import MenuCategoryPanel from "./components/Headers/Menu_Category_Panel/menu-category-panel.jsx";
import Market from "./components/Headers/Live_News/Market/market.jsx";
import SearchResults from "./pages/category/search/SearchResults.jsx";
import Footer from "./components/Footers/Footer.jsx";
import SettingsModal from "./components/Settings/SettingsModal.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Category Pages
import Home from "./pages/category/home/Home.jsx";
import TopStories from "./pages/category/routes/TopStories.jsx";
import Explore from "./pages/category/routes/Explore.jsx";
import Politics from "./pages/category/routes/Politics.jsx";
import Business from "./pages/category/routes/Business.jsx";
import Technology from "./pages/category/routes/Technology.jsx";
import Sports from "./pages/category/routes/Sports.jsx";
import Entertainment from "./pages/category/routes/Entertainment.jsx";
import Health from "./pages/category/routes/Health.jsx";
import World from "./pages/category/routes/World.jsx";
import Science from "./pages/category/routes/Science.jsx";
import Environment from "./pages/category/routes/Environment.jsx";
import Education from "./pages/category/routes/Education.jsx";
import Lifestyle from "./pages/category/routes/Lifestyle.jsx";
import Tourism from "./pages/category/routes/Tourism.jsx";
import Automobile from "./pages/category/routes/Automobile.jsx";
import RealEstate from "./pages/category/routes/RealEstate.jsx";
import Gaming from "./pages/category/routes/Gaming.jsx";
import Media from "./pages/category/routes/Media.jsx";
import Crime from "./pages/category/routes/Crime.jsx";
import Law from "./pages/category/routes/Law.jsx";
import Defense from "./pages/category/routes/Defense.jsx";
import Social from "./pages/category/routes/Social.jsx";
import Religion from "./pages/category/routes/Religion.jsx";
import Astrology from "./pages/category/routes/Astrology.jsx";

// Resource Pages
import AboutUs from "./pages/resources/Pages/AboutUs.jsx";
import ContactUs from "./pages/resources/Pages/ContactUs.jsx";
import Careers from "./pages/resources/Pages/Careers.jsx";
import AdvertiseWithUs from "./pages/resources/Pages/AdvertiseWithUs.jsx";
import EditorialPolicy from "./pages/resources/Pages/EditorialPolicy.jsx";
import FactCheck from "./pages/resources/Pages/FactCheck.jsx";
import PressReleases from "./pages/resources/Pages/PressReleases.jsx";
import CorrectionPolicy from "./pages/resources/Pages/CorrectionPolicy.jsx";
import RSSFeeds from "./pages/resources/Pages/RSSFeeds.jsx";
import TermsOfService from "./pages/resources/Pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/resources/Pages/PrivacyPolicy.jsx";
import CookiePolicy from "./pages/resources/Pages/CookiePolicy.jsx";
import Newsletter from "./pages/resources/Pages/Newsletter.jsx";

// Account Page
import Account from "./pages/Account/account.jsx";

function AppContent({ onOpenSettings }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");

  return (
    <div className="layout-container">
      <Title />
      <LiveNewsPanel />
      <Market />
      <MenuCategoryPanel onOpenSettings={onOpenSettings} />
      <Routes>
        {/* Category Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/topstories" element={<TopStories />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/health" element={<Health />} />
        <Route path="/world" element={<World />} />
        <Route path="/science" element={<Science />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/education" element={<Education />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/automobile" element={<Automobile />} />
        <Route path="/realestate" element={<RealEstate />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/media" element={<Media />} />
        <Route path="/crime" element={<Crime />} />
        <Route path="/law" element={<Law />} />
        <Route path="/defense" element={<Defense />} />
        <Route path="/social" element={<Social />} />
        <Route path="/religion" element={<Religion />} />
        <Route path="/astrology" element={<Astrology />} />

        {/* Search Route */}
        <Route
          path="/search"
          element={
            <div className="news-section">
              <SearchResults query={searchQuery} />
            </div>
          }
        />

        {/* Resource Routes */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/advertisewithus" element={<AdvertiseWithUs />} />
        <Route path="/editorialpolicy" element={<EditorialPolicy />} />
        <Route path="/factcheck" element={<FactCheck />} />
        <Route path="/pressreleases" element={<PressReleases />} />
        <Route path="/correctionpolicy" element={<CorrectionPolicy />} />
        <Route path="/rssfeeds" element={<RSSFeeds />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/cookiepolicy" element={<CookiePolicy />} />
        <Route path="/newsletter" element={<Newsletter />} />

        {/* Account Route */}
        <Route path="/account" element={<Account />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("news-dark-mode") === "true";
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("news-theme") || "#c48087";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("news-dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", currentTheme);
    localStorage.setItem("news-theme", currentTheme);
    const darken = (hex) => {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.floor(r * 0.9)}, ${Math.floor(g * 0.9)}, ${Math.floor(b * 0.9)})`;
    };
    document.documentElement.style.setProperty("--primary-hover", darken(currentTheme));
  }, [currentTheme]);

  return (
    <Router>
      <AppContent onOpenSettings={() => setIsSettingsOpen(true)} />
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        />
      )}
    </Router>
  );
}
