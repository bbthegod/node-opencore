/* eslint-disable no-console */
const mongoose = require('mongoose');
const { MONGO } = require('./config');

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 2,
};

mongoose.Promise = require('bluebird');

mongoose.connect(MONGO, config, (err) => {
  if (!err) console.log('MongoDB connection successfully');
  else console.log(`MongoDB connection failed : ${err}`);
});

module.exports = mongoose;
