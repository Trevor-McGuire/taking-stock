const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  address1: String,
  city: String,
  state: String,
  postal_code: String
});

const BrandingSchema = new mongoose.Schema({
  logo_url: String,
  icon_url: String
});

const TickerDetailsSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  market: String,
  locale: String,
  primary_exchange: String,
  type: String,
  active: Boolean,
  currency_name: String,
  cik: String,
  composite_figi: String,
  share_class_figi: String,
  market_cap: Number,
  phone_number: String,
  address: AddressSchema,
  description: String,
  sic_code: String,
  sic_description: String,
  ticker_root: String,
  homepage_url: String,
  total_employees: Number,
  list_date: Date,
  branding: BrandingSchema,
  share_class_shares_outstanding: Number,
  weighted_shares_outstanding: Number,
  round_lot: Number
});

module.exports = mongoose.model('TickerDetails', TickerDetailsSchema);