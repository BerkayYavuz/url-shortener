

const { generateRandomCode } = require('../utils/shortCodeGenerator');
const { insertUrl, findByShortCode } = require('../models/urlModel');


// URL Kısaltma
const shortenUrl = async (req, res) => {
    const { originalUrl, customAlias } = req.body;

    // URL geçerlilik kontrolü
    try {
        new URL(originalUrl);
    } catch (err) {
        return res.status(400).json({ error: 'Geçersiz URL formatı' });
    }

    // shortCode üret (custom varsa onu kullan)
    const shortCode = customAlias || generateRandomCode();

    try {
        const newEntry = await insertUrl({
            original_url: originalUrl,
            short_code: shortCode,
            custom_alias: customAlias,
        });

        const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
        return res.status(201).json({
            shortUrl,
            originalUrl: newEntry.original_url,
            shortCode: newEntry.short_code,
        });
    } catch (err) {
        if (err.code === '23505') {
            // PostgreSQL unique violation
            return res.status(409).json({ error: 'Bu shortCode zaten kullanılıyor' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

//  URL Yönlendirme
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const entry = await findByShortCode(shortCode);

        if (!entry) {
            return res.status(404).json({ error: 'Kısaltılmış URL bulunamadı' });
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
