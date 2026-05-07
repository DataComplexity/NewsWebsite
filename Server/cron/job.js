const cron = require("node-cron");
const { fetchAllNews } = require("../services/fetchnews");
const { dedupeBatch } = require("../services/batchfilter");
const { ingestBatch } = require("../services/ingest");

function startCron() {
  // Run every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      console.log("--- STARTING BACKGROUND NEWS REFRESH ---");

      const raw = await fetchAllNews();
      const batch = dedupeBatch(raw);

      if (batch.length > 0) {
          await ingestBatch(batch);
          console.log(`[Cron] Processed batch of ${batch.length} potential articles.`);
      } else {
          console.log("[Cron] No new potential articles found from sources.");
      }

      console.log("--- BACKGROUND REFRESH COMPLETE ---");
    } catch (err) {
      console.error("[Cron Error]:", err.message);
    }
  });
}

module.exports = { startCron };