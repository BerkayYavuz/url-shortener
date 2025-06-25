const redisClient = require('../config/redis');

// Kısa kodla tıklanma sayısını artır
async function incrementClick(shortCode) {
    try {
        await redisClient.incr(`clicks:${shortCode}`);
    } catch (err) {
        console.error('Redis click artışı hatası:', err);
        throw err;
    }
}

// Kısa kodun tıklanma sayısını al
async function getClickCount(shortCode) {
    try {
        const count = await redisClient.get(`clicks:${shortCode}`);
        return parseInt(count) || 0;
    } catch (err) {
        console.error('Redis click sayısı alma hatası:', err);
        throw err;
    }
}

module.exports = {
    incrementClick,
    getClickCount,
};
