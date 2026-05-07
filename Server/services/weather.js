const express = require("express");
const geoip = require("geoip-lite"); // move outside route — don't require inside handler
const weather = express.Router();

weather.get("/", async (req, res) => {
  try {
    // 1. Clean up IP (handle comma-separated proxy chain)
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || "")
      .split(",")[0].trim();

    // 2. Local dev fallback
    if (!ip || ip === "::1" || ip === "127.0.0.1") {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ip = ipData.ip;
      } catch {
        ip = ""; // will default to London below
      }
    }

    // 3. Geo lookup
    const geo = geoip.lookup(ip);
    const city = geo?.city || "London";

    // 4. Weather fetch with timeout guard
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let weatherData;
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, {
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`wttr.in returned ${response.status}`);
      weatherData = await response.json();
    } finally {
      clearTimeout(timeout);
    }

    // 5. Safe extraction
    const current = weatherData?.current_condition?.[0];
    if (!current) throw new Error("Unexpected weather data structure");

    res.json({
      city,
      temperature_C: current.temp_C,
      weatherType: current.weatherDesc?.[0]?.value || "Unknown",
      weatherIcon: current.weatherIconUrl?.[0]?.value || "",
    });

  } catch (err) {
    console.error("Weather error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data", detail: err.message });
  }
});

module.exports = { weather };