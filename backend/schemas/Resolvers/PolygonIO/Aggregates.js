const axios = require("axios");
require("dotenv").config();

const resolvers = {
  Query: {
    getStockPriceDataAggregates: async (_, { input }) => {
      console.log("input", input);
      const { stocksTicker, multiplier, timespan, from, to } = input;
      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=VDRGve7BDzY32CFDbw0JgFPfMXQsNFpm`
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
