// src/controllers/urlController.js

const { generateRandomCode } = require('../utils/shortCodeGenerator');

let inMemoryDb = {}; // DB simülasyonu

const shortenUrl = (req, res) => {
    const { originalUrl, customAlias } = req.body;

    // 1. Basit URL validation
    try {
        new URL(originalUrl);
    } catch (err) {
        return res.status(400).json({ error: 'Geçersiz URL formatı' });
    }

    // 2. Custom alias varsa kontrol et
    if (customAlias && inMemoryDb[customAlias]) {
        return res.status(409).json({ error: 'Bu alias zaten kullanılıyor' });
    }

    // 3. Short code üret (custom varsa onu kullan)
    const shortCode = customAlias || generateRandomCode();

    // 4. Database'e kaydet (şimdilik simülasyon)
    inMemoryDb[shortCode] = {
        originalUrl,
        createdAt: new Date(),
    };

    // 5. Yanıt dön
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    return res.status(201).json({ shortUrl, originalUrl, shortCode });
};

const redirectUrl = (req, res) => {
    const { shortCode } = req.params;
    const entry = inMemoryDb[shortCode];

    if (!entry) {
        return res.status(404).json({ error: 'Short link bulunamadı' });
    }

    return res.redirect(entry.originalUrl);
};

module.exports = {
    shortenUrl,
    redirectUrl,
};
