// src/controllers/analyticsController.js

const { incrementClick, getClickCount } = require('../models/analyticsModel');

// URL tıklanma sayısını artır ve yönlendir
const trackClickAndRedirect = async (req, res) => {
    const { shortCode } = req.params;

    try {
        // URL verisini al
        const entry = await findByShortCode(shortCode);

        if (!entry) {
            return res.status(404).json({ error: 'Kısaltılmış URL bulunamadı' });
        }

        // Tıklama sayısını artır
        await incrementClick(shortCode);

        return res.redirect(entry.original_url);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

// Tıklanma sayısını al
const getClickStats = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const count = await getClickCount(shortCode);
        return res.json({ shortCode, clicks: count });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

module.exports = {
    trackClickAndRedirect,
    getClickStats,
};
