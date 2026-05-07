/**
 * categoryAssigner.js
 * News Article Category Classifier
 *
 * Categories (23 total):
 *   Crime, Law, Defense, Politics, World, Sports, Business,
 *   Technology, Science, Environment, Weather, Automobile,
 *   RealEstate, Education, Health, Entertainment, Gaming,
 *   Social, Religion, Astrology, Media, Tourism, Lifestyle
 *
 * Design rules:
 *  1. Keywords are checked against title + description (lowercased).
 *  2. Multi-word phrases are preferred over single short words to
 *     avoid false positives (e.g. "electric vehicle" not "ev").
 *  3. Where a short word must be used, it is wrapped with spaces
 *     e.g. " ai " so it won't fire inside "paid", "said", "rain".
 *  4. Categories are ordered from most-specific → most-general
 *     so that specific news isn't swallowed by a broad bucket.
 *  5. A helper `has()` handles both phrase and word-boundary checks.
 */

function assignCategory(article) {
  const raw = (article.title + " " + (article.description || "")).toLowerCase();
  // Pad with spaces so word-boundary checks like " ai " work at edges too
  const text = " " + raw + " ";

  /** Exact substring match (good for multi-word phrases) */
  const has = (...terms) => terms.some(t => text.includes(t));

  // ─────────────────────────────────────────────────────────
  // 1. CRIME
  //    Check early — crime articles often mention police/court,
  //    which could bleed into Law or Politics if checked later.
  // ─────────────────────────────────────────────────────────
  if (has(
    "murder", "killed", "homicide",
    "robbery", "theft", "stolen", "loot",
    "rape", "assault", "kidnap", "abduct",
    " fraud ", "scam", "cyber crime", "cybercrime",
    "drug trafficking", "narcotics",
    " arrested ", "accused", "convict", "criminal",
    "fir filed", "case registered",
    " crime ", "criminal case"
  )) return "Crime";

  // ─────────────────────────────────────────────────────────
  // 2. LAW
  //    Distinct from Crime — covers judiciary & legal proceedings.
  // ─────────────────────────────────────────────────────────
  if (has(
    "supreme court", "high court", "district court", "sessions court",
    "tribunal", "judiciary", " verdict ", " acquit", "bail granted",
    "contempt of court", "habeas corpus",
    " hearing ", "litigation", "lawsuit",
    " judge ", " justice ", " advocate ",
    "legal notice", "petition filed",
    " law commission", "amendment bill",
    " rights ", " constitution "
  )) return "Law";

  // ─────────────────────────────────────────────────────────
  // 3. DEFENSE
  // ─────────────────────────────────────────────────────────
  if (has(
    " army ", "indian army", "armed forces",
    " navy ", " naval ", " airforce ", "air force", "iaf",
    " military ", " soldier ", " troops ",
    " missile ", "ballistic", "nuclear warhead",
    " weapon ", "ammunition", " warfare ",
    "defence ministry", "defense ministry",
    "border security", " bsf ", " crpf ", " cisf ",
    "counter-terrorism", "counterterrorism",
    "surgical strike", "ceasefire",
    "defence budget", "defense budget"
  )) return "Defense";

  // ─────────────────────────────────────────────────────────
  // 4. POLITICS
  // ─────────────────────────────────────────────────────────
  if (has(
    " election ", "elections", "lok sabha", "rajya sabha",
    "vidhan sabha", "assembly polls",
    " parliament ", "parliamentary",
    "prime minister", "chief minister",
    " president ", "vice president",
    " minister ", "cabinet reshuffle",
    " governor ", " mla ", " mp ",
    " bjp ", " congress ", " aap ", " tmc ", " sp ", " bsp ",
    "political party", " politician ",
    " vote ", " voter ", "ballot",
    " democracy ", " opposition ",
    "ruling party", "no-confidence",
    " senate ", "white house", "kremlin"
  )) return "Politics";

  // ─────────────────────────────────────────────────────────
  // 5. WORLD (International news)
  //    Kept after Politics so local political news doesn't
  //    fall here due to generic words like "country".
  // ─────────────────────────────────────────────────────────
  if (has(
    "united nations", " nato ", " g20 ", " g7 ",
    "european union", "world bank", " imf ",
    "international relations", "bilateral",
    "foreign policy", "diplomacy", "diplomatic",
    "sanctions", " treaty ", "trade deal",
    " war ", "conflict zone", "ceasefire",
    "refugee", "humanitarian crisis",
    "china says", "us says", "russia says",
    "geopoliti"
  )) return "World";

  // ─────────────────────────────────────────────────────────
  // 6. SPORTS
  //    "match", "player", "score" are intentionally avoided
  //    as standalone terms — too ambiguous. Use sport-specific
  //    or compound terms instead.
  // ─────────────────────────────────────────────────────────
  if (has(
    "cricket", " ipl ", "test match", "odi ", "t20",
    " football ", "fifa", "premier league",
    " soccer ", "champions league",
    "badminton", "tennis", " golf ",
    "hockey", "kabaddi", " boxing ", "wrestling",
    " olympics ", "paralympics",
    "asian games", "commonwealth games",
    " athlete ", " sportsman ", "sportswoman",
    "world cup", "grand prix", "formula 1", " f1 ",
    " nba ", " nfl ", " ufc ",
    "innings", "wicket", "boundary", "century scored",
    "sports ministry", "national sports"
  )) return "Sports";

  // ─────────────────────────────────────────────────────────
  // 7. BUSINESS / FINANCE
  //    Startup keywords merged here as recommended.
  //    "share" alone is skipped — too ambiguous (social share).
  //    "market" alone skipped — too generic. Use compounds.
  // ─────────────────────────────────────────────────────────
  if (has(
    "stock market", "share market", "sensex", "nifty",
    "bse", " nse ", "stock exchange",
    " ipo ", "initial public offering",
    " gdp ", "inflation", "interest rate", "repo rate",
    "rbi policy", "federal reserve",
    " economy ", "economic growth", "recession",
    "fiscal deficit", "trade deficit",
    " budget ", "union budget",
    "income tax", "gst", " tax ", "taxation",
    "corporate", "revenue", "profit", " loss reported",
    " merger ", "acquisition",
    "startup", " unicorn ", "venture capital",
    " funding round", "seed funding", "series a", "series b",
    " founder ", " entrepreneur ",
    " investment ", "investor",
    "mutual fund", " sip ", " fd ", "fixed deposit",
    "cryptocurrency", " bitcoin ", " crypto ",
    " bank ", "banking sector", "nbfc",
    "insurance", " premium paid",
    "exports", "imports", "trade war",
    "e-commerce", "retail sector"
  )) return "Business";

  // ─────────────────────────────────────────────────────────
  // 8. TECHNOLOGY
  //    "ai" wrapped with spaces to avoid false matches.
  //    "app" replaced with "mobile app" / "application".
  //    "tech" used carefully — "tech" appears in "kitchen" → use " tech ".
  // ─────────────────────────────────────────────────────────
  if (has(
    " ai ", "artificial intelligence", "machine learning",
    "deep learning", "large language model", " llm ",
    "chatgpt", "openai", "google gemini", "anthropic",
    "software", "hardware",
    "mobile app", "application launch", "app update",
    "smartphone", "iphone", "android",
    "5g", " 6g ", "internet of things", " iot ",
    "cybersecurity", "data breach", "hacking", "ransomware",
    "cloud computing", "saas", "data center",
    " semiconductor ", "microchip",
    " robot ", "robotics", "automation",
    "augmented reality", "virtual reality", " ar ", " vr ",
    "blockchain", "web3",
    "social media platform", "algorithm",
    " tech company", "technology company",
    "digital india", "digital transformation",
    " gadget ", "wearable", "laptop", "tablet"
  )) return "Technology";

  // ─────────────────────────────────────────────────────────
  // 9. SCIENCE (incl. Space & Research)
  //    "research" alone avoided (too broad) — prefer "researchers found",
  //    "new study", "scientific study" etc.
  // ─────────────────────────────────────────────────────────
  if (has(
    " nasa ", " isro ", "space agency",
    "rocket launch", "satellite launch",
    " mars ", " moon mission", "lunar",
    " orbit ", "spacecraft", "astronaut",
    "black hole", "galaxy", "telescope",
    "universe", "astronomy",
    "scientific study", "new study finds",
    "researchers found", "scientists discover",
    "scientific research", "lab experiment",
    "clinical trial",
    " dna ", "genetics", "genome",
    "quantum computing", "quantum physics",
    "physics", "chemistry", "biology",
    "paleontology", "archaeology",
    "nobel prize", "science award"
  )) return "Science";

  // ─────────────────────────────────────────────────────────
  // 10. ENVIRONMENT
  // ─────────────────────────────────────────────────────────
  if (has(
    "climate change", "global warming", "carbon emission",
    "greenhouse gas", "net zero",
    "air pollution", "water pollution", "soil contamination",
    "deforestation", "afforestation",
    "wildlife", "endangered species", "biodiversity",
    "conservation", "national park", "tiger reserve",
    "plastic ban", "single-use plastic",
    "renewable energy", "solar energy", "wind energy",
    "electric vehicle policy",
    "flood", "drought", "natural disaster",
    "earthquake", "tsunami", "cyclone",
    " avalanche ", "landslide"
  )) return "Environment";

  // ─────────────────────────────────────────────────────────
  // 11. WEATHER
  //    Short terms like "rain" are wrapped with spaces.
  // ─────────────────────────────────────────────────────────
  if (has(
    "weather forecast", "weather update", "weather alert",
    " rainfall ", " rain warning", "heavy rain",
    "monsoon", "pre-monsoon",
    "temperature forecast", "heatwave", "cold wave",
    "snowfall", "fog alert",
    " cyclone ", "thunderstorm", "lightning",
    "imd forecast", "met department",
    "humidity", "wind speed"
  )) return "Weather";

  // ─────────────────────────────────────────────────────────
  // 12. AUTOMOBILE
  //    "launch" avoided standalone — use compound "car launch" etc.
  //    "ev" avoided — matches "every", "even". Use full form.
  // ─────────────────────────────────────────────────────────
  if (has(
    "car launch", "bike launch", "suv launch", "scooter launch",
    "electric vehicle", "electric car", "electric bike", "electric scooter",
    "electric two-wheeler", "electric three-wheeler",
    " automobile ", "automotive industry",
    "auto expo", "motor show",
    "maruti", "tata motors", "mahindra", "hyundai",
    "honda cars", "toyota", "bmw", "mercedes",
    "vehicle recall", "car recall",
    "mileage", " kmpl", "fuel efficiency",
    "charging station", "ev charging",
    "road test", "test drive",
    " car price", "bike price", "on-road price",
    "two-wheeler", "four-wheeler", "commercial vehicle",
    "niti aayog ev", "fame scheme"
  )) return "Automobile";

  // ─────────────────────────────────────────────────────────
  // 13. REAL ESTATE
  // ─────────────────────────────────────────────────────────
  if (has(
    "real estate", "realty",
    "property price", "property market",
    "housing project", "residential project", "commercial project",
    "flat launch", "apartment", "under construction",
    "home loan", "mortgage",
    "rera", "builder", "developer",
    "property registration", "stamp duty",
    "smart city", "affordable housing",
    "rental yield", " rent hike", " rent agreement",
    "sq ft", "square feet", "carpet area",
    "gated community", "township"
  )) return "RealEstate";

  // ─────────────────────────────────────────────────────────
  // 14. EDUCATION
  //    "result" and "job" avoided standalone — very ambiguous.
  //    Use compound terms.
  // ─────────────────────────────────────────────────────────
  if (has(
    " exam ", "examination", "entrance exam",
    "jee ", "neet ", "upsc", "ssc cgl", "ibps",
    "board exam", "cbse", "icse",
    "admission", "counselling",
    "exam result", "merit list",
    " university ", "iit ", "nit ", "iim ",
    "academic", "curriculum",
    "scholarship", "fellowship",
    "college", " school ",
    "student", "pupil",
    "teacher", "professor",
    "education ministry", "ugc", "aicte",
    "nep", "national education policy",
    "digital education", "e-learning",
    "job recruitment", "government job",
    "sarkari naukri", "government vacancy",
    "employment news"
  )) return "Education";

  // ─────────────────────────────────────────────────────────
  // 15. HEALTH
  // ─────────────────────────────────────────────────────────
  if (has(
    " health ", "healthcare",
    "hospital", "clinic",
    " disease ", "infection", "outbreak",
    " virus ", "bacteria", "pathogen",
    "covid", "dengue", "malaria", "tuberculosis", "cancer",
    "heart disease", "diabetes", "blood pressure",
    " doctor ", "physician", "surgeon", "specialist",
    "treatment", "therapy", "diagnosis",
    " vaccine ", "vaccination", "immunization",
    " medicine ", "drug approval", "pharmaceutical",
    "mental health", "depression", "anxiety",
    "fitness", "nutrition", "diet tips",
    "yoga", "meditation",
    "who ", "icmr", "health ministry",
    "ayushman", "aiims"
  )) return "Health";

  // ─────────────────────────────────────────────────────────
  // 16. ENTERTAINMENT
  //    "film" alone avoided — matches "infiltrate" etc.
  //    "music" and "tv" wrapped or compounded.
  //    "actor" / "actress" alone can fire on political biopics —
  //    acceptable here since Entertainment is checked after Politics.
  // ─────────────────────────────────────────────────────────
  if (has(
    "bollywood", "hollywood", "tollywood", "kollywood",
    " film ", "film review", "film release", "box office",
    " movie ", "ott release", "web series",
    "streaming platform", "netflix", "amazon prime", "disney+",
    " song ", "music video", "album release",
    "television", " tv show", "reality show",
    "award show", "filmfare", "oscars",
    " actor ", " actress ", "celebrity",
    "director", "producer",
    "trailer launch", "film trailer",
    " cinema ", "multiplex",
    "entertainment news", "showbiz"
  )) return "Entertainment";

  // ─────────────────────────────────────────────────────────
  // 17. GAMING
  // ─────────────────────────────────────────────────────────
  if (has(
    " gaming ", " gamer ",
    "esports", "e-sports",
    " pubg ", " bgmi ", "free fire", "valorant",
    "call of duty", "fortnite",
    "playstation", "xbox", "nintendo",
    "steam game", "pc gaming",
    "mobile gaming", "game update", "game launch",
    "video game", "game developer",
    "twitch", "game streaming"
  )) return "Gaming";

  // ─────────────────────────────────────────────────────────
  // 18. SOCIAL ISSUES
  // ─────────────────────────────────────────────────────────
  if (has(
    "social issue", "societal",
    " poverty ", " hunger ", "malnutrition",
    "unemployment rate", "job loss",
    " inequality ", "gender gap",
    "women safety", "gender violence",
    "child labour", "child abuse",
    "human trafficking",
    " protest ", "demonstration", "rally",
    "civil rights", "human rights",
    "caste", "discrimination",
    "ngo", "charity", "welfare scheme",
    "ration", "subsidy"
  )) return "Social";

  // ─────────────────────────────────────────────────────────
  // 19. RELIGION / SPIRITUALITY
  // ─────────────────────────────────────────────────────────
  if (has(
    " temple ", "mandir", "masjid", "mosque",
    "church", "gurudwara",
    " religion ", "religious",
    "hinduism", "islam", "christianity", "sikhism", "buddhism", "jainism",
    " puja ", "namaz", "prayer",
    "pilgrimage", "tirth yatra",
    "kumbh mela", "amarnath", "char dham",
    " deity ", "idol", "consecration",
    "spiritual", "spirituality",
    "mythology", "scripture", "sacred",
    " god ", "goddess", "divine"
  )) return "Religion";

  // ─────────────────────────────────────────────────────────
  // 20. ASTROLOGY
  // ─────────────────────────────────────────────────────────
  if (has(
    "astrology", "astrological",
    "horoscope", "daily horoscope", "weekly horoscope",
    "rashifal", "rashi",
    "zodiac", "star sign",
    "kundli", "birth chart",
    "nakshatra", " grah ", "planetary",
    "numerology",
    "tarot", "tarot reading",
    "vastu shastra", "vastu tips",
    "palmistry"
  )) return "Astrology";

  // ─────────────────────────────────────────────────────────
  // 21. MEDIA / JOURNALISM
  // ─────────────────────────────────────────────────────────
  if (has(
    " journalism ", "journalist",
    "news channel", "news anchor",
    "media house", "media company",
    " reporter ", "press conference",
    "broadcast", "telecast",
    "fake news", "misinformation",
    "print media", "digital media",
    "press freedom", "media censorship",
    "press trust", " pti ", " ani ", "ians"
  )) return "Media";

  // ─────────────────────────────────────────────────────────
  // 22. TOURISM
  //    Kept separate from Lifestyle as requested.
  // ─────────────────────────────────────────────────────────
  if (has(
    "tourism", " tourist ", "tourist destination",
    "travel guide", "travel tips",
    " vacation ", " holiday ",
    "trekking", "adventure travel",
    "heritage site", "unesco",
    "hill station", "beach destination",
    "staycation", "weekend getaway",
    "hotel booking", "flight booking",
    "domestic travel", "international travel",
    "visa", "passport"
  )) return "Tourism";

  // ─────────────────────────────────────────────────────────
  // 23. LIFESTYLE
  //    Broad catch-all for soft content — placed last among
  //    specific categories.
  // ─────────────────────────────────────────────────────────
  if (has(
    "lifestyle", "life hack",
    "fashion", "style tips", "outfit", "wardrobe",
    "beauty", "skincare", "makeup",
    "relationship", "dating", "marriage tips",
    "parenting", "family",
    "food review", "restaurant", "recipe", "cooking tips",
    "street food", "cuisine",
    "festival", "celebration",
    "home decor", "interior design",
    "self-improvement", "productivity tips",
    " pet ", "pet care", "dog", "cat breed"
  )) return "Lifestyle";

  // ─────────────────────────────────────────────────────────
  // DEFAULT
  // ─────────────────────────────────────────────────────────
  return "General";
}

module.exports = { assignCategory };

// ─── Category Summary (23 total) ──────────────────────────
// Specific / Hard News:
//   Crime, Law, Defense, Politics, World
// Evergreen Verticals:
//   Sports, Business, Technology, Science, Environment, Weather
// Niche / Utility:
//   Automobile, RealEstate, Education, Health
// Soft / Feature:
//   Entertainment, Gaming, Social, Religion, Astrology, Media, Tourism, Lifestyle
// Fallback:
//   General