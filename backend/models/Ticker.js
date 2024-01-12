const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  ticker: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  market: String,
  locale: String,
  primary_exchange: String,
  type: String,
  active: Boolean,
  currency_name: String,
  cik: String,
  composite_figi: String,
  share_class_figi: String,
  last_updated_utc: String,
  grouped_daily: {
    high: Number,
    low: Number,
  }
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;