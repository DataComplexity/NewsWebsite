function detectLanguage(text) {
    if (!text) return "en";
    
    // Check Japanese (Hiragana/Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return "ja";
    
    // Check Korean (Hangul)
    if (/[\uAC00-\uD7AF]/.test(text)) return "ko";
    
    // Check Hindi (Devanagari)
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    
    // Check Chinese (Hanzi)
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
    
    // Check Arabic
    if (/[\u0600-\u06FF]/.test(text)) return "ar";
    
    // Check Russian (Cyrillic)
    if (/[\u0400-\u04FF]/.test(text)) return "ru";
    
    // Default to English/Latin
    return "en";
}

module.exports = { detectLanguage };
