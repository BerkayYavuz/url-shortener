const db = require('../config/database');

// INSERT işlemi
const insertUrl = async ({ original_url, short_code, custom_alias, expires_at }) => {
    const query = `
        INSERT INTO urls (original_url, short_code, custom_alias, expires_at)
        VALUES ($1, $2, $3, $4)
            RETURNING *;
    `;
    const values = [original_url, short_code, custom_alias, expires_at];
    const result = await db.query(query, values);
    return result.rows[0];
};

// short_code'a göre bulma
const findByShortCode = async (short_code) => {
    const query = `
        SELECT * FROM urls
        WHERE short_code = $1;
    `;
    const result = await db.query(query, [short_code]);
    return result.rows[0];
};

// URL Yönlendirme
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const entry = await findByShortCode(shortCode);

        if (!entry) {
            return res.status(404).json({ error: 'Kısaltılmış URL bulunamadı' });
        }

        // ⛔ Vadesi geçmişse reddet
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
    insertUrl,
    findByShortCode,
};
