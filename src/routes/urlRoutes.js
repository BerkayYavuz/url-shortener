const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');
const { trackClickAndRedirect, getClickStats } = require('../controllers/analyticsController');

// Debugging
console.log('trackClickAndRedirect:', trackClickAndRedirect); // Bu satırı ekle
console.log('getClickStats:', getClickStats);  // Bu satırı ekle

// URL kısaltma
router.post('/shorten', shortenUrl);

// Yönlendirme ve tıklama takibi
router.get('/:shortCode', trackClickAndRedirect);

// Tıklanma istatistiği alma
router.get('/stats/:shortCode', getClickStats);

module.exports = router;
