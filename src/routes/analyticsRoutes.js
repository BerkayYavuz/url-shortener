const express = require('express');
const router = express.Router();

// Controller importu
const { trackClickAndRedirect, getClickStats, getAllUrlAnalytics } = require('../controllers/analyticsController');

// Debugging: trackClickAndRedirect ve getClickStats fonksiyonları doğru mu?
console.log('trackClickAndRedirect:', trackClickAndRedirect);
console.log('getClickStats:', getClickStats);

// Tıklanma sayısını al
router.get('/analytics/:shortCode', getClickStats);

// Yönlendirme ve tıklama artırma
router.get('/:shortCode', trackClickAndRedirect);

// Admin için URL'lerin tıklama verilerini al
router.get('/admin/analytics', getAllUrlAnalytics);

module.exports = router;
