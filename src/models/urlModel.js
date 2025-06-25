const db = require('../config/database');

const insertUrl = async ({ original_url, short_code, custom_alias }) => {
    const query = `
        INSERT INTO urls (original_url, short_code, custom_alias)
        VALUES ($1, $2, $3)
            RETURNING *;
    `;
    const values = [original_url, short_code, custom_alias || null];
    const result = await db.query(query, values); // ✅ Burada db.query çalışmalı
    return result.rows[0];
};

const findByShortCode = async (short_code) => {
    const result = await db.query(
        'SELECT * FROM urls WHERE short_code = $1 LIMIT 1;',
        [short_code]
    );
    return result.rows[0];
};

module.exports = {
    insertUrl,
    findByShortCode,
};
