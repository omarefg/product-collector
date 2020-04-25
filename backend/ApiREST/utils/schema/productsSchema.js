const mongoose = require('mongoose');

const schema = mongoose.Schema;

const mySchema = new schema({
  id: {
    type: String,
    required: true
  },
  keyWord: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryState: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  soldQuantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  variant: {
    type: String,
    required: true
  }
});

const model = mongoose.model('products', mySchema);

module.exports = model;
