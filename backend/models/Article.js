const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  name: String,
  homepage_url: String,
  logo_url: String,
  favicon_url: String
});

const ArticleSchema = new mongoose.Schema({
  id: String,
  publisher: PublisherSchema,
  title: String,
  author: String,
  published_utc: String,
  article_url: String,
  tickers: [String],
  amp_url: String,
  image_url: String,
  description: String
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;