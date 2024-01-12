const { Article } = require('../../../models');

const resolvers = {
  Query: {
    getArticles: async (_, { page = 1, limit = 20, author, publisherName, ticker, published_utc }) => {
      try {
        const skip = (page - 1) * limit;

        // Build the filter object based on the provided filters
        const filters = {};
        if (author) filters.author = author;
        if (publisherName) filters['publisher.name'] = publisherName;
        if (ticker) filters.tickers = ticker;
        if (published_utc) filters.published_utc = published_utc;

        // Fetch the articles from the database
        const articles = await Article.find(filters).skip(skip).limit(limit);

        return articles;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching articles');
      }
    },
  },
};

module.exports = resolvers;