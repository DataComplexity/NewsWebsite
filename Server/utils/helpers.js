const crypto = require("crypto");

function normalizeURL(url) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url;
  }
}

function generateHash(article) {
  const text = (
    (article.title || "") + " " + (article.description || "")
  ).toLowerCase();

  return crypto.createHash("md5").update(text).digest("hex");
}

function cleanString(str) {
  if (!str) return "";
  const cleaned = str.replace(/\b(undefined|null)\b/gi, "").trim();
  // If it was just "undefined undefined", it might become an empty string, which is what we want
  return cleaned === "" ? "" : cleaned;
}

function normalize(article, source) {
  const fields = article.fields || {};
  const tags = article.tags || [];

  return {
    title: cleanString(article.title?.trim() || article.webTitle?.trim()),
    author: cleanString(article.author || (tags[0] ? `${tags[0].firstName || ""} ${tags[0].lastName || ""}`.trim() : "") || article.creator?.[0]),
    description: article.description || fields.trailText || article.content || "",
    url: normalizeURL(article.url || article.webUrl || article.link || ""),
    image: article.urlToImage || fields.thumbnail || article.url_to_image || article.image_url || article.image || "",

    category: article.category_type || article.sectionName || "General",
    publisher: cleanString(article.publisher || article.source_name || (source === "guardian" ? "The Guardian" : "") || article.source?.[1]),
    source,
    publishedAt: new Date(article.publishedAt || article.webPublicationDate || article.pubDate || Date.now()),
  };
}

module.exports = { normalize, generateHash };