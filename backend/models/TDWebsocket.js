const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tdWebsocketSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  price: Number,
});

const TDWebsocket = mongoose.model('TDWebsockets', tdWebsocketSchema);

module.exports = TDWebsocket;