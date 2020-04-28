import { Schema, model, Types } from 'mongoose';

const productsSchame = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  id: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  keyWord: {
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
  variants: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
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
  analyzedResults: {
    type: Number,
    required: true
  }
});

export default model('Products', productsSchame);
