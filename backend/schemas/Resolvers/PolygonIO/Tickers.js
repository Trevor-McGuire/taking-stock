const axios = require("axios");
require("dotenv").config();
const { Ticker } = require("../../../models");

const resolvers = {
  Query: {
    getTickers: async (_, { input }) => {
      // Check if input is falsy, and if so, set it to an object with next_url as false
      input = input || { next_url: false };

      console.log("input.next_url", input.next_url);
      try {
        console.log("input.next_url", input.next_url);
        const url = input?.next_url
          ? `${input.next_url}&apiKey=${process.env.POLYGON_API_KEY}`
          : `https://api.polygon.io/v3/reference/tickers?active=true&limit=1000&apiKey=${process.env.POLYGON_API_KEY}`;
        console.log("url", url);
        const response = await axios.get(url);

        // Check if response.data exists and has a 'results' property
        const tickers = response.data.results;

        // Fetch tickers already in the database
        const tickersInDatabase = await Ticker.find({
          ticker: { $in: tickers.map((t) => t.ticker) },
        });

        // Filter tickers that are not in the database
        const newTickers = tickers
          .filter(
            (ticker) =>
              !tickersInDatabase.some(
                (dbTicker) => dbTicker.ticker === ticker.ticker
              )
          )
          .map((ticker) => ({
            ...ticker, // Use the spread operator to include all properties
            name: ticker.name || "UNKNOWN :/", // Set name to an empty string if it is falsy
          }));
        console.log("newTickers", newTickers);

        // Insert new tickers into the database
        if (newTickers.length > 0) {
          try {
            await Ticker.insertMany(newTickers);
            console.log("Inserted tickers into the database.");
          } catch (insertError) {
            console.error(
              "Error inserting tickers into the database:",
              insertError
            );
          }
        }

        // Return the response data
        return response.data;
      } catch (error) {
        console.error("Error from Polygon.io API:", error.response.data);
        throw new Error("Failed to fetch data from Polygon.io API");
      }
    },
  },
};

module.exports = resolvers;
