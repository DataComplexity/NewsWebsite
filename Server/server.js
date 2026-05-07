const path = require("path");
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5500;

const { fetchAllNews } = require("./services/fetchnews");
const { dedupeBatch } = require("./services/batchfilter");
const { insertIfUnique, ingestBatch } = require("./services/ingest");
const Article = require("./models/Article");
const { startCron } = require("./cron/job");
// const { loadStaticDataset } = require("./services/loadDataset");

const { router: StocksRouter } = require("./services/stockmarket");
const { router: CryptoRouter } = require("./services/Crypto");
const { weather: WeatherRouter } = require("./services/weather");
const { currency: CurrencyRouter } = require("./services/CurrencyExchangeRate");
const { fetchGuardian } = require("./services/GuardianNews");

const topstories = require("./routes/topstories");
const category = require("./routes/categorytypes");
const search = require("./services/search");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB connected");
    startCron();
  })
  .catch(err => console.log(err));

// API routes
app.get("/run", async (req, res) => {
  try {
    const raw = await fetchAllNews();
    const batch = dedupeBatch(raw);
    await ingestBatch(batch);
    res.json({ message: "News updated", count: batch.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/stocks", StocksRouter);
app.use("/crypto", CryptoRouter);
app.use("/weather", WeatherRouter);
app.use("/currency", CurrencyRouter);

app.get("/guardian", async (req, res) => {
  try {
    const articles = await fetchGuardian();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const homePage = require("./routes/home");
app.use("/home", homePage);
app.use("/topstories", topstories);
app.get("/explore", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 99;
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      Article.find({})
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      Article.countDocuments()
    ]);

    res.json({
      articles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles!" });
  }
});

app.use("/news", category);
app.use("/searchResults", search);
app.use("/auth", authRouter);

// Serve Static Files (Frontend)
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// SPA Support: Serve index.html for any unknown routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
