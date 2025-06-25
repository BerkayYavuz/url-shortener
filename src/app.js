// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Route dosyalarını dahil et
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Güvenlik ve loglama middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// URL kısaltma işlemleri
app.use('/', urlRoutes);

// Analytics işlemleri (tıklama sayacı gibi)
app.use('/', analyticsRoutes);

module.exports = app;
