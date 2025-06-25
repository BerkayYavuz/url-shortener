const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');
const { trackClickAndRedirect, getClickStats } = require('../controllers/analyticsController');

// URL kısaltma
router.post('/shorten', shortenUrl);

// Yönlendirme ve tıklama takibi
router.get('/:shortCode', trackClickAndRedirect);

// Tıklanma istatistiği alma
router.get('/stats/:shortCode', getClickStats);

module.exports = router;
