const express = require('express');
const helmet = require('helmet');
const compression = require('compression')
const path = require('path');
const getAddresses = require('./addressService').getAddresses;

const app = express();

/* middleware */
app.use(helmet());
app.use(compression());

/* endpoints */
app.use(express.static(path.resolve(__dirname, '../public')));
app.get('/addresses', (req, res) => {
  res.send(getAddresses());
});

module.exports = app;
