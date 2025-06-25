const { generateRandomCode } = require('../utils/shortCodeGenerator');
const { insertUrl, findByShortCode } = require('../models/urlModel');

// URL Kısaltma
const shortenUrl = async (req, res) => {
    const { originalUrl, customAlias, expiresAt } = req.body;

    // URL geçerlilik kontrolü
    try {
        new URL(originalUrl);
    } catch (err) {
        return res.status(400).json({ error: 'Geçersiz URL formatı' });
    }

    const shortCode = customAlias || generateRandomCode();

    try {
        const newEntry = await insertUrl({
            original_url: originalUrl,
            short_code: shortCode,
            custom_alias: customAlias,
            expires_at: expiresAt,
        });

        const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
        return res.status(201).json({
            shortUrl,
            originalUrl: newEntry.original_url,
            shortCode: newEntry.short_code,
            expiresAt: newEntry.expires_at,
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Bu shortCode zaten kullanılıyor' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

// URL Yönlendirme
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const entry = await findByShortCode(shortCode);

        if (!entry) {
            return res.status(404).json({ error: 'Kısaltılmış URL bulunamadı' });
        }

        //  Vadesi geçmişse HTTP 410 dön
        if (entry.expires_at && new Date(entry.expires_at) < new Date()) {
            return res.status(410).json({ error: 'Bu bağlantının süresi dolmuş' });
        }

        return res.redirect(entry.original_url);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};


module.exports = {
    shortenUrl,
    redirectUrl,
};
