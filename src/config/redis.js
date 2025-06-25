const { createClient } = require('redis');

// Redis bağlantısı oluştur
const redisClient = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
});

// Bağlantı hatası durumunda logla
redisClient.on('error', (error) => {
    console.error('❌ Redis bağlantı hatası:', error.message);
});

// Başarılı bağlantı durumunda logla
redisClient.on('ready', () => {
    console.log('✅ Redis bağlantısı kuruldu!');
});

// Bağlantıyı başlat
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('❌ Redis bağlantısı başarısız:', err.message);
    }
})();

module.exports = redisClient;
