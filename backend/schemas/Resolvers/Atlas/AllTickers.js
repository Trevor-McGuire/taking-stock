const Ticker = require("../../../models/Ticker");

const resolvers = {
  Query: {
    getAllTickers: async (_, { pagination, filter }) => {
      try {
        const query = {};

        if (filter?.grouped_daily?.high) {
          query["grouped_daily.high"] = { $ne: null };
        }

        if (filter?.grouped_daily?.low) {
          query["grouped_daily.low"] = { $ne: null };
        }

        // Set default values for pagination if not provided
        const page = pagination?.page || 1;
        const pageSize = pagination?.pageSize || 10;

        // Calculate the starting index based on page and pageSize
        const startIndex = (page - 1) * pageSize;

        // Fetch paginated data from MongoDB (replace with your own logic)
        const allTickers = await Ticker.find(query)
          .limit(pageSize)
          .skip(pageSize * (page - 1));

        // Count total items (assuming you have a 'count' field in your model)
        const totalItems = await Ticker.countDocuments();

        return {
          allTickers: allTickers.map((ticker) => {
            const tickerObj = ticker.toObject();
            return {
              ...tickerObj,
              grouped_daily: tickerObj.grouped_daily || {
                high: null,
                low: null,
              },
            };
          }),
          pageInfo: {
            currentPage: page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
          },
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  },
};

module.exports = resolvers;
