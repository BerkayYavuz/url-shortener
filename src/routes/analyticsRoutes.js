const express = require('express');
const router = express.Router();

const {
    trackClickAndRedirect,
    getClickStats
} = require('../controllers/analyticsController');

// Tıklanma sayısını al
router.get('/analytics/:shortCode', getClickStats);

// Yönlendirme ve tıklama artırma
router.get('/:shortCode', trackClickAndRedirect);

module.exports = router;
