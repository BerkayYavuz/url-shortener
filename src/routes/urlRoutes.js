const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');
const { trackClickAndRedirect, getClickStats } = require('../controllers/analyticsController');


const limiter = require('../middleware/rateLimiter');  // Rate limiting middleware'ını import et



// Rate limiting'i URL kısaltma işlemi için uygula
router.post('/shorten', limiter, shortenUrl);  // 10 dakika içinde sadece 5 istek izni verilecek

module.exports = router;


// Yönlendirme ve tıklama takibi
router.get('/:shortCode', trackClickAndRedirect);

// Tıklanma istatistiği alma
router.get('/stats/:shortCode', getClickStats);

module.exports = router;
