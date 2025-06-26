const rateLimit = require('express-rate-limit');

// Rate limiting middleware'ı oluştur
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 dakika
    max: 5, // 10 dakika içinde max 5 istek
    message: 'Fazla istek gönderiyorsunuz. Lütfen 10 dakika sonra tekrar deneyin.',
    standardHeaders: true, // `RateLimit-*` başlıklarını gösterir
    legacyHeaders: false, // `X-RateLimit-*` başlıklarını göstermez
});

module.exports = limiter;
