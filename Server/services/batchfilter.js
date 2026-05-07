function dedupeBatch(articles) {
    const map = new Map();
    for(const a of articles){
        if(a.url && !map.has(a.url)){
            map.set(a.url, a);
        }
    }
    return [...map.values()];
}

module.exports = { dedupeBatch };