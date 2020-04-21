const mongoose = require('mongoose');

const schema = mongoose.Schema;

const mySchema = new schema({
  keyWord: String,
  country: String,
  date: Date
});

const model = mongoose.model('products', mySchema);

module.exports = model;
