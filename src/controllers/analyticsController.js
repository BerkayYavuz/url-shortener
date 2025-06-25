const redisClient = require('../config/redis');
const pool = require('../config/database');


// Tıklanma sayısını artır ve yönlendir
const trackClickAndRedirect = async (req, res) => {
    const { shortCode } = req.params;

    try {
        // URL bilgisi veritabanından alınır
        const result = await pool.query(
            'SELECT original_url, expires_at FROM urls WHERE short_code = $1',
            [shortCode]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Kısaltılmış URL bulunamadı' });
        }

        const { original_url, expires_at } = result.rows[0];

        // Süre kontrolü
        if (expires_at && new Date(expires_at) < new Date()) {
            return res.status(410).json({ error: 'Bu bağlantının süresi dolmuş' });
        }

        // Redis ile tıklanma sayısını artır
        await redisClient.incr(`clicks:${shortCode}`);

        return res.redirect(original_url);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Sunucu hatası' });
    }
};

// Tıklanma sayısını getir
const getClickStats = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const count = await redisClient.get(`clicks:${shortCode}`);
        res.json({ shortCode, clicks: parseInt(count) || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
};

module.exports = {
    trackClickAndRedirect,
    getClickStats,
};
