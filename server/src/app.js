const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const api = require('./routes/api');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// logger
// app.use(morgan('combined'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// serve built React app
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
