const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // Bu doğru tanımlandı mı?

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// URL routes ve analytics routes'unu doğru tanımlayalım
app.use('/', urlRoutes);
app.use('/', analyticsRoutes); // Bunu kontrol et, doğru olmalı!

module.exports = app;
