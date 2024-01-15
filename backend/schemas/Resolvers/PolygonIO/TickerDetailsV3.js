const axios = require("axios");
require("dotenv").config();
const { TickerDetails } = require("../../../models");
const { makeRequest, getEstimatedWaitTime } = require('../../../utils/queue');

const resolvers = {
  Query: {
    getTickerDetailsV3: async (_, { ticker }) => {
      try {
        let tickerDetails = await TickerDetails.findOne({ ticker });
        if (!tickerDetails) {
          try {
            const response = await makeRequest(
              `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${process.env.POLYGON_API_KEY}`,
              { method: 'GET' }
            );
            await TickerDetails.create(response.data.results);
            console.log("api request getTickerDetailsV3 made");
            return response.data.results;
          } catch (error) {
            console.error("Error making API request:", error);
            throw new Error("Failed to fetch data from API");
          }
        }
        console.log("database request getTickerDetailsV3 made");
        return tickerDetails;
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to fetch data");
      }
    },
  },
};

module.exports = resolvers;
