
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const BASE = characters.length;

/**
 * Counter tabanlı Base62 encode (id -> shortCode)
 * @param {number} num
 * @returns {string}
 */
function encodeBase62(num) {
    let shortCode = '';
    while (num > 0) {
        shortCode = characters[num % BASE] + shortCode;
        num = Math.floor(num / BASE);
    }
    return shortCode || '0';
}

/**
 * Random shortCode üretici (örnek: 6 karakterlik random)
 * @param {number} length
 * @returns {string}
 */
function generateRandomCode(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * BASE);
        result += characters[randIndex];
    }
    return result;
}

module.exports = {
    encodeBase62,
    generateRandomCode,
};
