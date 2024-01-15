const axios = require("axios");
require("dotenv").config();

const resolvers = {
  Query: {
    getStockPriceDataAggregates: async () => {
      try {
        
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=${process.env.POLYGON_API_KEY}`
        );
        console.log("response", response.data);
        return response.data;
      } catch (error) {
        console.error("Error from Polygon.io API:", error.response.data);
        throw new Error("Failed to fetch data from Polygon.io API");
      }
    },
  },
};

module.exports = resolvers;
