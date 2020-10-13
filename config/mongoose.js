/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = require('bluebird');

mongoose.connect(
  config.mongo.host,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 2,
  },
  (err) => {
    if (!err) console.log('MongoDB connection successfully');
    else console.log(`MongoDB connection failed : ${err}`);
  },
);
module.exports = mongoose;
