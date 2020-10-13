const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const bearerToken = require('express-bearer-token');
const methodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('../src/route');
const error = require('../src/middleware/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(bearerToken());
app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.use('/api', routes);

app.use(error.notFound);

app.use(error.converter);

app.use(error.handler);

module.exports = app;
